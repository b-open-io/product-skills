#!/usr/bin/env python3
"""Score marketing copy against a deterministic rubric, docked by a persistent
rejection-memory store.

Pure standard library. No network calls, no third-party packages.

Usage:
    score_content.py --text "..." [--memory PATH] [--threshold 90]
    score_content.py --file draft.txt [--memory PATH]
    score_content.py --reject "PATTERN" --reason "why" [--penalty 15] [--memory PATH]
    score_content.py --list-memory [--memory PATH]

Exit codes:
    0  scoring ran and the content PASSed, or a memory operation succeeded
    1  scoring ran and the content needs REVISE
    2  bad usage (missing/invalid arguments) — argparse default
"""

from __future__ import annotations

import argparse
import json
import re
import string
import sys
from datetime import datetime, timezone
from pathlib import Path

DEFAULT_MEMORY_PATH = Path(".content-memory.json")
DEFAULT_THRESHOLD = 90
DEFAULT_PENALTY = 15

# ---------------------------------------------------------------------------
# Built-in rubric data
# ---------------------------------------------------------------------------

# Generic marketing clichés the rubric always checks for, independent of the
# rejection-memory store. This list is fixed at ship time; the memory store
# below is how the rubric grows without a code change.
CLICHE_PATTERNS = [
    r"game[\s-]?changer",
    r"cutting[\s-]?edge",
    r"seamless(?:ly)?",
    r"unlock(?:ing)? the (?:power|potential)",
    r"in today'?s (?:fast-paced|ever-evolving|ever-changing|digital) \w+",
    r"revolutioniz\w+",
    r"best[\s-]in[\s-]class",
    r"world[\s-]class",
    r"take it to the next level",
    r"at the end of the day",
    r"synerg\w+",
    r"paradigm shift",
    r"robust solution",
    r"thought leader\w*",
    r"disruptiv\w+",
    r"unparalleled",
    r"elevate your",
    r"empower(?:ing)? your",
    r"look no further",
    r"dive in|delve into",
    r"state[\s-]of[\s-]the[\s-]art",
    r"one[\s-]stop shop",
    r"actionable insights",
    r"circle back",
    r"low[\s-]hanging fruit",
    r"think outside the box",
    # the "not X — it's Y" binary-contrast pattern LLMs default to
    r"not (?:just|only) \w[\w\s]{0,40}[—-]\s*(?:it'?s|its)\b",
]

VAGUE_WORDS = [
    "very", "really", "a lot of", "lots of", "many", "several", "some",
    "things", "stuff", "great", "amazing", "good", "various", "numerous",
    "significant", "significantly", "in general", "overall", "basically",
    "kind of", "sort of",
]

PASSIVE_PARTICIPLES = (
    r"\w+ed|written|given|taken|made|done|seen|known|shown|built|sent|"
    r"chosen|driven|spoken|broken|thrown|grown|drawn|held|found|told|"
    r"bought|brought|kept|left|meant|paid|read|said|sold|taught|"
    r"understood|won"
)
PASSIVE_RE = re.compile(
    rf"\b(?:is|are|was|were|be|been|being)\s+(?:{PASSIVE_PARTICIPLES})\b",
    re.IGNORECASE,
)

CTA_PHRASES = [
    "sign up", "get started", "try it free", "try for free", "book a demo",
    "schedule a demo", "learn more", "buy now", "shop now", "contact us",
    "download", "subscribe", "join now", "start your free trial",
    "start free trial", "request a demo", "get a quote", "claim your",
    "reserve your", "register now", "start today", "try today", "start now",
]

# ---------------------------------------------------------------------------
# Text helpers
# ---------------------------------------------------------------------------


def _words(text: str) -> list[str]:
    return re.findall(r"[A-Za-z']+", text)


def _sentences(text: str) -> list[str]:
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return [p for p in parts if p.strip()]


def _count_syllables(word: str) -> int:
    word = word.lower().strip(string.punctuation)
    if not word:
        return 0
    vowels = "aeiouy"
    count = 0
    prev_is_vowel = False
    for ch in word:
        is_vowel = ch in vowels
        if is_vowel and not prev_is_vowel:
            count += 1
        prev_is_vowel = is_vowel
    if word.endswith("e") and count > 1:
        count -= 1
    return max(count, 1)


# ---------------------------------------------------------------------------
# Rubric dimensions — each returns {"points": int, "max": int, "deductions": [...]}
# Every deduction cites a "reason" and, where possible, the offending "span".
# ---------------------------------------------------------------------------


def score_specificity(text: str) -> dict:
    max_points = 20
    deductions: list[dict] = []

    numbers = list(re.finditer(r"\b\d+(?:\.\d+)?%?\b", text))
    concrete_bonus = min(12, len(numbers) * 3)

    vague_hits = []
    for phrase in VAGUE_WORDS:
        vague_hits.extend(re.finditer(rf"\b{re.escape(phrase)}\b", text, re.IGNORECASE))
    vague_penalty = min(12, len(vague_hits) * 3)
    for m in vague_hits[:6]:
        deductions.append({
            "reason": f"vague qualifier '{m.group(0)}' — replace with a concrete detail",
            "span": m.group(0),
        })

    points = max(0, min(max_points, 8 + concrete_bonus - vague_penalty))
    return {"points": points, "max": max_points, "deductions": deductions}


def score_no_cliches(text: str) -> dict:
    max_points = 20
    deductions = []
    for pattern in CLICHE_PATTERNS:
        m = re.search(pattern, text, re.IGNORECASE)
        if m:
            deductions.append({
                "reason": "banned marketing cliché",
                "span": m.group(0),
            })
    penalty = min(max_points, len(deductions) * 4)
    points = max_points - penalty
    return {"points": points, "max": max_points, "deductions": deductions}


def score_active_voice(text: str) -> dict:
    max_points = 15
    hits = list(PASSIVE_RE.finditer(text))
    deductions = [
        {"reason": "passive-voice construction — rewrite with an active subject", "span": m.group(0)}
        for m in hits[:5]
    ]
    penalty = min(max_points, len(hits) * 3)
    points = max_points - penalty
    return {"points": points, "max": max_points, "deductions": deductions}


def score_has_cta(text: str) -> dict:
    max_points = 15
    cutoff = int(len(text) * 0.6)
    tail = text[cutoff:]

    for phrase in CTA_PHRASES:
        m = re.search(re.escape(phrase), tail, re.IGNORECASE)
        if m:
            return {"points": max_points, "max": max_points, "deductions": []}

    for phrase in CTA_PHRASES:
        m = re.search(re.escape(phrase), text, re.IGNORECASE)
        if m:
            return {
                "points": 8,
                "max": max_points,
                "deductions": [{
                    "reason": "CTA found but not near the end — move the call-to-action to the closing lines",
                    "span": m.group(0),
                }],
            }

    return {
        "points": 0,
        "max": max_points,
        "deductions": [{"reason": "no call-to-action detected anywhere in the copy", "span": None}],
    }


def score_readability(text: str) -> dict:
    max_points = 20
    words = _words(text)
    sentences = _sentences(text)
    if not words or not sentences:
        return {
            "points": 0,
            "max": max_points,
            "deductions": [{"reason": "no scoreable text found", "span": None}],
        }

    syllables = sum(_count_syllables(w) for w in words)
    fre = 206.835 - 1.015 * (len(words) / len(sentences)) - 84.6 * (syllables / len(words))

    if fre >= 60:
        points = 20
    elif fre >= 50:
        points = 15
    elif fre >= 30:
        points = 9
    elif fre >= 0:
        points = 4
    else:
        points = 0

    deductions = []
    if points < max_points:
        deductions.append({
            "reason": f"Flesch Reading Ease is {fre:.1f} — shorten sentences and use simpler words",
            "span": None,
        })
    return {"points": points, "max": max_points, "deductions": deductions}


def score_sentence_variety(text: str) -> dict:
    max_points = 10
    sentences = _sentences(text)
    if not sentences:
        return {"points": 0, "max": max_points, "deductions": [{"reason": "no sentences found", "span": None}]}

    starts = [w[0].lower() for w in (_words(s) for s in sentences) if w]
    if not starts:
        return {"points": max_points, "max": max_points, "deductions": []}

    unique_ratio = len(set(starts)) / len(starts)
    points = round(max_points * unique_ratio)

    deductions = []
    seen: set[str] = set()
    repeats: set[str] = set()
    for w in starts:
        if w in seen:
            repeats.add(w)
        seen.add(w)
    for w in sorted(repeats)[:5]:
        deductions.append({
            "reason": f"multiple sentences start with '{w}' — vary sentence openings",
            "span": w,
        })

    long_sentences = [s for s in sentences if len(_words(s)) > 40]
    if long_sentences:
        points = max(0, points - 2)
        deductions.append({
            "reason": "run-on sentence over 40 words — break it up",
            "span": long_sentences[0][:60] + "...",
        })

    return {"points": max(0, min(max_points, points)), "max": max_points, "deductions": deductions}


DIMENSIONS = {
    "specificity": score_specificity,
    "no_cliches": score_no_cliches,
    "active_voice": score_active_voice,
    "has_cta": score_has_cta,
    "readability": score_readability,
    "sentence_variety": score_sentence_variety,
}

# ---------------------------------------------------------------------------
# Persistent rejection memory
# ---------------------------------------------------------------------------


def load_memory(path: Path) -> dict:
    """Read the rejection-memory store. Missing file means empty memory —
    a fresh scorer with no history yet, not an error."""
    if not path.exists():
        return {"entries": []}
    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError as exc:
        raise SystemExit(f"content-scorer: memory file {path} is not valid JSON: {exc}")
    if "entries" not in data or not isinstance(data["entries"], list):
        raise SystemExit(f"content-scorer: memory file {path} is missing an 'entries' list")
    return data


def save_memory(path: Path, memory: dict) -> None:
    path.write_text(json.dumps(memory, indent=2) + "\n")


def add_rejection(memory: dict, pattern: str, reason: str, penalty: int) -> dict:
    try:
        re.compile(pattern, re.IGNORECASE)
    except re.error as exc:
        raise SystemExit(f"content-scorer: invalid --reject pattern {pattern!r}: {exc}")
    entry = {
        "pattern": pattern,
        "reason": reason,
        "penalty": penalty,
        "added_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }
    memory["entries"].append(entry)
    return entry


def apply_memory_penalties(text: str, memory: dict) -> tuple[int, list[dict]]:
    hits = []
    total_penalty = 0
    for entry in memory.get("entries", []):
        try:
            match = re.search(entry["pattern"], text, re.IGNORECASE)
        except re.error:
            # A corrupt entry should not take down scoring for everything
            # else in the store — skip it rather than crash.
            continue
        if match:
            hits.append({
                "pattern": entry["pattern"],
                "reason": entry["reason"],
                "penalty": entry["penalty"],
                "match": match.group(0),
            })
            total_penalty += entry["penalty"]
    return total_penalty, hits


# ---------------------------------------------------------------------------
# Top-level scoring
# ---------------------------------------------------------------------------


def score_text(text: str, memory: dict, threshold: int = DEFAULT_THRESHOLD) -> dict:
    dimensions = {name: fn(text) for name, fn in DIMENSIONS.items()}
    base_score = sum(d["points"] for d in dimensions.values())
    memory_penalty, memory_hits = apply_memory_penalties(text, memory)
    total_score = max(0, min(100, base_score - memory_penalty))
    decision = "PASS" if total_score >= threshold else "REVISE"
    return {
        "dimensions": dimensions,
        "base_score": base_score,
        "memory_hits": memory_hits,
        "memory_penalty_total": memory_penalty,
        "total_score": total_score,
        "threshold": threshold,
        "decision": decision,
    }


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="score_content.py",
        description=(
            "Score marketing copy against a deterministic rubric, docked by a "
            "persistent rejection-memory store."
        ),
    )
    parser.add_argument("--text", help="Content to score, given directly on the command line.")
    parser.add_argument("--file", type=Path, help="Path to a file containing content to score.")
    parser.add_argument(
        "--memory", type=Path, default=DEFAULT_MEMORY_PATH,
        help=f"Path to the rejection-memory JSON store (default: {DEFAULT_MEMORY_PATH}).",
    )
    parser.add_argument(
        "--threshold", type=int, default=DEFAULT_THRESHOLD,
        help=f"Minimum total score required to PASS (default: {DEFAULT_THRESHOLD}).",
    )
    parser.add_argument(
        "--reject", metavar="PATTERN",
        help="Add PATTERN (regex or plain phrase) to the rejection-memory store instead of scoring.",
    )
    parser.add_argument("--reason", help="Required with --reject: why this pattern is being rejected.")
    parser.add_argument(
        "--penalty", type=int, default=DEFAULT_PENALTY,
        help=f"Points to dock on every future match of --reject's pattern (default: {DEFAULT_PENALTY}).",
    )
    parser.add_argument(
        "--list-memory", action="store_true",
        help="Print the current rejection-memory store as JSON and exit.",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.list_memory:
        memory = load_memory(args.memory)
        print(json.dumps(memory, indent=2))
        return 0

    if args.reject is not None:
        if not args.reason:
            parser.error("--reject requires --reason")
        memory = load_memory(args.memory)
        entry = add_rejection(memory, args.reject, args.reason, args.penalty)
        save_memory(args.memory, memory)
        print(json.dumps({"added": entry, "memory_path": str(args.memory)}, indent=2))
        return 0

    if args.text is not None and args.file is not None:
        parser.error("pass only one of --text or --file")

    if args.text is not None:
        text = args.text
    elif args.file is not None:
        if not args.file.exists():
            parser.error(f"--file not found: {args.file}")
        text = args.file.read_text()
    elif not sys.stdin.isatty():
        text = sys.stdin.read()
    else:
        parser.error("provide content via --text, --file, or stdin")

    if not text.strip():
        parser.error("content is empty after stripping whitespace")

    memory = load_memory(args.memory)
    result = score_text(text, memory, args.threshold)
    print(json.dumps(result, indent=2))
    return 0 if result["decision"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
