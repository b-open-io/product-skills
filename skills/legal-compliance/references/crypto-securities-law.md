# Crypto Securities Law Reference

US securities law applied to digital assets: Howey test, SEC enforcement, exemptions for token offerings. Focused on tokenization startups.

**Jurisdiction:** US Federal Law | **Last Verified:** March 2026 | Not legal advice.

---

## What Matters

Every token issuance requires a Howey analysis before any sale or public communication. Tokenizing an asset does not change its legal nature. The SEC's January 2026 staff statement confirmed: "The format of issuance or technology used for recordkeeping, whether onchain or offchain, does not alter the application of the federal securities laws."

---

## The Howey Test Applied to Digital Assets

**Foundational case:** *SEC v. W.J. Howey Co.*, 328 U.S. 293 (1946)
**SEC FinHub Framework:** https://www.sec.gov/corpfin/framework-investment-contract-analysis-digital-assets (April 2019; updated July 2024)

An "investment contract" (and therefore a security) exists when there is:

1. **Investment of money** — purchase or acquisition for value (cash, crypto, or services). Almost always satisfied. Even airdrops may satisfy this where recipients provide services.

2. **Common enterprise** — investor fortunes linked to each other or to promoter's success. Horizontal commonality (pooled assets) or vertical commonality (tied to promoter's success). SEC view: nearly always satisfied in digital asset purchases.

3. **Expectation of profits** — central contested prong. Key indicators:
   - Token is tradeable on secondary market (or expected to be)
   - Token value tied to Active Participant's (AP's) efforts
   - Token sold broadly as investment, not primarily for consumption
   - AP retains stake creating alignment incentives
   - Token offered at discount to eventual utility value

4. **Efforts of others** — profits expected to derive primarily from AP's managerial or entrepreneurial efforts (courts apply "predominantly" standard, not "solely"). Key indicators:
   - AP controls development, improvement, or promotion of network
   - Network is not yet functional at time of sale
   - AP controls issuance, supply, burns, or buybacks
   - AP determines token listings
   - AP makes governance decisions (code upgrades, validator selection)

**Economic reality principle:** Analysis focuses on how token is offered, marketed, and sold — not its label. A token called a "utility token" is still analyzed under Howey.

### Token Characteristics

| Factor | Increases Security Risk | Decreases Security Risk |
|--------|------------------------|------------------------|
| Network maturity | Pre-launch or incomplete | Fully functional at launch |
| Issuer control | Controls upgrades, listing, supply | Fully decentralized governance |
| Marketing | Emphasizes returns, appreciation | Emphasizes utility and use |
| Transfer restrictions | Freely tradeable | Restricted to platform use |
| Secondary market | Issuer lists on exchanges | No secondary market facilitated |

### When Tokens Are NOT Securities

SEC's FinHub framework identifies factors suggesting consumptive (not security) character:
- Network is fully functional and operational at time of sale
- Token can be immediately used for intended purpose
- Token value correlates with good/service it accesses, not speculative appreciation
- Token is not transferable beyond the network ecosystem
- No AP controls ongoing development or price
- Network is sufficiently decentralized (no single entity controls >20% of tokens or has unilateral authority)

---

## The Reves Test — Notes and Debt Instruments

**Case:** *Reves v. Ernst & Young*, 494 U.S. 56 (1990)

Applied when digital assets resemble notes or debt instruments (yield-bearing tokens, lending protocols, tokenized bonds). Any note with maturity over 9 months is presumed a security — then apply 4-factor "family resemblance" test:

1. **Motivations:** Is seller seeking capital; is buyer seeking investment returns?
2. **Plan of distribution:** Sold broadly to general public as investment?
3. **Investor expectations:** Would reasonable investor expect this to be a security?
4. **Risk-reducing factors:** Is there a regulatory regime (FDIC insurance, collateral) reducing risk?

**High Reves risk:** Yield-bearing tokens, lending protocol tokens, fixed-return staking programs advertising APY, tokenized debt instruments, revenue-sharing tokens.

The SEC used Reves successfully in DeFi Money Market (2021) enforcement action.

---

## Registration Exemptions for STOs (Security Token Offerings)

**Source:** https://www.sec.gov/resources-small-businesses/exempt-offerings

### Regulation D — Private Placement (Most Common for STOs)

**Rule 506(b):**
- Unlimited dollar amount
- No general solicitation or advertising
- Up to 35 non-accredited but "sophisticated" investors; unlimited accredited investors
- File Form D with SEC within 15 days of first sale
- Resale restrictions: restricted securities (typically 12-month holding period under Rule 144)

**Rule 506(c) — Preferred for STOs:**
- Unlimited dollar amount
- General solicitation and advertising permitted
- All purchasers must be verified accredited investors (not just self-certification)
- Verification methods: tax returns, bank/brokerage statements, CPA/attorney/RIA written confirmation
- File Form D within 15 days of first sale

**Accredited Investor Definition (as of 2020):**
- Individual: Net worth >$1M (excluding primary residence) OR income >$200K ($300K joint) for past 2 years
- Entity: Total assets >$5M, or all equity owners are accredited, or licensed professionals (Series 7, 65, 82)

### Regulation A+ — Mini-IPO

**Tier 2 (preferred):**
- Up to $75M in any 12-month period
- SEC qualification required (3-6 month process)
- Audited financial statements required
- Non-accredited investors allowed (limited to 10% of annual income or net worth)
- Ongoing SEC reporting: Form 1-K (annual), 1-SA (semi-annual), 1-U (current)
- Securities are NOT restricted — freely tradeable after qualification

### Regulation CF — Equity Crowdfunding

- Up to $5M in any 12-month period
- Must offer through a single registered intermediary (broker-dealer or funding portal)
- File Form C with SEC
- Financial statement requirements scale with raise amount
- 12-month resale restriction (except to issuer, accredited investors, family members)

### Regulation S — Offshore Offerings

- Exempts offers and sales outside the United States to non-US persons
- No "directed selling efforts" in the US
- 12-month distribution compliance period (Category 3) before resale into US
- Often combined with Reg D (US accredited) + Reg S (non-US)

### Rule 144 — Resale of Restricted Securities

**Holding periods before public resale:**
- Reporting company issuer: 6-month minimum
- Non-reporting company issuer: 12-month minimum

**Additional conditions for affiliates:** Volume limits (≤1% of outstanding shares in any 3-month period), broker transactions, Form 144 filing.

---

## Securities Exchange Act Applied to Crypto

**Source:** https://www.law.cornell.edu/uscode/text/15/chapter-2B

**Key question:** When must a crypto trading platform register?

A platform that brings together buyers and sellers of securities using established non-discretionary methods must register as a national securities exchange OR operate as an ATS.

### ATS Registration Path for Crypto Trading Platforms

1. Register as a broker-dealer with SEC (Form BD) and join FINRA
2. File Form ATS with SEC
3. Comply with Regulation ATS (Rules 300-303):
   - Written policies preventing misuse of material non-public information
   - Books and records requirements (Rules 17a-3, 17a-4)
   - Net Capital Rule (Rule 15c3-1)
   - Customer Protection Rule (Rule 15c3-3)
4. Fair access requirements if ATS exceeds 5% of average daily volume in a security

**Critical:** Operating an unregistered exchange is a federal crime. This was the core charge against Coinbase (June 2023) and Binance (June 2023).

---

## Key SEC Enforcement Cases

### SEC v. Ripple Labs — The Central Ruling (July 13, 2023)

**Case:** 1:20-cv-10832 (S.D.N.Y., Judge Torres)
**Final resolution:** August 2025 settlement; $125M total penalty ($50M paid to SEC); programmatic sales ruling preserved

**Key distinctions based on specific transaction context:**

| Transaction Type | Ruling | Rationale |
|-----------------|--------|-----------|
| **Institutional Sales** (direct written contracts) | **Securities** | Sophisticated buyers understood Ripple would use proceeds to develop ecosystem; reasonable reliance on Ripple's managerial efforts |
| **Programmatic Sales** (open market/exchange) | **NOT Securities** | Retail buyers couldn't know they were purchasing from Ripple vs. any other seller; no contractual nexus; no receipt of promotional efforts |
| **Other Distributions** (airdrops, employee compensation) | **NOT Securities** | No investment of money; Howey prong 1 not satisfied |

**The Ripple Principle:** The same underlying asset can be a security in one context (direct institutional sale with promotional materials) and not a security in another (anonymous exchange purchase). Whether a transaction constitutes an investment contract depends on the totality of circumstances of that **specific transaction**.

### SEC v. Coinbase (June 2023)

**Case:** 1:2023-cv-04738 (S.D.N.Y., Judge Failla)
**March 2024 ruling:** Motion to dismiss denied (except Coinbase Wallet DEX routing claim)

Allegations: Operating unregistered exchange, broker-dealer, and clearing agency; staking program as unregistered security.

Court found: Multiple tokens on Coinbase are securities under Howey; staking-as-a-service constitutes investment contract; combining exchange, broker, and clearing functions without registration is adequately alleged as unlawful.

**Key holding:** Coinbase Wallet DEX routing was NOT broker-dealer activity (too minimal intermediation).

### SEC v. Binance (June 2023)

**Case:** D.D.C.
**2024 ruling:** BUSD stablecoin charges **dismissed entirely** — stablecoins pegged to USD and redeemable at par do not satisfy Howey's profit expectation prong. BNB (during/after ICO), BNB Vault, and BAM staking **allowed to proceed**.

**Key takeaway for stablecoin builders:** The Binance BUSD dismissal supports that payment stablecoins backed 1:1 by USD reserves and redeemable at par are not securities.

---

## SEC 2025 Guidance on Specific Product Categories

### Stablecoins (April 4, 2025)

**SEC Staff Statement:** "Covered Stablecoins" — maintain stable value 1:1 to USD, redeemable 1:1 on demand, backed by low-risk liquid assets (USD, T-bills, repo) — are **NOT securities**.

**Does NOT cover:** Algorithmic stablecoins, yield-bearing stablecoins, non-USD-pegged stablecoins, stablecoins marketed as investments.

**GENIUS Act (July 18, 2025):** Federal law codified non-security status. See `references/crypto-stablecoins-aml.md` for full GENIUS Act coverage.

### Meme Coins (February 27, 2025)

Meme coins with no intrinsic functionality are NOT securities — no active participant undertaking essential managerial efforts.

### Proof-of-Work Mining (March 2025)

Mining PoW cryptocurrencies does NOT constitute a securities offering. Miners expend own resources; no reliance on efforts of others.

### Staking (May–August 2025)

- **Protocol Staking (May 2025):** Validator staking to secure PoS networks for transaction validation rewards — generally NOT a securities offering where staker controls own keys.
- **Liquid Staking (August 2025):** More nuanced — existence of protocol intermediary and yield-bearing receipt tokens requires further Howey analysis.

**Contrast:** Kraken ($30M settlement, 2023) and Consensys (charged 2024) charged under prior leadership for pooled, custodied staking-as-a-service with advertised fixed returns — different from self-directed protocol staking.

### NFTs

Prior enforcement (2023): Impact Theory ($6.1M settlement) and Stoner Cats ($1M) for NFTs sold with explicit financial return promises and reliance on issuer's managerial efforts.

**2025 status:** BAYC/Yuga Labs investigation closed without charges (March 2025). NFTs with explicit financial return promises, fractionalized investments, or royalty-generating structures remain subject to Howey analysis.

### SAB 121 / SAB 122 — Crypto Custody Accounting

**SAB 121 (March 2022):** Required entities safeguarding crypto to record balance-sheet liability + corresponding asset at fair value. Made bank crypto custody economically prohibitive.

**SAB 122 (January 2025):** Rescinded SAB 121 entirely. Balance-sheet requirement eliminated. Banks can now more economically custody security tokens — material for institutional Reg D token offerings.

---

## January 2026 SEC Tokenized Securities Taxonomy

The January 28, 2026 SEC staff statement identified two categories:

**Category 1 — Issuer-Sponsored Tokenized Securities:**
- Issuer (or transfer agent) tokenizes directly on blockchain as master securityholder record
- Treated identically to traditionally issued securities for all purposes

**Category 2 — Third-Party Tokenized Securities:**
- **Custodial model:** Third party holds underlying security; token represents security entitlement under UCC Article 8
- **Synthetic tokenized securities:** "Linked securities" where holder receives economic returns but not direct ownership — may constitute a separate class of security requiring independent registration

**Practical implication:** If your token's rights differ materially from the underlying security (voting, economics, priority), it may be treated as a new, distinct security.

---

## 2025 Regulatory Landscape

### SEC "Project Crypto" — Four-Category Token Taxonomy (Proposed, Not Final Rules)

| Category | Regulatory Status |
|----------|------------------|
| Digital Commodities (BTC, ETH) | CFTC jurisdiction |
| Digital Collectibles (art NFTs, in-game items) | Generally not securities |
| Digital Tools (utility tokens with genuine functionality) | Generally not securities if purely consumptive |
| Tokenized Securities (blockchain representations of financial instruments) | SEC jurisdiction; traditional securities laws apply |

### CLARITY Act (FIT21 Successor)

Passed US House July 2025; pending Senate as of March 2026. Not yet law.

**If enacted:** Tokens classified as "digital commodities" (functional + sufficiently decentralized) would fall under CFTC jurisdiction; "restricted digital assets" (not yet functional or not decentralized) remain SEC. Decentralization test would replace Howey as the primary classificatory framework.

---

## Compliance Checklist for Token-Issuing Startups

### Pre-Launch
- [ ] Conduct written Howey analysis before any sale or marketing activity
- [ ] Obtain securities law opinion from qualified counsel
- [ ] If security: select exemption (Reg D 506(c) recommended for institutional)
- [ ] File Form D within 15 days of first sale
- [ ] Draft comprehensive PPM with risk factors

### Token Design for Decentralization
- [ ] Build functional product before token launch if possible
- [ ] Design genuine utility with token consumption tied to platform usage
- [ ] Avoid using token sales to fund core development (fund with equity first)
- [ ] Decentralize governance over time with clear roadmap
- [ ] Document decentralization milestones for future non-security analysis

### Stablecoin Design
- [ ] Ensure 1:1 USD or equivalent reserve backing
- [ ] Ensure 1:1 redemption at par on demand
- [ ] Do not pay interest or yield on the stablecoin
- [ ] Do not market as investment
- [ ] Review GENIUS Act licensing requirements

### Platform/Exchange
- [ ] If trading security tokens: ATS registration as broker-dealer required
- [ ] Do not intermingle exchange, broker, and clearing functions without registration
- [ ] Pure DEX smart contracts with no intermediation are lower risk but not zero risk

### Ongoing
- [ ] No material misstatements in public communications (Section 10(b) anti-fraud)
- [ ] Update investors on material developments
- [ ] Document decentralization roadmap — periodic Howey re-analysis at milestones

---

## Sources

- [Securities Act of 1933 (15 U.S.C. Chapter 2A)](https://www.law.cornell.edu/uscode/text/15/chapter-2A)
- [Securities Exchange Act of 1934 (15 U.S.C. Chapter 2B)](https://www.law.cornell.edu/uscode/text/15/chapter-2B)
- [SEC FinHub Framework for Investment Contract Analysis](https://www.sec.gov/corpfin/framework-investment-contract-analysis-digital-assets)
- [SEC Exempt Offerings](https://www.sec.gov/resources-small-businesses/exempt-offerings)
- [SEC Crypto Assets Page](https://www.sec.gov/cryptoassets)
- [SEC Statement on Stablecoins (April 4, 2025)](https://www.sec.gov/newsroom/speeches-statements/statement-stablecoins-040425)
- [SEC Chairman Atkins "Project Crypto" (November 12, 2025)](https://www.sec.gov/newsroom/speeches-statements/atkins-111225-secs-approach-digital-assets-inside-project-crypto)
- [SEC Staff Statement on Tokenized Securities (January 28, 2026)](https://www.sec.gov/newsroom/speeches-statements/corp-fin-statement-tokenized-securities-012826)
- [SEC v. Ripple Labs SDNY ruling (July 2023)](https://www.nysd.uscourts.gov/sites/default/files/2023-07/SEC%20vs%20Ripple%207-13-23.pdf)
- [SEC v. Coinbase — Press Release](https://www.sec.gov/newsroom/press-releases/2023-102)
- [FIT21 — H.R. 4763](https://www.congress.gov/bill/118th-congress/house-bill/4763)
- [CourtListener — SEC v. Ripple](https://www.courtlistener.com/docket/6310745/sec-v-ripple-labs-inc/)
