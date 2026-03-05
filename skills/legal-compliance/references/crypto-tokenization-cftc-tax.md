# Tokenization, CFTC Authority, and Crypto Tax

RWA tokenization legal framework, CFTC jurisdiction and registration, IRS crypto tax rules, and DAO liability. Focused on tokenization startups.

**Last Verified:** March 2026 | Not legal advice.

---

## RWA Tokenization — What Matters

Tokenizing an asset does not change its legal nature. The SEC's January 28, 2026 staff statement confirmed: "The format of issuance or technology used for recordkeeping, whether onchain or offchain, does not alter the application of the federal securities laws." Run a Howey test on every token before launch. See `crypto-securities-law.md` for the full Howey analysis.

### RWA Token Category Analysis

| Asset Type | Security Analysis | Key Factor |
|-----------|------------------|-----------|
| Tokenized real estate (fractional ownership) | Almost always a security if passive investors | Investors rely on manager's efforts for returns |
| Tokenized art / collectibles (fractional) | Likely security if marketed for appreciation | Profit expectation + efforts of others |
| Revenue-sharing tokens | Securities | Revenue distribution = profit from others' efforts |
| Tokenized Treasury bills / money market | Securities (underlying is already a security) | Underlying instrument classification carries through |
| Tokenized commodities (gold, oil) | Commodity (CFTC jurisdiction) | No issuer effort driving value |
| Utility tokens (genuine, functional) | Not a security if Howey prongs 3-4 fail | Must be functional at sale |
| Stablecoins (fully backed, non-yield) | Not a security (per SEC 2025 guidance, GENIUS Act) | No profit expectation; payment instrument |

### BlackRock BUIDL as Model STO Structure

- Issued under Rule 506(c) of Regulation D + Section 3(c)(7) of Investment Company Act
- Minimum investment: $5 million
- Restricted to qualified purchasers ($5M+ investable assets for individuals)
- Transfer agent: Securitize LLC (registered; handles KYC/AML and whitelist)
- Custodian: Bank of New York Mellon
- Secondary transfers restricted to whitelisted, KYC-approved wallets
- Tokenized on Ethereum; expanded to Avalanche, BNB Chain

---

## UCC Article 8 — Tokenized Investment Securities

**Source:** https://www.law.cornell.edu/ucc/8

### Two Holding Systems

**Direct Holding (Issuer-Tokenized):**
If the issuer tokenizes on blockchain as its master securityholder record, the token IS the registered security (uncertificated security) under Article 8. On-chain transactions update the issuer's records — satisfying Article 8's notation requirement for uncertificated securities.

**Indirect Holding (Custodial Model):**
If a custodian holds the underlying security and issues tokens, those tokens represent "security entitlements" under UCC Article 8 Part 5. Token holders have rights against the custodian intermediary, not the issuer directly.

### Control Under UCC Section 8-106

Control over an uncertificated security:
- Registration in the transferee's name, OR
- Agreement by issuer to comply with instructions from transferee without further consent of registered holder

For security entitlements: control established when securities intermediary agrees to follow entitlement holder's instructions.

**Smart contract implementation:** A smart contract can implement Section 8-106 control if:
- Blockchain record IS the issuer's official register (direct holding), OR
- A registered transfer agent operates the blockchain and implements control rules

### UCC Article 12 (New — Controllable Electronic Records)

Enacted in several states (2022 ULC amendments). Governs "controllable electronic records" (CERs) — includes crypto assets and may include tokenized securities. Article 12 introduces a "control" standard for transfer that mirrors bearer instrument logic.

### Compliance Steps for Tokenized Securities

1. Engage SEC-registered transfer agent to operate or oversee token registry
2. Ensure smart contract functionality maps to UCC Article 8 transfer requirements
3. Implement transfer restrictions in smart contract to prevent unregistered transfers
4. Maintain off-chain backup records as required by SEC Rule 17Ad-19

---

## CFTC Authority Over Digital Assets

**Statutory Basis:** Commodity Exchange Act (CEA), 7 U.S.C. § 1 et seq.

### Commodity Classification

**Bitcoin:** CFTC commodity — confirmed in CFTC v. McDonnell (E.D.N.Y. 2018) and multiple enforcement actions.

**Ether:** CFTC treats as commodity since at least 2019; confirmed in Ooki DAO case.

**Commodity Definition (7 U.S.C. § 1a(9)):** Any good, article, service, right, or interest in which contracts for future delivery are presently or in the future dealt in. Very broad — most non-security digital assets are commodities.

**Key distinction:** Security → SEC jurisdiction. Commodity → CFTC jurisdiction (derivatives; increasingly spot markets).

### CFTC Jurisdiction Triggers

**CFTC has clear jurisdiction over:**
- Futures contracts on digital commodity assets (must trade on CFTC-registered DCM)
- Options on commodity futures
- Swaps (including crypto swaps — must report to Swap Data Repositories)
- Retail commodity transactions (leveraged/margined transactions not on DCM, under CEA § 2(c)(2)(D))
- Fraud and manipulation in spot markets for commodities (CEA § 6(c)(1), § 9)

**CFTC spot market (2025 developments):**
- December 2025: CFTC announced spot crypto products can trade on federally registered DCMs for the first time
- December 2025: No-action letter allows FCMs to accept BTC, ETH, and payment stablecoins as eligible collateral

### Registration Requirements for Derivatives Platforms

| Activity | Required Registration |
|----------|----------------------|
| Operating exchange for crypto futures/options | Designated Contract Market (DCM) |
| Operating swap execution facility | Swap Execution Facility (SEF) |
| Acting as intermediary for futures | Futures Commission Merchant (FCM) |
| Trading crypto derivatives for customers | Introducing Broker (IB) or Commodity Pool Operator (CPO) |
| Managing fund trading commodity interests | Commodity Pool Operator (CPO) |
| Advising on commodity trading | Commodity Trading Advisor (CTA) |

**Enforcement risk:** Operating an unregistered facility offering leveraged crypto products to US persons violates CEA. Geographic restrictions (IP blocks, T&Cs) are insufficient to avoid jurisdiction if US persons actually access the platform.

---

## CFTC v. Ooki DAO — DAO Liability Under CEA

**Case:** CFTC v. Ooki DAO (N.D. Cal.), filed Sept 22, 2022; default judgment June 9, 2023

**Background:** bZeroX operated leveraged crypto trading platform without CFTC registration. Founders transferred control to Ooki DAO via governance tokens, believing DAO status would make it "enforcement-proof."

**CFTC's legal theory:**
- Ooki DAO is an **unincorporated association** under applicable law
- Token holders who voted in governance = membership in that association
- Unincorporated associations can be sued as entities
- Members face **joint and several liability** for entity obligations

**Violations:** Operating illegal off-exchange leveraged digital asset trading facility; failing to register as FCM; failing to comply with BSA/KYC/AML.

**Judgment:** Permanent shutdown + $643,542 civil monetary penalty

**Lido DAO (January 2025):** California federal court held Lido DAO token holders and associated VC firms could face unlimited personal liability as general partners — reinforcing Ooki DAO precedent in civil liability context.

---

## DAO Legal Structure Alternatives

### Problem: Unstructured DAO Liability

An unregistered, unstructured DAO is treated as an **unincorporated association** under most US state laws:
- Can be sued as an entity
- Members may face joint and several personal liability
- Governance token holders who vote are at highest risk of being deemed members

### Structured DAO Alternatives

**Option 1 — Wyoming DUNA (Decentralized Unincorporated Nonprofit Association)**
- Enacted March 2024 (W.S. § 17-32-101 et seq.)
- Members shielded from personal liability; entity can hold property, sue/be sued, enter contracts
- Governance remains on-chain
- Tax: Not-for-profit; no profit distributions to members
- Best for: Protocol DAOs with community treasuries; governance structures where profit distribution is secondary

**Option 2 — Cayman Islands Foundation Company**
- Hybrid between company and foundation; no shareholders; governed by directors + optional supervisor
- Members/token holders have no personal liability
- Can be purpose-built for protocol governance; no tax in Cayman
- Best for: Layer 1 protocols, large token treasuries, international projects
- Limitation: Must establish legitimate offshore substance

**Option 3 — Marshall Islands DAO LLC**
- Specific DAO recognition in statute (Non-Profit Entities (Amendment) Act 2020)
- Limited liability for members; offshore

**Option 4 — Delaware LLC**
- Standard LLC with operating agreement establishing DAO-like governance
- Established legal framework; courts familiar with LLC
- Smart contract governance integrated via operating agreement provisions
- Best for: Projects wanting US incorporation with institutional investors

### Compliance Steps for DAO-Adjacent Token Products

1. Never operate an unregistered, unstructured DAO if offering services subject to CEA or Securities Act
2. Establish legal entity wrapper before token launch
3. Structure wrapper to limit member liability if governance tokens are distributed
4. Implement legal separation between protocol governance and commercial operations
5. Ensure US-facing service entities are separately incorporated and regulated
6. Governance tokens that distribute revenue to holders require full Howey analysis

---

## IRS Crypto Tax Rules

**Foundational rule:** Digital assets are property for federal income tax purposes (IRS Notice 2014-21). Every sale, exchange, or disposition is a taxable event.

### Capital Gains Treatment

- **Short-term** (held ≤ 1 year): Taxed at ordinary income rates (up to 37%)
- **Long-term** (held > 1 year): 0%, 15%, or 20% based on income
- **NIIT:** Additional 3.8% for high earners
- **Like-kind exchange (Section 1031):** Does NOT apply to crypto-to-crypto swaps (eliminated by TCJA 2017)

### Cost Basis Methods

| Method | Description | Notes |
|--------|-------------|-------|
| FIFO | First-In, First-Out; default if specific ID not established | |
| Specific Identification | Identify specific units sold at time of sale; requires adequate records | |
| HIFO | Highest-In, First-Out; minimizes taxable gains | Permitted as specific ID method |
| LIFO | Last-In, First-Out | Less commonly used |

**2025 Rule (Revenue Procedure 2024-28):** After January 1, 2025, if specific ID is not established for assets held in self-custody wallets, FIFO applies by default. Establish per-wallet specific identification before this date.

### Wash Sale Rule — Currently Does NOT Apply to Crypto

The wash sale rule under IRC Section 1091 applies only to "stock or securities." Digital assets are not stock or securities under Section 1091 — so the rule **currently does not apply**.

**Practical effect:** Can sell tokenized asset at loss, immediately repurchase, and still claim the loss.

**Legislative risk:** Multiple bills have proposed extending wash sales to digital assets (none passed as of March 2026). Monitor closely.

**Exception:** If the tokenized asset is a traditional security (e.g., tokenized stock), the wash sale rule likely applies because the underlying instrument is a security under Section 1091.

### Staking and Mining Income

**Revenue Ruling 2023-14:** Staking rewards are taxable as **ordinary income** in the year received, at fair market value when the taxpayer has "dominion and control" over the rewards.

**Mining income:** Ordinary income when received at FMV. Business expenses deductible (electricity, equipment depreciation under Section 179 or MACRS).

**DeFi staking in investment trusts (Rev. Proc. 2025-31, November 2025):** IRS safe harbor allows broadly held fixed investment trusts (e.g., Bitcoin ETFs) to stake digital assets without losing trust status. Enables tokenized fund structures to participate in staking.

### DeFi Tax Treatment

- **Token swaps:** Taxable exchange events — each swap triggers gain/loss recognition
- **Liquidity pool deposits:** Exchange event (disposing deposited assets, receiving LP tokens)
- **Liquidity pool withdrawals:** Disposing LP tokens, receiving underlying assets — taxable
- **LP rewards/fees:** Ordinary income when received
- **Impermanent loss:** No specific IRS guidance; conservative position is to recognize loss/gain upon withdrawal

**Platforms with DeFi liquidity features:** Users face complex tax obligations. Determine if your platform constitutes a "broker" with 1099-DA reporting obligations.

### IRS Form 1099-DA — Broker Reporting (Section 6045)

**Statutory basis:** IRC Section 6045 as amended by Infrastructure Investment and Jobs Act (IIJA) of 2021; Final Regulations (TD 10000, July 2024)

**Who is a "Broker" for digital assets:**
- Entities taking possession of digital assets being sold by customers
- Operators of custodial digital asset trading platforms
- Operators of certain digital asset hosted wallet providers
- Operators of digital asset kiosks (ATMs)

**Not brokers (currently):** Decentralized protocols without custody, pure software/interface providers, non-custodial wallet providers

**Reporting Timeline:**

| Transaction Period | Filing Deadline |
|-------------------|----------------|
| 2025 transactions → gross proceeds | February 28 (paper) or March 31, 2026 (electronic) |
| 2026 transactions → gross proceeds + cost basis | February/March 2027 |

**Form 1099-DA Required Fields:**
- Gross proceeds from sale
- Digital asset description (name, symbol)
- Transaction date and FMV
- Cost basis (for covered securities, starting 2026)
- Holding period indicator (short vs. long-term)

**Transition Relief (Notice 2025-33):** IRS extended broker reporting penalty relief through 2027 for good-faith compliance efforts.

### Tokenized Asset Tax Compliance Checklist

- [ ] Determine if platform takes custody of customer assets (if yes, likely a broker)
- [ ] Collect W-9/W-8BEN from customers
- [ ] Implement per-transaction cost basis tracking
- [ ] File Form 1099-DA for 2025 transactions (deadline February/March 2026)
- [ ] Furnish payee statements to customers by January 31, 2026
- [ ] Monitor wash sale rule legislation for digital assets

---

## SEC Enforcement on DeFi Protocols

**When DeFi lending protocols are securities:**
- Lending protocols that pool lender funds and pay interest from borrowers may constitute an "investment contract" (Howey) or security under Reves test
- If platform advertises yield, matches lenders/borrowers, and lenders rely on platform's efforts → likely securities

**When governance tokens are securities:**
- Governance token that distributes revenue to holders → strong securities argument (profit from others' efforts)
- Pure voting rights with no economic returns → less clearly a security; no SEC safe harbor guidance yet (as of March 2026)

**February 2025:** SEC Crypto Task Force (Commissioner Peirce) identified governance token classification as a key area for forthcoming guidance.

---

## Full Compliance Checklist for Tokenization Startups

### Before Issuing Any Token
- [ ] Conduct Howey test analysis on each token class
- [ ] Obtain securities law opinion from qualified counsel
- [ ] If security: select exemption (Reg D 506(c) recommended for institutional)
- [ ] File Form D within 15 days of first sale
- [ ] Implement KYC/AML program before accepting investors

### For RWA Tokenization Platform
- [ ] Engage SEC-registered transfer agent for tokenized securities registry
- [ ] Implement transfer restrictions aligned with UCC Article 8 and applicable exemption
- [ ] Determine broker-dealer/ATS registration need for secondary trading
- [ ] Implement whitelist controls for restricted securities
- [ ] Establish 1099-DA reporting system if taking custody of customer assets

### For DeFi/Protocol Elements
- [ ] Establish legal entity wrapper (Wyoming DUNA, Cayman Foundation, or Delaware LLC)
- [ ] Analyze governance token classification before distribution to US persons
- [ ] Assess lending protocol for securities law compliance (Howey + Reves)
- [ ] Do not offer leveraged trading to US persons without CFTC registration

### For Tax/IRS Compliance
- [ ] Collect W-9 from US customers, W-8BEN from foreign customers
- [ ] Implement per-transaction cost basis tracking
- [ ] File Form 1099-DA for 2025 transactions (due February/March 2026)
- [ ] Document staking reward treatment as ordinary income when received
- [ ] Monitor wash sale rule legislation for digital assets

---

## Sources

- [SEC Framework for Investment Contract Analysis](https://www.sec.gov/files/dlt-framework.pdf)
- [SEC Staff Statement on Tokenized Securities (January 28, 2026)](https://www.sec.gov/newsroom/speeches-statements/corp-fin-statement-tokenized-securities-012826)
- [UCC Article 8 — Investment Securities (Cornell LII)](https://www.law.cornell.edu/ucc/8)
- [ULC Statement on UCC Article 8 (September 2024)](https://higherlogicdownload.s3.amazonaws.com/UNIFORMLAWS/b7c515db-1895-4387-bb2d-ee99e58c0066/UploadedImages/Documents/ULC_Statement_on_Ownership_of_Investment_Property_under_UCC_Article_8-Sep_2024.pdf)
- [CFTC Digital Asset Enforcement and Guidance](https://www.cftc.gov/digitalassets)
- [Commodity Exchange Act (7 U.S.C. § 1)](https://www.law.cornell.edu/uscode/text/7/1)
- [CFTC v. Ooki DAO Press Release](https://www.cftc.gov/PressRoom/PressReleases/8590-22)
- [CFTC Digital Asset Collateral No-Action Letter 25-40](https://www.cftc.gov/csl/25-40/download)
- [IRS Notice 2014-21 (Virtual Currency as Property)](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Digital Assets Page](https://www.irs.gov/filing/digital-assets)
- [IRS Final Regulations — Broker Reporting (TD 10000, July 2024)](https://www.irs.gov/newsroom/final-regulations-and-related-irs-guidance-for-reporting-by-brokers-on-sales-and-exchanges-of-digital-assets)
- [IRS Form 1099-DA](https://www.irs.gov/forms-pubs/about-form-1099-da)
- [Rev. Proc. 2025-31 — Staking Safe Harbor for Trusts](https://www.irs.gov/pub/irs-drop/rp-25-31.pdf)
- [IRS Notice 2025-33 — Broker Reporting Relief Extension](https://rsmus.com/insights/tax-alerts/2025/irs-extends-digital-asset-broker-relief-through-2027.html)
- [Wyoming DUNA Framework](https://frblaw.com/the-wyoming-duna-and-the-future-of-dao-legal-frameworks/)
- [BlackRock BUIDL Launch (March 2024)](https://www.nasdaq.com/press-release/blackrock-launches-its-first-tokenized-fund-buidl-on-the-ethereum-network-2024-03-20)
- [SEC Rule 144 — Selling Restricted Securities](https://www.sec.gov/reports/rule-144-selling-restricted-control-securities)
