---
name: content-scorer
description: This skill should be used when the user asks to "score this marketing copy", "is this content good enough to ship", "recursively improve this until it scores 90+", "check against rejected patterns", "run a content quality gate", or wants deterministic, repeatable scoring of marketing or product copy against a rubric that remembers what got rejected before. Use it any time copy needs a PASS/REVISE verdict before shipping.
version: 0.1.0
---

# Content Scorer

Score marketing copy against a fixed, deterministic rubric and a rejection
memory that persists across runs. Every score is explainable: each deduction
names the reason and, where the rubric can locate one, the offending span of
text. Every score traces back to a regex match or an arithmetic threshold,
which is why it resists being talked out of a low result the way a model
sometimes can.

## The scoring loop

1. Score the draft: `python3 scripts/score_content.py --text "<draft>"`
2. Read the JSON result. If `decision` is `PASS` (total score at or above the
   threshold, default 90), ship it.
3. If `decision` is `REVISE`, walk the `dimensions` breakdown and the
   `memory_hits` list. Each entry names what to fix and where; revise the
   specific spans cited, not the whole draft.
4. Produce a revised draft. (The agent or human writes the new text — this
   tool never rewrites copy.) Re-run step 1.
5. Repeat until `PASS`, or until further revision stops raising the score. A
   score that plateaus below threshold across two revisions is a signal to
   escalate to a human.

The tool's job stops at scoring and remembering. It never generates or edits
copy; that responsibility stays with whatever is producing the draft, whether
an agent or a workflow like `closed-loop-marketing`. This split keeps the
scorer honest, since it can never inflate its own grading by "fixing" the
text it is judging.

## The rubric

Six weighted dimensions sum to 100 points:

| Dimension | Points | Checks |
|---|---|---|
| `specificity` | 20 | Concrete numbers vs. vague qualifiers ("very", "many", "great") |
| `no_cliches` | 20 | ~27 built-in generic marketing phrases ("game-changer", "cutting-edge", "unlock the power", the "not X, it's Y" binary-contrast pattern) |
| `active_voice` | 15 | Passive-voice constructions ("was built", "is designed") |
| `has_cta` | 15 | A call-to-action phrase present, and specifically near the end |
| `readability` | 20 | Flesch Reading Ease, computed from sentence and syllable counts |
| `sentence_variety` | 10 | Repeated sentence openers, run-on sentences over 40 words |

Every dimension function returns `points`, `max`, and a `deductions` list.
Every deduction has a `reason` and, where the rubric can locate it, the exact
matched `span`. Points lost always trace to a specific regex match or a
specific arithmetic threshold, which is what makes the score reproducible
and the revision guidance literal.

## The rejection-memory store

Rubric dimensions are fixed at ship time. The rejection memory is how the
scorer grows without a code change, and it is the point of this skill: a
durable file, sitting outside the model's context window, holds what got
rejected before.

Every run reads a JSON store (`--memory <path>`, default
`.content-memory.json`) of previously-rejected patterns:

```json
{
  "entries": [
    {
      "pattern": "checkout latency",
      "reason": "overused benchmark phrasing from a prior rejected draft",
      "penalty": 15,
      "added_at": "2026-07-17T12:00:00+00:00"
    }
  ]
}
```

Any pattern found in the text being scored docks its `penalty` from the
total. The hit is listed by name in `memory_hits`, so the deduction traces
back to the specific rejection that caused it.

Teach the scorer a new rejection with `--reject`:

```bash
python3 scripts/score_content.py --reject "checkout latency" \
  --reason "overused benchmark phrasing from a prior rejected draft" \
  --penalty 15 --memory .content-memory.json
```

This is how a human rejecting a draft (or an agent relaying that rejection)
becomes a permanent fact the scorer checks on every future run, in every
session from now on, for anyone who scores against that memory file. A
phrase rejected last month still costs points today on a completely fresh
process that never saw last month's conversation. A pure-prose scorer relies
on a model remembering the conversation; this one relies on a file that
outlives the process that wrote it.

Compounding is the intended behavior. Every rejected pattern stays in the
store and keeps firing on every later run, so quality gates tighten over
time as more clichés and dead phrases get taught in.

List the current store with `--list-memory`.

## Reading the output

```json
{
  "dimensions": { "specificity": {"points": 20, "max": 20, "deductions": []}, ... },
  "base_score": 100,
  "memory_hits": [{"pattern": "checkout latency", "reason": "...", "penalty": 15, "match": "checkout latency"}],
  "memory_penalty_total": 15,
  "total_score": 85,
  "threshold": 90,
  "decision": "REVISE"
}
```

`total_score = base_score - memory_penalty_total`, clamped to `0..100`. The
CLI exit code mirrors the decision: `0` for `PASS`, `1` for `REVISE`. That
makes it usable as a CI gate without any extra parsing.

## Caller

This skill is designed to be invoked by a broader content workflow, for
example a `closed-loop-marketing` skill that owns drafting, revising, and
deciding what ships, as the deterministic scoring step inside that loop.
This skill supplies the score and the memory. The caller supplies the drafts
and the revisions.

## Attribution

Inspired by the content-scoring concept in the `content-ops` /
`expert-panel` skills of
[github.com/ericosiu/ai-marketing-skills](https://github.com/ericosiu/ai-marketing-skills)
(MIT licensed). This is an independent reimplementation in pure Python, with
a rubric and rejection-memory design built from scratch. No code was copied
from that repository.
