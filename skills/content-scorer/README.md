# content-scorer

Deterministic marketing-copy scorer with a persistent rejection-memory store.
Pure Python 3 standard library, no dependencies.

## Score a draft

```bash
python3 scripts/score_content.py --text "Your draft copy here."
python3 scripts/score_content.py --file draft.txt
```

Prints a JSON result with a per-dimension breakdown, any rejection-memory
hits, a `total_score`, and a `PASS`/`REVISE` decision (default threshold:
90). Exit code is `0` on `PASS` and `1` on `REVISE`, so it works directly as
a CI gate.

## Teach the scorer a rejected pattern

```bash
python3 scripts/score_content.py \
  --reject "checkout latency" \
  --reason "overused benchmark phrasing from a prior rejected draft" \
  --penalty 15
```

Writes the pattern to `.content-memory.json` (or `--memory <path>`). Every
future run against that memory file docks points whenever the pattern shows
up again, whether in this process or in a run started days later by a
different agent.

## Inspect the store

```bash
python3 scripts/score_content.py --list-memory
```

## Run the tests

```bash
python3 scripts/test_score_content.py
```

Exits `0` with `All cases PASSED` when everything checks out. Covers a
strong draft scoring 90+, a cliché-laden draft scoring low, in-process
memory compounding where teaching a pattern drops the score, and persistence
across a fresh subprocess reading the memory file cold from disk.

## Files

- `SKILL.md`: the skill definition (rubric, scoring loop, memory mechanics)
- `scripts/score_content.py`: the CLI and scoring library
- `scripts/test_score_content.py`: self-test, no external test framework needed
