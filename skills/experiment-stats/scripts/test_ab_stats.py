#!/usr/bin/env python3
"""Known-answer tests for ab_stats.py. Run with: python3 scripts/test_ab_stats.py

Exits 0 and prints PASS for every case on success; exits 1 and prints FAIL
(with the mismatch) on any failure. No test framework, no third-party
libraries -- just assertions against fixtures whose numbers were checked
by hand (see comments on each case).
"""

import json
import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ab_stats as ab  # noqa: E402

SCRIPT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ab_stats.py")

FAILURES = []


def check(label: str, condition: bool, detail: str) -> None:
    if condition:
        print(f"PASS: {label}")
    else:
        print(f"FAIL: {label} -- {detail}")
        FAILURES.append(label)


def run_cli(payload: dict) -> dict:
    proc = subprocess.run(
        [sys.executable, SCRIPT_PATH],
        input=json.dumps(payload),
        capture_output=True,
        text=True,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"CLI exited {proc.returncode}: {proc.stderr}")
    return json.loads(proc.stdout)


def case_a_hand_verifiable_mann_whitney() -> None:
    # a = [1, 2, 3], b = [4, 5, 6]: every value in b exceeds every value in
    # a, no ties. By hand: rank(a) = {1, 2, 3}, so rank_sum(a) = 6,
    # U_a = rank_sum(a) - n1(n1+1)/2 = 6 - 6 = 0, U_b = n1*n2 - U_a = 9.
    # U = min(U_a, U_b) = 0 -- the maximally separated case for n1=n2=3,
    # exactly verifiable without running any code.
    result = ab.mann_whitney_u([1, 2, 3], [4, 5, 6])
    check("case a: U statistic", result["u"] == 0.0, f"expected U=0, got {result['u']}")
    # Normal-approximation p-value for this exact rank pattern is a fixed
    # number (~0.081); the true small-sample exact p-value is 0.1, so the
    # approximation is expected to land in the same neighborhood, not exactly
    # match -- assert a generous range rather than the literal float.
    check(
        "case a: p-value in expected range for total separation",
        0.02 <= result["p_value"] <= 0.15,
        f"expected p in [0.02, 0.15], got {result['p_value']}",
    )


def case_b_clear_winner_promotes() -> None:
    # Control: 10/100 conversions (10%). Variant: 30/100 conversions (30%).
    # Lift = (0.30 - 0.10) / 0.10 = 2.00 (200%), far above min_lift=0.15.
    # Two-proportion z-test: pooled p = 40/200 = 0.20, SE = sqrt(0.2*0.8*0.02)
    # = 0.05657, z = 0.20 / 0.05657 = 3.5355, p ~= 0.0004 -- far below alpha.
    control = [1] * 10 + [0] * 90
    variant = [1] * 30 + [0] * 70
    payload = {
        "control": control,
        "variants": {"B": variant},
        "metric": "conversion",
        "bootstrap_iterations": 2000,
    }
    output = run_cli(payload)
    result = output["results"]["B"]
    check("case b: decision is PROMOTE", result["decision"] == "PROMOTE", f"got {result['decision']}")
    check("case b: p-value below alpha", result["p_value"] < 0.05, f"got {result['p_value']}")
    check("case b: lift at least min_lift", result["lift"] >= 0.15, f"got {result['lift']}")


def case_c_no_difference_holds() -> None:
    # Control and variant are the same multiset of values (metric="value"),
    # so lift is exactly 0 and the Mann-Whitney rank sums are identical by
    # construction -- p-value is exactly 1.0, the least significant result
    # possible. Must not promote or reject.
    control = [10, 12, 11, 13, 9, 14, 10, 12, 11, 13] * 5
    variant = list(control)
    payload = {
        "control": control,
        "variants": {"B": variant},
        "metric": "value",
        "bootstrap_iterations": 2000,
    }
    output = run_cli(payload)
    result = output["results"]["B"]
    check("case c: decision is HOLD", result["decision"] == "HOLD", f"got {result['decision']}")
    check("case c: lift is ~0", abs(result["lift"]) < 1e-9, f"got {result['lift']}")
    check("case c: p-value is high", result["p_value"] > 0.5, f"got {result['p_value']}")


def case_d_significant_but_small_lift_holds() -> None:
    # Large samples (n=4000 each) make a small effect statistically
    # significant: control 800/4000 (20%), variant 880/4000 (22%).
    # Lift = (0.22 - 0.20) / 0.20 = 0.10 (10%) -- below min_lift=0.15.
    # Two-proportion z-test: pooled p = 1680/8000 = 0.21, SE = sqrt(0.21*0.79*
    # (1/4000+1/4000)) ~= 0.009107, z ~= 0.02/0.009107 ~= 2.196, p ~= 0.028
    # -- below alpha=0.05. This is the case the dual gate exists for: p is
    # significant, but the lift never clears the promote bar.
    n = 4000
    control = [1] * 800 + [0] * (n - 800)
    variant = [1] * 880 + [0] * (n - 880)
    payload = {
        "control": control,
        "variants": {"B": variant},
        "metric": "conversion",
        "bootstrap_iterations": 2000,
    }
    output = run_cli(payload)
    result = output["results"]["B"]
    check("case d: p-value below alpha", result["p_value"] < 0.05, f"got {result['p_value']}")
    check("case d: lift below min_lift", result["lift"] < 0.15, f"got {result['lift']}")
    check(
        "case d: decision is HOLD despite significance (dual gate)",
        result["decision"] == "HOLD",
        f"got {result['decision']}",
    )


def case_bad_input_fails_informatively() -> None:
    proc = subprocess.run(
        [sys.executable, SCRIPT_PATH],
        input=json.dumps({"control": [1, 2, 3]}),  # missing 'variants'
        capture_output=True,
        text=True,
    )
    check("bad input: non-zero exit code", proc.returncode != 0, f"got exit code {proc.returncode}")
    check("bad input: error mentions 'variants'", "variants" in proc.stderr, f"stderr was: {proc.stderr!r}")


def main() -> int:
    case_a_hand_verifiable_mann_whitney()
    case_b_clear_winner_promotes()
    case_c_no_difference_holds()
    case_d_significant_but_small_lift_holds()
    case_bad_input_fails_informatively()

    print()
    if FAILURES:
        print(f"FAIL: {len(FAILURES)} check(s) failed: {FAILURES}")
        return 1
    print("PASS: all checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
