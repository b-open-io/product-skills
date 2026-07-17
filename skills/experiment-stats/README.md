# experiment-stats

Real inferential statistics for A/B and multivariate marketing experiments,
in pure Python 3 standard library (no scipy, no numpy).

## Usage

```bash
# From a file
python3 scripts/ab_stats.py experiment.json

# From stdin
cat experiment.json | python3 scripts/ab_stats.py

# Override bootstrap iterations, seed, or confidence level
python3 scripts/ab_stats.py experiment.json --iterations 20000 --seed 7 --confidence 0.90
```

### Input

```json
{
  "control": [0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
  "variants": {
    "B": [1, 1, 0, 1, 0, 1, 1, 0, 1, 0]
  },
  "metric": "conversion",
  "alpha": 0.05,
  "min_lift": 0.15
}
```

- `metric: "conversion"` expects 0/1 arrays and runs a two-proportion z-test.
- `metric: "value"` expects numeric arrays and runs a Mann-Whitney U test.

### Output

JSON with one result per variant: `lift`, `bootstrap_ci`, `test`, `z`,
`p_value`, `decision` (`PROMOTE` / `HOLD` / `REJECT`), and `reason`.

## Tests

```bash
python3 scripts/test_ab_stats.py
```

Prints PASS/FAIL for each fixture, and only exits 0 once all thirteen
checks across the four scenarios have actually passed.

See `SKILL.md` for the full method, the promote-gate rules, and attribution.
