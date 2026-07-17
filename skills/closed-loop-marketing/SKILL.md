---
name: closed-loop-marketing
description: This skill should be used when the user asks to close the loop on a campaign, define a readback metric, set up analytics readback, decide whether a marketing change actually worked, or promote-or-reject a marketing experiment. Trigger phrases include "close the loop on this campaign," "define the readback metric," "did this marketing actually work," "measure this before shipping," "set up analytics readback," and "promote-or-reject this experiment." Enforces a mandatory discipline across all marketing-skills output: every deliverable must declare, before it ships, the metric it will be judged on, the analytics source that supplies it, the decision rule that separates promote from reject, and the rollback rule that governs when to revert — then route measurement to experiment-stats (A/B tests) or content-scorer (content quality) and record the verdict. Use this whenever a marketing skill's output would otherwise be marked "done" without evidence it moved a real number.
version: 0.1.0
---

# Closed-Loop Marketing

Adapted from the `closed-loop-analytics-upgrade` skill in
[github.com/ericosiu/ai-marketing-skills](https://github.com/ericosiu/ai-marketing-skills)
(MIT License, Copyright (c) 2026 Single Grain). This version is the mandatory
contract layer for our organization: it defines what every marketing
deliverable must declare before it counts as shipped, and routes the actual
verification to our own `experiment-stats` and `content-scorer` skills.

## Core Principle

A marketing deliverable is not done until someone checks whether it worked.
An opinion is not a result. Platform truth wins over vibes.

Our ~50 marketing skills (mostly the third-party `marketing-skills` plugin
that Caal calls) tell you WHAT to do — how to write a subject line, structure
a landing page, score a content brief. Almost none of them MEASURE whether
the thing they produced actually moved anything. This skill closes that gap:
it sits on top of every one of those skills as a non-negotiable contract that
must be satisfied before any of their output counts as finished.

## The Readback Contract (mandatory)

Every marketing deliverable — a landing-page change, an email subject line, a
content piece, an ad creative, a pricing-page change — declares a readback
contract **before it ships**, not after. Declaring it after the fact means
you are already rationalizing toward whatever the number turns out to say,
which defeats the point of measuring in the first place.

Full field spec and worked examples: `references/readback-contract.md`.
Fillable copy: `assets/readback-contract-template.json`.

The contract has five required parts:

1. **Readback metric** — the ONE number this deliverable is judged on. Not
   five. One primary metric, optionally one or two secondary metrics that
   catch obvious downside (e.g. bounce rate alongside conversion rate).
2. **Analytics source** — where that number comes from: GA4 property and
   report, Search Console query, the email platform's campaign stats,
   Stripe/revenue, an ad platform's reporting API. It must be a real,
   queryable source. "We'll just look at it" is not a source.
3. **Decision rule** — the dual gate a candidate must clear to promote:
   **statistical significance** (an `alpha`, default 0.05) **and** a
   **minimum lift** (`min_lift`, e.g. +5%). Both are required. A
   statistically significant result with a trivial lift is not a win; a
   large raw lift with no significance is noise. This is the gate
   `experiment-stats` applies.
4. **Rollback rule** — what triggers reverting: the metric moves negative
   beyond a stated tolerance, or the measurement window closes without
   reaching significance and volume is too low to ever reach it.
5. **Status** — `declared` → `shipped` → `measuring` → `promoted` /
   `rejected` / `rolled_back`.

No readback contract attached means the deliverable is not done, even when
the output feels obviously good — that is exactly the moment a team is most
tempted to skip measurement, and exactly the moment vibes are least reliable.

## The Loop

```
advice -> ship -> measure -> judge -> promote or reject -> record
```

1. **Advice.** A marketing skill (`copywriting`, `cro`, `emails`, `ai-seo`,
   `ads`, `ab-testing`, etc.) produces a recommendation or deliverable.
2. **Contract.** Before it ships, attach the readback contract described
   above. If the deliverable cannot name both a metric and a source, that is
   a signal the change is too vague to ship as-is — sharpen it before
   proceeding, don't ship first and figure out measurement later.
3. **Ship.** Deploy the deliverable through its normal path. This skill does
   not ship, deploy, or publish anything itself.
4. **Measure.** After the declared measurement window closes, pull the
   number from the declared `analytics_source`. Use a real API or dashboard
   pull. Never estimate or infer a number that wasn't actually retrieved.
5. **Judge.** Hand baseline and candidate numbers to the tool the
   `decision_rule` names:
   - **A/B or split-test deliverables** (landing-page variants, subject
     lines, ad creative, pricing tests) route to `experiment-stats`. It
     applies the dual gate — statistical significance AND minimum lift, both
     required to promote.
   - **Content-quality deliverables** without a clean control group (SEO
     articles, blog posts, long-form content) route to `content-scorer`. It
     scores the piece against the declared metric and maintains a
     compounding rejection-memory — content that failed once for a specific
     reason gets checked against that same reason on every future pass, so
     the identical mistake cannot quietly re-ship.
   - Verify the exact invocation and output shape of `experiment-stats` and
     `content-scorer` once those skills exist in this repo. This skill
     defines the contract they consume; it does not own their internals,
     and neither exists yet at the time this skill was authored.
6. **Decide.** Promote, reject, keep testing, or mark unproven. "Probably
   fine" is not a valid decision state.
7. **Record.** Write the verdict back into the contract's `status` and
   verdict fields. If promoted, fold the finding back into whatever skill,
   brief, or playbook produced the original advice, so the next output
   already incorporates what was learned.

## The Decision Rule, In Detail

The dual gate exists because either half alone is misleading:

- **Significance without lift** — a test can reach statistical significance
  on a trivial or even negative effect size if volume is high enough. That
  is not a reason to promote.
- **Lift without significance** — a large-looking raw delta on low volume is
  usually noise, not signal. That is not a reason to promote either.

Both conditions must hold. `experiment-stats` is the tool of record for this
check on A/B-style deliverables: pass it the baseline window, the candidate
window, the primary metric, and the contract's `alpha` and `min_lift`, then
record the verdict it returns.

For deliverables that don't have a clean baseline/candidate split (a single
piece of SEO content, a rewritten page with no held-out control), route to
`content-scorer` instead. Its job is to score the piece against the declared
readback metric and check it against its own compounding rejection-memory of
prior failures on similar content.

## Rollback Rule — Vibes Are Not Evidence

"Only the author liked it" is called out explicitly in the upstream skill as
a disqualifying reason to promote. Treat it as one entry in a broader
do-not-promote checklist:

- Sample volume is too low to trust the result.
- Attribution is dirty — multiple concurrent changes shipped in the same
  window, so the effect can't be isolated to this deliverable.
- The result is explained by seasonality or an unrelated campaign, not the
  change under test.
- The analytics pull failed, returned partial data, or couldn't reach the
  declared source at all.
- The only signal in favor of the change is that someone on the team liked
  how it reads.

Any of these triggers `rejected` or `unproven`, never `promoted`. When in
doubt, mark the contract `unproven`, extend the measurement window until
volume is sufficient, and note the reason so the next attempt doesn't repeat
the same timing mistake.

## Safety Boundaries

Read-only analytics pulls are always fine and expected — that is the whole
point of this skill. Actual writes — publishing to a live CMS, spending ad
budget, sending a campaign, changing a live price — are governed by the
deliverable's own skill (`paid-ads`, `emails`, `pricing`, etc.) and the org's
normal approval flow. This skill's authority stops at deciding whether a
deliverable should be promoted, and every write that follows that decision
still goes through the approval flow of the skill that owns it.

## How Caal Applies This

Whenever Caal (the marketer agent) invokes any of the marketing-skills tools
to produce output — copy, an experiment design, a content piece, an ad
creative, a pricing recommendation — Caal attaches a readback contract before
reporting the task as done:

- If the invoked skill's output implies a measurable change (true for
  nearly all of them), Caal fills out
  `assets/readback-contract-template.json` (or an equivalent structured
  note carried in the task record) for that deliverable before marking it
  shipped.
- Caal does not mark a marketing task "done" on the strength of the output
  alone. "Done" means: contract declared, deliverable shipped, and — once
  the measurement window closes — a verdict recorded via `experiment-stats`
  or `content-scorer`.
- If a task genuinely has no analytics surface to measure against (a one-off
  internal brainstorm, a discovery doc with nothing shipped), Caal records
  "unmeasurable" as the deliverable's status directly in the task, with a
  one-line reason, so the gap is visible to anyone reviewing the work later.

## Worked Examples

Five common marketing deliverables — a landing-page CRO change, an email
subject-line test, an SEO content piece, a paid-ad creative, and a
pricing-page change — each with a filled contract, are worked through in
`references/readback-contract.md`.

## Non-Goals

- This skill does not run experiments. `experiment-stats` does.
- This skill does not score content quality. `content-scorer` does.
- This skill does not ship, deploy, or publish anything.
- This skill does not fabricate a source when a real one doesn't exist. If
  there is no analytics source for a deliverable, say so and mark the
  deliverable unmeasurable in the contract's status field.

## References

- `references/readback-contract.md` — full field spec and five worked
  examples showing how each deliverable type routes to `experiment-stats` or
  `content-scorer`.
- `assets/readback-contract-template.json` — fillable contract template.
