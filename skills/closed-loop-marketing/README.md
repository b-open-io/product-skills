# Closed-Loop Marketing

Mandatory measurement discipline for every marketing deliverable produced in
this org. A marketing skill can tell you what to do; this skill requires that
the output also declare how it will be judged, before it ships.

## What it does

Defines the readback contract every marketing deliverable must attach:
a metric, an analytics source, a promote/reject decision rule, and a
rollback rule. Routes verification to `experiment-stats` (A/B-style
deliverables) or `content-scorer` (single-piece content), and requires the
verdict to be recorded before a task counts as done.

## Files

- `SKILL.md` — the contract and the loop (advice → ship → measure → judge →
  promote/reject → record).
- `references/readback-contract.md` — full field spec and five worked
  examples (landing-page CRO, email subject line, SEO content, ad creative,
  pricing page).
- `assets/readback-contract-template.json` — fillable contract template.

## Credit

Adapted from the `closed-loop-analytics-upgrade` skill in
[github.com/ericosiu/ai-marketing-skills](https://github.com/ericosiu/ai-marketing-skills)
(MIT License, Copyright (c) 2026 Single Grain).

## Depends on

- `experiment-stats` — judges A/B-style contracts against the dual gate
  (statistical significance and minimum lift). Built in parallel in this
  repo; not yet implemented at the time this skill was authored.
- `content-scorer` — judges single-piece content contracts, with
  compounding rejection-memory. Built in parallel in this repo; not yet
  implemented at the time this skill was authored.
