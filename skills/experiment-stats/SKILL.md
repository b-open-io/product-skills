---
name: experiment-stats
description: "This skill should be used when the user asks 'is this A/B test significant', 'did the variant actually win', 'compute lift and confidence interval', 'score a marketing experiment', 'run the promote-gate', or wants a statistically defensible promote/hold/reject call on an A/B or multivariate marketing experiment. Computes lift, a bootstrap confidence interval, and a significance test (Mann-Whitney U or two-proportion z) using pure Python standard library, without scipy or numpy. Every p-value is computed from the input data, never estimated. Use before promoting any experiment variant to production."
version: 0.1.0
---

# Experiment Stats

Compute real inferential statistics for A/B and multivariate marketing
experiments, then apply a dual promote-gate to decide whether a variant
actually won. The p-value and confidence interval behind that call come
from bootstrap resampling and a hand-implemented Mann-Whitney rank-sum
test, run directly against the outcome data you provide.

## What it does

Given a control group and one or more variant groups of outcome data, `scripts/ab_stats.py`:

1. Computes **lift**: `(variant_mean - control_mean) / control_mean`.
2. Computes a **bootstrap confidence interval** on that lift (seeded
   resampling, default 10,000 iterations).
3. Runs a **significance test**:
   - `metric: "conversion"` (binary 0/1 outcomes) -> two-proportion z-test.
   - `metric: "value"` (continuous outcomes) -> Mann-Whitney U test, with
     the rank-sum computed by hand (tie correction + continuity correction).
4. Applies the **dual promote-gate** and returns `PROMOTE`, `HOLD`, or
   `REJECT` with the numbers behind the call.

## When to use

Invoke this any time a promote/hold/reject call needs to rest on a computed
p-value and a real lift interval. Typical callers:

- The `closed-loop-marketing` discipline, at the point where it decides
  whether to promote a winning variant to full rollout.
- Any A/B or multivariate test report on marketing copy, pricing, onboarding
  flows, or ad creative that ends in a promote/hold/reject call.
- Any experiment dashboard that flags a result "significant" without also
  checking whether the lift clears the bar for shipping it.
- Any place a lift number is about to be quoted without the confidence
  interval or p-value behind it.

## How to run it

```bash
echo '{
  "control": [0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
  "variants": {"B": [1, 1, 0, 1, 0, 1, 1, 0, 1, 0]},
  "metric": "conversion",
  "alpha": 0.05,
  "min_lift": 0.15
}' | python3 scripts/ab_stats.py
```

Or from a file: `python3 scripts/ab_stats.py experiment.json`.

Input JSON fields:

| Field | Required | Default | Notes |
|---|---|---|---|
| `control` | yes | -- | array of outcomes (0/1 for `conversion`, numbers for `value`) |
| `variants` | yes | -- | object of `{name: [outcomes]}`, one or more |
| `metric` | no | `"conversion"` | `"conversion"` or `"value"` |
| `alpha` | no | `0.05` | significance threshold |
| `min_lift` | no | `0.15` | minimum relative lift to promote (15%) |
| `bootstrap_iterations` | no | `10000` | resampling count |
| `seed` | no | `1234` | RNG seed, for reproducible bootstrap output |
| `confidence` | no | `0.95` | bootstrap CI width |

Output is JSON, one result block per variant, each with `lift`,
`bootstrap_ci`, `test` (which test ran), `z`, `p_value`, `decision`, and a
human-readable `reason`.

## How the promote-gate decision works

A variant is promoted only when **both** conditions hold:

- `p_value < alpha` (statistically significant), **and**
- `lift >= min_lift` (the effect is large enough to matter).

| p_value | lift | Decision |
|---|---|---|
| >= alpha | any | `HOLD` -- not enough evidence yet |
| < alpha | >= min_lift | `PROMOTE` -- ship it |
| < alpha | <= -min_lift | `REJECT` -- variant is significantly worse |
| < alpha | between -min_lift and min_lift | `HOLD` -- significant, but the effect is too small to act on |

That last row is what the `min_lift` floor exists for: at large enough
sample sizes, a trivial lift can clear `p < 0.05` on significance alone,
and the floor stops that from reading as a win. See
`scripts/test_ab_stats.py` case (d) for a worked example.

## Validation and tests

Run `python3 scripts/test_ab_stats.py` from this directory. It runs each
fixture below, prints PASS or FAIL for every assertion, and exits 0 only
if all of them pass.

- a hand-verifiable Mann-Whitney U case (no ties, fully separated samples)
- a clear-winner case that must `PROMOTE`
- a no-difference case (identical distributions) that must `HOLD`
- a large-sample, small-lift case that is statistically significant but
  must still `HOLD` -- proving the dual gate does what it's for

## Caveats

- The Mann-Whitney normal approximation is asymptotic; on very small
  samples (roughly n < 10 per group) it will disagree somewhat with the
  exact permutation p-value. It gets closer as sample size grows, and the
  tie/continuity corrections keep it well-behaved in the meantime.
- `ab_stats.py` fails with a non-zero exit and a message on stderr for bad
  input (missing fields, wrong types, empty arrays, non-binary values under
  `metric: "conversion"`) -- it never silently substitutes a default or
  drops bad rows.

## Attribution

The idea of pairing a bootstrap lift interval with a promote-gate for
marketing experiments is drawn from the `growth-engine` skill in
[ericosiu/ai-marketing-skills](https://github.com/ericosiu/ai-marketing-skills)
(MIT licensed). This implementation is an independent clean-room
reimplementation in pure Python: the statistical routines (rank-sum
Mann-Whitney with tie/continuity correction, two-proportion z-test, the
bootstrap resampler, and the dual-gate logic) were written from scratch for
this skill and share no code with the original repository.
