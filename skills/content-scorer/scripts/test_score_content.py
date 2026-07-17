#!/usr/bin/env python3
"""Self-test for score_content.py. Pure standard library.

Run: python3 test_score_content.py
Exits 0 and prints PASS for every case, or exits 1 on the first failure.

Case (c) and (d) both exercise the persistent rejection-memory store — the
feature that makes this scorer different from a plain LLM rubric prompt.
(c) proves the in-process API docks points once a pattern is taught.
(d) proves the dock survives a fresh Python process reading the memory file
cold, which is the actual claim: rejections compound across sessions, not
just within one run.
"""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import score_content as sc  # noqa: E402

SCRIPT = Path(__file__).resolve().parent / "score_content.py"

STRONG_TEXT = (
    "Our API cut median checkout latency from 800ms to 210ms for 3 customers "
    "in the first 30 days. Stripe reduced fraud disputes by 22% after "
    "switching. Segment processed 4 billion events last quarter without a "
    "single outage. Engineers configure the webhook in under 10 minutes "
    "using our CLI. The dashboard shows p95 latency, error rate, and cost "
    "per request on one screen. Start your free trial today."
)

WEAK_TEXT = (
    "Our platform is a total game-changer. It is built to unlock the power "
    "of your team in today's fast-paced digital world. Whether you are a "
    "small business or a large enterprise, this cutting-edge, best-in-class "
    "solution was designed to take things to the next level. At the end of "
    "the day, our robust solution was made to empower your team and drive "
    "real synergy. Various things were improved by our world-class "
    "platform, and many great things were done for numerous clients. It is "
    "really amazing, and it is very good, and it was seen as a paradigm "
    "shift by several thought leaders."
)

failures = 0


def check(label: str, condition: bool, detail: str = "") -> None:
    global failures
    if condition:
        print(f"PASS — {label}")
    else:
        failures += 1
        print(f"FAIL — {label}" + (f" ({detail})" if detail else ""))


def run_cli(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run(
        [sys.executable, str(SCRIPT), *args],
        capture_output=True,
        text=True,
    )


# ---------------------------------------------------------------------------
# (a) A strong piece scores high and PASSes.
# ---------------------------------------------------------------------------

result_a = sc.score_text(STRONG_TEXT, {"entries": []}, threshold=90)
check(
    "(a) strong copy scores >= 90",
    result_a["total_score"] >= 90,
    f"got {result_a['total_score']}",
)
check(
    "(a) strong copy decision is PASS",
    result_a["decision"] == "PASS",
    f"got {result_a['decision']}",
)

# ---------------------------------------------------------------------------
# (b) A cliché-laden piece scores low and needs REVISE.
# ---------------------------------------------------------------------------

result_b = sc.score_text(WEAK_TEXT, {"entries": []}, threshold=90)
check(
    "(b) cliché-laden copy scores well below strong copy",
    result_b["total_score"] < result_a["total_score"] - 30,
    f"strong={result_a['total_score']} weak={result_b['total_score']}",
)
check(
    "(b) cliché-laden copy decision is REVISE",
    result_b["decision"] == "REVISE",
    f"got {result_b['decision']}",
)
check(
    "(b) cliché-laden copy fires the no_cliches dimension",
    len(result_b["dimensions"]["no_cliches"]["deductions"]) > 0,
)

# ---------------------------------------------------------------------------
# (c) Rejection-memory compounding: score, teach a phrase from that same
#     text into memory via the API, re-score, and confirm the score DROPPED
#     with the memory hit listed. This is the compounding claim, proven
#     in-process first.
# ---------------------------------------------------------------------------

memory_c: dict = {"entries": []}
before = sc.score_text(STRONG_TEXT, memory_c, threshold=90)

taught_phrase = "checkout latency"
assert taught_phrase in STRONG_TEXT, "test setup: phrase must appear in STRONG_TEXT"
sc.add_rejection(memory_c, taught_phrase, "overused benchmark phrasing from a prior rejected draft", penalty=15)

after = sc.score_text(STRONG_TEXT, memory_c, threshold=90)

check(
    "(c) score drops after teaching a pattern present in the text",
    after["total_score"] < before["total_score"],
    f"before={before['total_score']} after={after['total_score']}",
)
check(
    "(c) the drop equals the taught penalty (no double-counting, no silent clamp)",
    before["total_score"] - after["total_score"] == 15,
    f"delta={before['total_score'] - after['total_score']}",
)
check(
    "(c) memory hit is listed with the matched pattern",
    any(hit["pattern"] == taught_phrase for hit in after["memory_hits"]),
    f"memory_hits={after['memory_hits']}",
)

# ---------------------------------------------------------------------------
# (d) Persistence across a fresh process: add a pattern via the CLI (one
#     process), then score the same text in a SEPARATE fresh process that
#     only ever loads the memory file from disk. Proves the store is a real
#     file surviving process boundaries, not an in-memory cache.
# ---------------------------------------------------------------------------

with tempfile.TemporaryDirectory() as tmpdir:
    memory_path = Path(tmpdir) / "rejection-memory.json"

    baseline_proc = run_cli("--text", STRONG_TEXT, "--memory", str(memory_path))
    check(
        "(d) baseline CLI run with no memory file yet succeeds",
        baseline_proc.returncode == 0,
        baseline_proc.stderr,
    )
    baseline_score = json.loads(baseline_proc.stdout)["total_score"]

    reject_proc = run_cli(
        "--reject", taught_phrase,
        "--reason", "overused benchmark phrasing from a prior rejected draft",
        "--penalty", "15",
        "--memory", str(memory_path),
    )
    check(
        "(d) teaching a pattern via a fresh CLI process succeeds",
        reject_proc.returncode == 0,
        reject_proc.stderr,
    )
    check(
        "(d) the memory file was actually written to disk",
        memory_path.exists(),
    )

    rescored_proc = run_cli("--text", STRONG_TEXT, "--memory", str(memory_path))
    rescored = json.loads(rescored_proc.stdout)
    check(
        "(d) a THIRD, separate process loading the file from disk still docks the score",
        rescored["total_score"] < baseline_score,
        f"baseline={baseline_score} after fresh-process reload={rescored['total_score']}",
    )
    check(
        "(d) the memory hit fired from the disk-loaded store, not an in-memory carryover",
        any(hit["pattern"] == taught_phrase for hit in rescored["memory_hits"]),
        f"memory_hits={rescored['memory_hits']}",
    )

    on_disk = json.loads(memory_path.read_text())
    check(
        "(d) the on-disk store persisted the entry with its reason",
        on_disk["entries"][0]["reason"] == "overused benchmark phrasing from a prior rejected draft",
    )

# ---------------------------------------------------------------------------

print()
if failures:
    print(f"{failures} case(s) FAILED")
    sys.exit(1)

print("All cases PASSED")
sys.exit(0)
