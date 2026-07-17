#!/usr/bin/env python3
"""Score an A/B (or multivariate) marketing experiment.

For each variant compared against control, this computes:

- **Lift**: the relative difference in the metric (variant vs control).
- **Bootstrap confidence interval** on that lift (seeded resampling).
- **Significance test**: a two-proportion z-test for binary "conversion"
  data, or a Mann-Whitney U test (normal approximation, tie-corrected,
  continuity-corrected) for continuous "value" data. The rank-sum is
  implemented by hand below -- no scipy.
- **Promote-gate decision**: PROMOTE only if the result is significant
  (p < alpha) AND the lift clears a minimum bar (lift >= min_lift).
  Otherwise HOLD (not enough evidence) or REJECT (significantly worse).

Pure Python 3 standard library. No scipy, no numpy.
"""

from __future__ import annotations

import argparse
import json
import math
import random
import sys
from typing import Sequence


def mean(data: Sequence[float]) -> float:
    if not data:
        raise ValueError("cannot compute mean of an empty sample")
    return sum(data) / len(data)


def standard_normal_cdf(z: float) -> float:
    return 0.5 * (1.0 + math.erf(z / math.sqrt(2.0)))


def two_sided_p_from_z(z: float) -> float:
    return 2.0 * (1.0 - standard_normal_cdf(abs(z)))


def mann_whitney_u(a: Sequence[float], b: Sequence[float]) -> dict:
    """Two-sided Mann-Whitney U test via the normal approximation.

    Pools and ranks both samples by hand (average rank on ties), derives
    U from the rank sum of ``a``, then applies the standard tie
    correction to the variance and a continuity correction to z.
    """
    n1, n2 = len(a), len(b)
    if n1 == 0 or n2 == 0:
        raise ValueError("mann_whitney_u requires two non-empty samples")

    combined = [(value, 0) for value in a] + [(value, 1) for value in b]
    combined.sort(key=lambda pair: pair[0])

    ranks = [0.0] * len(combined)
    tie_term = 0
    i = 0
    while i < len(combined):
        j = i
        while j < len(combined) and combined[j][0] == combined[i][0]:
            j += 1
        tie_size = j - i
        average_rank = (i + 1 + j) / 2.0  # 1-indexed rank, averaged over the tie
        for k in range(i, j):
            ranks[k] = average_rank
        if tie_size > 1:
            tie_term += tie_size**3 - tie_size
        i = j

    rank_sum_a = sum(rank for rank, (_, group) in zip(ranks, combined) if group == 0)

    u_a = rank_sum_a - n1 * (n1 + 1) / 2.0
    u_b = n1 * n2 - u_a
    u = min(u_a, u_b)

    n = n1 + n2
    mean_u = n1 * n2 / 2.0
    variance_u = (n1 * n2 / 12.0) * ((n + 1) - tie_term / (n * (n - 1)))
    if variance_u <= 0:
        # Every value ties across both groups -- no rank information at all.
        return {"u": u, "z": 0.0, "p_value": 1.0}

    std_u = math.sqrt(variance_u)
    diff = u_a - mean_u
    continuity = 0.5 if diff > 0 else (-0.5 if diff < 0 else 0.0)
    z = (diff - continuity) / std_u
    p_value = two_sided_p_from_z(z)
    return {"u": u, "z": z, "p_value": p_value}


def two_proportion_z_test(successes_a: float, n_a: int, successes_b: float, n_b: int) -> dict:
    """Two-sided two-proportion z-test (pooled variance) for binary data."""
    if n_a == 0 or n_b == 0:
        raise ValueError("two_proportion_z_test requires non-zero sample sizes")
    p_a = successes_a / n_a
    p_b = successes_b / n_b
    pooled = (successes_a + successes_b) / (n_a + n_b)
    se = math.sqrt(pooled * (1 - pooled) * (1 / n_a + 1 / n_b))
    if se == 0:
        return {"p_a": p_a, "p_b": p_b, "z": 0.0, "p_value": 1.0}
    z = (p_b - p_a) / se
    p_value = two_sided_p_from_z(z)
    return {"p_a": p_a, "p_b": p_b, "z": z, "p_value": p_value}


def bootstrap_lift_ci(
    control: Sequence[float],
    variant: Sequence[float],
    iterations: int,
    rng: random.Random,
    confidence: float = 0.95,
) -> dict:
    """Percentile bootstrap confidence interval on relative lift.

    Resamples control and variant independently, with replacement, at
    their observed sizes, and takes the percentile interval of the
    resulting lift distribution. Resamples where the control mean lands
    on zero are skipped (relative lift is undefined there) rather than
    silently zeroed or divided-by-zero.
    """
    n_control, n_variant = len(control), len(variant)
    if n_control == 0 or n_variant == 0:
        raise ValueError("bootstrap requires non-empty control and variant samples")

    lifts = []
    for _ in range(iterations):
        resample_control = rng.choices(control, k=n_control)
        resample_variant = rng.choices(variant, k=n_variant)
        control_mean = sum(resample_control) / n_control
        if control_mean == 0:
            continue
        variant_mean = sum(resample_variant) / n_variant
        lifts.append((variant_mean - control_mean) / control_mean)

    if not lifts:
        raise ValueError("bootstrap could not compute lift: every resample had a zero control mean")

    lifts.sort()
    tail = (1 - confidence) / 2
    lower_index = int(tail * len(lifts))
    upper_index = min(int((1 - tail) * len(lifts)), len(lifts) - 1)
    return {
        "lower": lifts[lower_index],
        "upper": lifts[upper_index],
        "confidence": confidence,
        "iterations_used": len(lifts),
    }


def _validate_binary(data: Sequence[float], label: str) -> None:
    for value in data:
        if value not in (0, 1):
            raise ValueError(f"metric 'conversion' requires {label} values to be 0 or 1; got {value!r}")


def compare_variant(
    control: Sequence[float],
    variant_data: Sequence[float],
    metric: str,
    alpha: float,
    min_lift: float,
    iterations: int,
    seed: int,
    confidence: float = 0.95,
) -> dict:
    control_mean = mean(control)
    variant_mean = mean(variant_data)
    if control_mean == 0:
        raise ValueError("control mean is zero; relative lift is undefined for this metric")
    lift = (variant_mean - control_mean) / control_mean

    rng = random.Random(seed)
    ci = bootstrap_lift_ci(control, variant_data, iterations, rng, confidence)

    if metric == "conversion":
        _validate_binary(control, "control")
        _validate_binary(variant_data, "variant")
        test = two_proportion_z_test(sum(control), len(control), sum(variant_data), len(variant_data))
        test_name = "two_proportion_z"
        p_value = test["p_value"]
        z = test["z"]
        supplementary = mann_whitney_u(control, variant_data)
    elif metric == "value":
        test = mann_whitney_u(control, variant_data)
        test_name = "mann_whitney_u"
        p_value = test["p_value"]
        z = test["z"]
        supplementary = None
    else:
        raise ValueError(f"unknown metric '{metric}'; expected 'conversion' or 'value'")

    # Dual promote-gate: significance alone is not enough, and a large but
    # noisy lift is not enough either -- both conditions must hold.
    if p_value >= alpha:
        decision = "HOLD"
        reason = f"not significant: p={p_value:.4g} >= alpha={alpha}"
    elif lift >= min_lift:
        decision = "PROMOTE"
        reason = f"significant (p={p_value:.4g} < alpha={alpha}) and lift {lift:.2%} >= min_lift {min_lift:.2%}"
    elif lift <= -min_lift:
        decision = "REJECT"
        reason = f"significant (p={p_value:.4g} < alpha={alpha}) and variant trails by {lift:.2%}"
    else:
        decision = "HOLD"
        reason = f"significant (p={p_value:.4g} < alpha={alpha}) but lift {lift:.2%} is below min_lift {min_lift:.2%}"

    result = {
        "control_mean": control_mean,
        "variant_mean": variant_mean,
        "lift": lift,
        "bootstrap_ci": ci,
        "test": test_name,
        "z": z,
        "p_value": p_value,
        "alpha": alpha,
        "min_lift": min_lift,
        "decision": decision,
        "reason": reason,
    }
    if test_name == "mann_whitney_u":
        result["u_statistic"] = test["u"]
    if supplementary is not None:
        result["mann_whitney_supplementary"] = supplementary
    return result


def load_input(path: str) -> dict:
    if path in (None, "-"):
        raw = sys.stdin.read()
    else:
        with open(path, "r") as handle:
            raw = handle.read()
    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        raise ValueError(f"input is not valid JSON: {exc}") from exc


def validate_input(payload: dict) -> None:
    if not isinstance(payload, dict):
        raise ValueError("input JSON must be an object")
    if "control" not in payload:
        raise ValueError("input JSON must include a 'control' array")
    if not isinstance(payload["control"], list) or not payload["control"]:
        raise ValueError("'control' must be a non-empty array")
    if "variants" not in payload or not isinstance(payload["variants"], dict) or not payload["variants"]:
        raise ValueError("input JSON must include a non-empty 'variants' object")
    for name, values in payload["variants"].items():
        if not isinstance(values, list) or not values:
            raise ValueError(f"variant '{name}' must be a non-empty array")
    metric = payload.get("metric", "conversion")
    if metric not in ("conversion", "value"):
        raise ValueError("'metric' must be 'conversion' or 'value'")


def run(payload: dict, default_iterations: int, default_seed: int, default_confidence: float) -> dict:
    validate_input(payload)
    metric = payload.get("metric", "conversion")
    alpha = payload.get("alpha", 0.05)
    min_lift = payload.get("min_lift", 0.15)
    iterations = payload.get("bootstrap_iterations", default_iterations)
    seed = payload.get("seed", default_seed)
    confidence = payload.get("confidence", default_confidence)
    control = payload["control"]

    results = {}
    for name, variant_data in payload["variants"].items():
        results[name] = compare_variant(control, variant_data, metric, alpha, min_lift, iterations, seed, confidence)

    return {
        "metric": metric,
        "alpha": alpha,
        "min_lift": min_lift,
        "bootstrap_iterations": iterations,
        "seed": seed,
        "results": results,
    }


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description="Score an A/B or multivariate marketing experiment (promote-gate decision).")
    parser.add_argument("input", nargs="?", default="-", help="Path to a JSON input file, or '-' for stdin (default).")
    parser.add_argument("--iterations", type=int, default=10000, help="Bootstrap resampling iterations (default: 10000).")
    parser.add_argument("--seed", type=int, default=1234, help="Seed for the bootstrap RNG, for reproducible output (default: 1234).")
    parser.add_argument("--confidence", type=float, default=0.95, help="Confidence level for the bootstrap interval (default: 0.95).")
    args = parser.parse_args(argv)

    try:
        payload = load_input(args.input)
        output = run(payload, args.iterations, args.seed, args.confidence)
    except ValueError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    print(json.dumps(output, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
