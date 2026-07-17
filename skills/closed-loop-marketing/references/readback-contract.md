# The Readback Contract — Full Spec

This is the detailed reference for `SKILL.md`. It defines every field a
readback contract can carry and walks through five worked examples covering
the most common marketing-deliverable shapes.

## Required Fields

| Field | Type | Meaning |
|---|---|---|
| `deliverable` | string | One line describing what shipped. |
| `owner` | string | Who is accountable for the verdict. |
| `hypothesis` | string | What you expect to change, and why. |
| `readback_metric.name` | string | The single primary metric this is judged on. |
| `readback_metric.definition` | string | Exact definition — avoid ambiguity ("conversion rate" alone is not enough; specify the funnel step and denominator). |
| `readback_metric.baseline_value` | number \| null | Value before the change, filled once measured. |
| `readback_metric.target_value` | number \| null | The value that would count as a win, if known up front. |
| `analytics_source.platform` | string | GA4, Search Console, email platform, Stripe/revenue, ad platform, etc. |
| `analytics_source.query_or_report` | string | The specific report, query, event, or dashboard that supplies the number. |
| `decision_rule.verifier` | `experiment-stats` \| `content-scorer` | Which tool judges this contract. |
| `decision_rule.alpha` | number | Significance threshold (default `0.05`). Only meaningful for `experiment-stats`. |
| `decision_rule.min_lift` | number | Minimum relative or absolute lift required to promote, in addition to significance. |
| `rollback_rule` | string | The condition that triggers reverting. |
| `measurement_window.start` / `.end` | ISO date | The window the verdict is drawn from. |
| `status` | enum | `declared` / `shipped` / `measuring` / `promoted` / `rejected` / `rolled_back` / `unproven`. |
| `verdict.decision` | string | Filled once judged. |
| `verdict.measured_value` | number \| null | The actual number pulled from the source. |
| `verdict.delta` | number \| null | Candidate minus baseline. |
| `verdict.recorded_at` | ISO date | When the verdict was recorded. |
| `verdict.notes` | string | Caveats, confounders, anything that qualifies the verdict. |

A contract with an empty `readback_metric.name` or `analytics_source.platform`
is not a contract — it's a placeholder. Do not ship against one.

## Worked Example 1 — Landing-Page CRO Change

**Deliverable:** New hero section on the pricing page, produced by the `cro`
skill (shorter headline, single CTA instead of two).

```json
{
  "deliverable": "Pricing page hero rewrite — single CTA, shorter headline",
  "owner": "caal",
  "hypothesis": "Removing the secondary CTA reduces decision paralysis and increases clicks to checkout.",
  "readback_metric": {
    "name": "hero_cta_click_rate",
    "definition": "Clicks on the primary CTA / unique pricing-page sessions",
    "baseline_value": null,
    "target_value": null
  },
  "analytics_source": {
    "platform": "GA4",
    "query_or_report": "Event: cta_click (event_label=pricing_hero) / sessions on /pricing",
    "access_notes": "Requires GA4 custom event already firing on the CTA."
  },
  "decision_rule": {
    "verifier": "experiment-stats",
    "alpha": 0.05,
    "min_lift": 0.05,
    "min_sample_size": 2000,
    "notes": "50/50 split test, not a straight ship."
  },
  "rollback_rule": "If click rate drops below baseline by more than 2 points at any point after 1000 sessions per variant, roll back immediately.",
  "measurement_window": { "start": "", "end": "" },
  "status": "declared"
}
```

Routes to `experiment-stats` because it's a controlled split test with a
clean baseline/candidate split.

## Worked Example 2 — Email Subject-Line A/B Test

**Deliverable:** Two subject-line variants for the monthly product update,
produced by the `emails` skill.

```json
{
  "deliverable": "Monthly update subject line — curiosity hook vs. direct benefit",
  "owner": "caal",
  "hypothesis": "A curiosity-driven subject line beats a direct-benefit one for this list's open rate.",
  "readback_metric": {
    "name": "open_rate",
    "definition": "Unique opens / delivered, per variant",
    "baseline_value": null,
    "target_value": null
  },
  "analytics_source": {
    "platform": "email platform (e.g. Resend/Customer.io campaign stats)",
    "query_or_report": "Campaign report for send ID, split by variant tag",
    "access_notes": "Send must use the platform's native A/B split so variant assignment stays randomized."
  },
  "decision_rule": {
    "verifier": "experiment-stats",
    "alpha": 0.05,
    "min_lift": 0.03,
    "min_sample_size": 5000,
    "notes": "List size determines whether significance is even reachable — check before committing to this test."
  },
  "rollback_rule": "N/A for a single send — record the losing variant and do not reuse its pattern in the next brief.",
  "measurement_window": { "start": "", "end": "" },
  "status": "declared"
}
```

Routes to `experiment-stats`. Note the rollback rule differs from a
persistent page change — a one-time send can't be "rolled back," so it
instead records the losing pattern to avoid in the next brief.

## Worked Example 3 — SEO Content Piece

**Deliverable:** A new long-form article targeting a keyword cluster,
produced by the `ai-seo-optimization` / `programmatic-seo` skills.

```json
{
  "deliverable": "New article: 'BSV wallet security checklist' targeting cluster around wallet security",
  "owner": "caal",
  "hypothesis": "A comprehensive, well-structured article ranks and earns clicks for the target cluster within 60 days.",
  "readback_metric": {
    "name": "gsc_clicks",
    "definition": "Search Console clicks for the published URL, cluster queries only",
    "baseline_value": 0,
    "target_value": null
  },
  "analytics_source": {
    "platform": "Google Search Console",
    "query_or_report": "Performance report filtered by page URL, 28-day rolling window",
    "access_notes": "Baseline is 0 since this is a new URL — judge against the target, not a delta."
  },
  "decision_rule": {
    "verifier": "content-scorer",
    "alpha": null,
    "min_lift": null,
    "min_sample_size": null,
    "notes": "No control group for a single new article — content-scorer judges against the declared metric and its rejection-memory."
  },
  "rollback_rule": "If clicks are still 0 after 90 days and the piece isn't indexed or is indexed but unranked for every target query, mark unproven and route the reason (thin content, cannibalization, indexing issue) into content-scorer's rejection-memory.",
  "measurement_window": { "start": "", "end": "" },
  "status": "declared"
}
```

Routes to `content-scorer` because there's no baseline/candidate split — it's
a single new piece judged against a target and against prior known failure
patterns.

## Worked Example 4 — Paid-Ad Creative

**Deliverable:** A new ad creative variant, produced by the `ad-creative` /
`paid-ads` skills.

```json
{
  "deliverable": "New ad creative — problem/solution framing replacing feature-list framing",
  "owner": "caal",
  "hypothesis": "Problem/solution framing lowers cost per acquisition versus the current feature-list creative.",
  "readback_metric": {
    "name": "cost_per_acquisition",
    "definition": "Ad spend / conversions attributed to the creative, platform-reported",
    "baseline_value": null,
    "target_value": null
  },
  "analytics_source": {
    "platform": "ad platform reporting API (e.g. Meta/Google Ads)",
    "query_or_report": "Campaign report split by ad ID, conversion action = signup",
    "access_notes": "Confirm the conversion action is the same one used for the baseline creative."
  },
  "decision_rule": {
    "verifier": "experiment-stats",
    "alpha": 0.05,
    "min_lift": 0.1,
    "min_sample_size": 1000,
    "notes": "Lift here is a cost reduction, so 'min_lift' means CPA must drop by at least 10%, not rise."
  },
  "rollback_rule": "If CPA rises more than 15% above baseline at any checkpoint, pause the creative — do not wait for the full window on spend-based tests.",
  "measurement_window": { "start": "", "end": "" },
  "status": "declared"
}
```

Routes to `experiment-stats`. Actual spend changes require the ad platform's
own approval flow per the Safety Boundaries section in `SKILL.md` — this
contract governs the judgment, not the spend authorization.

## Worked Example 5 — Pricing-Page Change

**Deliverable:** A restructured pricing table (three tiers instead of four),
produced by the `pricing` skill.

```json
{
  "deliverable": "Pricing table restructure — 3 tiers, annual toggle default",
  "owner": "caal",
  "hypothesis": "Fewer tiers plus an annual-first default increases checkout starts and average contract value.",
  "readback_metric": {
    "name": "checkout_start_rate",
    "definition": "Checkout starts / pricing-page sessions",
    "baseline_value": null,
    "target_value": null
  },
  "analytics_source": {
    "platform": "GA4 + Stripe",
    "query_or_report": "GA4 checkout_start event for rate; Stripe revenue report for secondary ACV metric",
    "access_notes": "Two sources feeding one contract — GA4 for the primary metric, Stripe for the secondary."
  },
  "decision_rule": {
    "verifier": "experiment-stats",
    "alpha": 0.05,
    "min_lift": 0.05,
    "min_sample_size": 1500,
    "notes": "Secondary metric (ACV) must not drop more than 5% even if the primary metric wins — this is the downside check called out in SKILL.md."
  },
  "rollback_rule": "If checkout starts improve but ACV drops beyond the 5% downside tolerance, treat as rejected — a checkout-rate gain that cuts revenue per customer costs the business money.",
  "measurement_window": { "start": "", "end": "" },
  "status": "declared"
}
```

Routes to `experiment-stats`. This example shows why the contract allows a
secondary metric: the primary metric alone can look like a clean win while
quietly damaging revenue per customer.

## Choosing the Verifier

| Deliverable has... | Route to |
|---|---|
| A clean baseline vs. candidate split, run concurrently | `experiment-stats` |
| A single new piece with no held-out control | `content-scorer` |
| Both a split test AND a content-quality judgment (rare) | Run both; record both verdicts in the same contract's `verdict.notes` |

When unsure which applies, default to asking: "Is there a group that didn't
get the change, measured in the same window?" Yes → `experiment-stats`.
No → `content-scorer`.
