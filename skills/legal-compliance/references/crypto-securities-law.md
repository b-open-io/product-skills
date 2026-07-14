# Crypto Securities Law and Token Classification

US securities-law framing for token launches, tokenized securities, exchange/ATS issues, and startup-facing classification work.

**Last verified:** July 14, 2026
**Not legal advice**

## Governing Authority

Use this **authority ladder** (highest first). Do not invert the order.

### 1. Statute and case law (primary)

- Securities Act of 1933:
  - https://www.law.cornell.edu/uscode/text/15/chapter-2A
- Securities Exchange Act of 1934:
  - https://www.law.cornell.edu/uscode/text/15/chapter-2B
- Howey (investment-contract baseline):
  - https://www.law.cornell.edu/wex/howey_test
- GENIUS Act § 17 (payment stablecoins of **permitted payment stablecoin issuers** — not securities under the amended definitions once the Act’s amendments are effective under § 20):
  - https://www.congress.gov/119/plaws/publ27/PLAW-119publ27.pdf

### 2. Commission-level interpretation (primary / formal agency interpretation)

- **SEC/CFTC Application of the Federal Securities Laws to Certain Types of Crypto Assets…**, Release Nos. **33-11412** / **34-105020** (issued **March 17, 2026**; effective **March 23, 2026**):
  - Rulemaking page: https://www.sec.gov/rules-regulations/2026/03/s7-2026-09
  - PDF: https://www.sec.gov/files/rules/interp/2026/33-11412.pdf
  - CFTC press: https://www.cftc.gov/PressRoom/PressReleases/9198-26
- This is a **Commission** interpretive release (CFTC joined). It outranks staff statements and the FinHub framework. It does **not** repeal *Howey* or substitute for statute.

### 3. Staff statements and speeches (secondary-gov; non-binding)

- SEC FinHub framework:
  - https://www.sec.gov/corpfin/framework-investment-contract-analysis-digital-assets
- SEC stablecoin staff statement, Apr. 4, 2025:
  - https://www.sec.gov/newsroom/speeches-statements/statement-stablecoins-040425
- SEC tokenized securities staff statement, Jan. 28, 2026:
  - https://www.sec.gov/newsroom/speeches-statements/corp-fin-statement-tokenized-securities-012826
- SEC Project Crypto remarks, Nov. 12, 2025:
  - https://www.sec.gov/newsroom/speeches-statements/atkins-111225-secs-approach-digital-assets-inside-project-crypto
- SEC Crypto Task Force:
  - https://www.sec.gov/featured-topics/crypto-task-force

## Current Status as of July 14, 2026

### Howey Still Anchors the Analysis

- For startups, token classification still starts with the investment-contract analysis associated with **Howey**.
- The March 17, 2026 Commission interpretation expressly works within the *Howey* framework; it does not displace statute or Supreme Court precedent as the opening framework for token sales, distributions, or capital-raising activity.

### Commission Interpretation Now Outranks Staff Guidance

- On **March 17, 2026**, the SEC issued a Commission interpretive release on crypto assets (effective **March 23, 2026**); the CFTC joined so that CEA administration would be consistent with the SEC’s securities-law interpretation.
- Core points for triage (always check the release text; do not treat secondary summaries as the rule):
  - functional taxonomy discussion (including digital commodities, collectibles, tools, stablecoins, and digital securities)
  - treatment of non-security crypto assets that may be offered subject to an investment contract
  - discussion of activities such as airdrops, protocol mining, staking, and wrapping
- Staff materials (FinHub framework; Apr. 4, 2025 stablecoins; Jan. 28, 2026 tokenized securities; Project Crypto remarks) remain useful for history and detail, but they are **subordinate** to statute and the Commission interpretation.
- Staff statements still have no independent force of law and are not comprehensive market-structure legislation.

### GENIUS § 17 Is a Separate Statutory Path for Certain Payment Stablecoins

- For **payment stablecoins issued by permitted payment stablecoin issuers**, GENIUS § 17 amends the federal “security” (and CEA “commodity”) definitions — **once effective under GENIUS § 20**.
- As of July 14, 2026, do not assume § 17 is already operative; confirm the § 20 trigger (18 months after enactment or 120 days after final implementing regulations).
- See `crypto-stablecoins-aml.md` for the full effective-date / transitional analysis.

### Market-Structure Legislation Remains Pending

- The House-passed **CLARITY** bill (H.R. 3633) may eventually matter greatly for digital-commodity and mature-network treatment.
- As of July 14, 2026: House-passed July 17, 2025; on the **Senate Legislative Calendar** as of June 1, 2026; **still not enacted**. Do not cite as current law.

## Operational Implication for Startups

### 1. Write the Classification Memo Before Launch Activity

Before a startup launches or publicly discusses a token, prepare a written classification memo covering:

- the token's function
- purchaser motivations
- network status and functionality
- whether proceeds fund ongoing development
- governance rights, profit rights, or revenue claims
- secondary-market expectations
- who the “efforts of others” are
- how the facts map (if at all) to the March 2026 Commission taxonomy discussion

### 2. Marketing Can Make the Case Better or Worse

The same token can become legally riskier if the surrounding facts include:

- appreciation language
- treasury-backed upside claims
- yield or passive-income framing
- roadmap language implying managerial efforts will drive value
- capital-raising before genuine network functionality

### 3. Tokenization Does Not Remove Securities Status

The SEC's January 2026 tokenized-securities staff statement remains a clear staff articulation: changing the format or recordkeeping system does not change the fact that a security remains a security. The March 2026 Commission interpretation should be read together with that principle, not as a free pass for packaging.

For startups, that means:

- tokenized stock is still stock
- tokenized notes can still be notes
- tokenized security entitlements can still trigger securities-law consequences
- synthetic exposure products can create separate securities issues

### 4. Platform and Secondary-Market Questions Follow the Asset

If the product is or may be a security, counsel should also examine:

- broker or dealer questions
- exchange or ATS issues
- transfer-agent or custody mechanics
- whether secondary-market functionality is being built into the product stack

## Working Classification Framework

Use this order:

1. **What is being sold or distributed?**
2. **What economic story is the buyer being told?**
3. **Is the network functional today, or is the sale funding future development?**
4. **Are holders relying on managerial or entrepreneurial efforts for value?**
5. **Does the token represent or wrap an existing security?**
6. **Does the startup or an affiliate operate the trading, custody, or transfer infrastructure?**
7. **Does any statute (e.g., GENIUS § 17 once effective) or Commission interpretation specifically address this product type?**

## Token Category Notes

### Payment Stablecoins

- Counsel often argue the strongest non-security posture where the facts align with the April 2025 SEC staff statement and the product is genuinely a reserve-backed payment instrument; after GENIUS § 17 is effective for a **permitted** payment stablecoin issuer product, the statutory carve-out becomes the higher-authority reference for that narrow class.
- This category should still be checked against GENIUS effective-date status, BSA/OFAC obligations, and state money-transmission overlays.
- Do not treat staff statements or § 17 as a general safe harbor for yield-bearing or hybrid products.

### Utility / Consumptive Tokens

- Stronger argument where the token is usable now for real consumptive functionality and is not sold on an investment thesis.
- Weakens significantly if proceeds fund development, governance drives value, or the product is marketed around appreciation.

### Governance Tokens

- Governance alone is not an automatic securities problem or solution.
- The risk rises when governance is bundled with:
  - treasury upside
  - fee distributions
  - managerial dependence
  - expectation that a core team will build value

### Tokenized Securities

- Start with the assumption that the underlying instrument remains subject to ordinary securities-law treatment.
- Then examine whether the on-chain wrapper creates additional rights, intermediated entitlements, or synthetic exposure.

## Exchange / ATS / Platform Issues

Use the Exchange Act when a startup is:

- matching buyers and sellers
- listing tokenized securities
- running marketplace infrastructure for securities-like assets
- performing customer-facing execution or intermediation

Do not answer these questions only at the token level.
The platform layer can create its own regulatory exposure.

## Unresolved or Contested Points

- Ripple and related litigation remain important but highly fact-specific; do not overgeneralize.
- **SEC v. Coinbase** is **historical / fact-specific**: the Commission announced dismissal of the civil enforcement action on **February 27, 2025** (Press Release 2025-47). Do not present Coinbase as a current live SEC enforcement template; use it only for past theories and history.
- Related exchange enforcement matters (including Binance-related history) should likewise be labeled historical / fact-specific unless counsel confirms current docket status.
- The March 2026 Commission interpretation is a major clarification step, but it is not a substitute for comprehensive market-structure legislation and does not eliminate fact-specific *Howey* analysis.
- Pending market-structure legislation (CLARITY / H.R. 3633) could materially reshape federal boundary lines, but has not done so yet.
- The line between software tooling and regulated marketplace operation is still often fact-intensive.

## Primary Sources

- Securities Act:
  - https://www.law.cornell.edu/uscode/text/15/chapter-2A
- Exchange Act:
  - https://www.law.cornell.edu/uscode/text/15/chapter-2B
- Howey overview:
  - https://www.law.cornell.edu/wex/howey_test
- GENIUS Act Pub. L. 119-27 (incl. § 17):
  - https://www.congress.gov/119/plaws/publ27/PLAW-119publ27.pdf
- SEC/CFTC crypto interpretation (Mar. 17, 2026; Rel. 33-11412 / 34-105020):
  - https://www.sec.gov/rules-regulations/2026/03/s7-2026-09
  - https://www.sec.gov/files/rules/interp/2026/33-11412.pdf
- SEC Coinbase dismissal (historical):
  - https://www.sec.gov/newsroom/press-releases/2025-47
- SEC Crypto Task Force:
  - https://www.sec.gov/featured-topics/crypto-task-force

## Secondary Commentary

- SEC FinHub framework (staff):
  - https://www.sec.gov/corpfin/framework-investment-contract-analysis-digital-assets
- SEC stablecoin staff statement:
  - https://www.sec.gov/newsroom/speeches-statements/statement-stablecoins-040425
- SEC tokenized securities staff statement:
  - https://www.sec.gov/newsroom/speeches-statements/corp-fin-statement-tokenized-securities-012826
- Project Crypto remarks:
  - https://www.sec.gov/newsroom/speeches-statements/atkins-111225-secs-approach-digital-assets-inside-project-crypto
- Use litigation trackers, law-firm analyses, and industry commentary only after checking statutes, Commission interpretations, staff statements, and actual pleadings/opinions.
