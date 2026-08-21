---
title: b-open adaptation checklist
date: 2026-08-20
purpose: Per-template deltas to apply when adapting the vendored templates in this directory for b-open products (crypto/on-chain and AI agent products). Worked examples live in ../derivatives/.
---

# b-open Adaptation Checklist

Apply the relevant section when adapting a vendored template, then always run the generic fill-in pass at the end. Worked examples of completed adaptations live in `../derivatives/` (e.g., `ai-product-terms.md`).

## NDAs (`mutual-nda.md`, `one-way-nda.md`)

- [ ] Add digital-asset scope: wallet addresses, transaction IDs, and on-chain data already published to a public blockchain are **not** Confidential Information (public-domain carve-out covers them — verify the carve-out wording actually reaches "publicly available on a blockchain").
- [ ] Confirm "return or destroy" obligations exclude data already written on-chain — never promise deletion of on-chain data.
- [ ] If the disclosure involves unreleased token/protocol designs, confirm the residuals clause (if any) is acceptable or strike it.
- [ ] AI delta: if either party may run disclosed materials through AI tools, add a no-training restriction on Confidential Information (mirror the DPA AI clause).

## DPAs (`dpa-global.md`, `dpa-us.md`)

- [ ] On-chain erasure limits: state that personal data written to a public blockchain (addresses, tx metadata, inscriptions) is immutable; deletion/erasure obligations apply only to off-chain systems. Never promise erasure of on-chain data.
- [ ] Keep and verify the **AI/Automated Processing clause** (no training on Personal Data without documented instructions or written authorization; flow-down to subprocessors including AI model providers).
- [ ] List actual subprocessors: AI model providers (e.g., Anthropic), hosting, analytics, blockchain indexers.
- [ ] Check international-transfer mechanism (SCCs/DPF) against where models and infra actually run.
- [ ] Sanctions/AML: confirm processing for compliance screening (wallet screening, sanctions lists) is covered as a documented instruction or legal-obligation basis.

## Privacy policies (`privacy-policy-gdpr.md`, `privacy-policy-us.md`)

- [ ] Disclose collection of wallet addresses and on-chain activity; state plainly that on-chain data is **public and immutable** and cannot be erased or rectified once written — scope GDPR/CCPA deletion-rights language to off-chain data only.
- [ ] No-custody positioning: state whether the product ever holds user keys or funds; if non-custodial, say so and disclaim responsibility for user key management.
- [ ] AI delta: disclose AI processing of user content, the no-training commitment (or the opt-in), and any third-party model providers as recipients.
- [ ] Automated decision-making section: describe any agentic/automated processing and the human-review rights where required (GDPR Art. 22, state profiling opt-outs).
- [ ] Sanctions/AML: disclose screening and legal-obligation processing where applicable.

## Cookie notice (`cookie-notice.md`)

- [ ] Inventory actual cookies/local storage, including wallet-connect session storage and any AI-chat session identifiers.
- [ ] Confirm consent mechanics match the deployed banner (EU vs. US mode).
- [ ] No crypto-specific delta beyond wallet-connection storage — keep it lean.

## Terms of Use (`terms-of-use.md`)

- [ ] Digital-asset risk disclosure: volatility, loss of keys means loss of assets, no-custody positioning, transactions are irreversible, network fees are the user's responsibility.
- [ ] Never promise reversal, recovery, or erasure of on-chain transactions or data.
- [ ] Sanctions/AML/export: user represents they are not sanctioned and will not use the service from embargoed jurisdictions; reserve the right to screen wallets.
- [ ] Marketplace products: add DMCA agent designation and takedown process, and a stolen/infringing-inscription policy (delisting from index/UI — note you cannot remove the underlying on-chain data).
- [ ] AI delta: attach or incorporate the **AI Products Addendum** (`../derivatives/ai-product-terms.md`) — output disclaimers, no-training clause, agent-autonomy authorization, acceptable use, AI disclosure.
- [ ] Verify liability cap and arbitration option (A/B) selection fit the product's risk profile and jurisdiction.

## Advisor & offer letter (`advisor-agreement.md`, `employee-offer-letter.md`)

- [ ] Token/equity compensation: if compensation includes tokens or digital assets, add vesting, valuation, tax-treatment disclaimer, and securities-law flag for counsel.
- [ ] IP assignment: confirm assignment covers AI-assisted work product and on-chain publications (inscriptions, attestations) made in the course of the engagement.
- [ ] Confidentiality clause: apply the NDA deltas above (on-chain carve-out, no-training on confidential materials).
- [ ] Classification check: advisor vs. employee status, state-specific employment terms, at-will language in the correct jurisdiction.

## Generic fill-in pass (every template, every time)

- [ ] Resolve **every** `<mark>` field — grep for `<mark>` and confirm zero remain.
- [ ] Correct entity name (exact registered name of the contracting b-open entity) used consistently throughout.
- [ ] Governing law and venue checked against where the entity is organized and operates; delete unused alternative clauses (e.g., arbitration Option A/B).
- [ ] Dates, version lines, and copyright year updated.
- [ ] Signature blocks complete: legal names, titles, dates — or removed for web-posted policies.
- [ ] Cross-references (section numbers, incorporated policies, URLs) resolve to real, live targets.

---

Every adapted document produced from this checklist is a first draft for licensed counsel in the relevant jurisdiction — review before any execution, publication, or reliance.
