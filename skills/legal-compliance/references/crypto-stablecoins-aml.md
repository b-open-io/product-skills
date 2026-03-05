# Stablecoins, AML/FinCEN, and Digital Asset Legislation

US stablecoin regulation, Bank Secrecy Act obligations for crypto businesses, and the legislative landscape (GENIUS Act, FIT21/CLARITY Act).

**Last Verified:** March 2026 | Not legal advice.

---

## What Matters

The **GENIUS Act** (signed July 18, 2025) is now **active law** — the primary compliance obligation for stablecoin issuers. The **CLARITY Act** passed the House (July 2025) and awaits Senate action for broader market structure rules. The foundational FinCEN/BSA framework applies to all crypto businesses today, regardless of new legislation. A stablecoin startup must simultaneously navigate: federal licensing (GENIUS Act), FinCEN MSB registration, state money transmitter licenses, and evolving SEC/CFTC jurisdiction.

---

## GENIUS Act — The Current Law for Stablecoins

**Citation:** S. 1582, 119th Congress; signed July 18, 2025
**Effective Date:** Earlier of 18 months after enactment (January 2027) or 120 days after implementing regulations are finalized

### Who Must Comply

Unlawful to issue a "payment stablecoin" in the US unless you are a **"permitted payment stablecoin issuer" (PPSI)**.

**Payment Stablecoin Definition:** A digital asset designed to maintain a stable value relative to a fixed monetary value; used as payment or settlement; redeemable on demand.

### Permitted Payment Stablecoin Issuer Categories

| Issuer Type | Regulator | Threshold |
|-------------|-----------|-----------|
| Federally chartered bank | OCC | Any size |
| State-licensed non-bank | State regulator (if "substantially similar" to federal) | ≤ $10 billion outstanding |
| Federal non-bank license | OCC | Any size (election available) |
| State-licensed insured depository | FDIC/State | Any size |
| Federal credit union | NCUA | Any size |

**$10 Billion Threshold:** Issuers with >$10B outstanding face **mandatory** primary federal supervision. Below $10B, state licensing path is available.

### Reserve Requirements (1:1 Mandatory)

Reserves must equal **at least 100%** of outstanding payment stablecoins. Permitted reserve assets:
1. US coins and currency (physical cash)
2. Demand deposits or insured shares at FDIC/NCUA-insured institutions
3. Treasury bills with maturity ≤ 90 days
4. Repurchase agreements with maturity ≤ 7 days backed by T-bills
5. Government money market funds (Treasury-only)
6. Central bank reserves
7. Other government-issued assets approved by regulators

**Prohibited:** Rehypothecation of reserve assets; commingling with operational funds; all reserves must be segregated.

### Disclosure and Reporting

| Requirement | Frequency |
|-------------|-----------|
| Reserve composition report | Monthly, public website |
| Accounting firm examination of reserves | Monthly |
| Executive certification to regulator | Monthly |
| Audited annual financial statements | Annual (>$50B outstanding) |
| Redemption policy disclosure | At issuance and on update |

### AML/BSA Compliance

Stablecoin issuers are treated as **financial institutions** under the Bank Secrecy Act (31 U.S.C. § 5312):
- Full AML/CFT program (written, risk-based)
- Sanctions compliance program (OFAC screening)
- FinCEN must issue tailored AML rules for stablecoin issuers

### Technical Compliance Requirements

Must possess technical capability to:
- **Seize** payment stablecoins on lawful order
- **Freeze** payment stablecoins on lawful order
- **Burn** (destroy) payment stablecoins on lawful order

**Critical infrastructure:** Smart contract architecture must include admin controls for freeze/seize/burn.

### Prohibited Activities

| Prohibition | Details |
|-------------|---------|
| Yield/interest | Cannot pay interest or yield solely for holding or using the stablecoin |
| Government backing claims | Cannot claim stablecoins are backed by US government, federally insured, or legal tender |
| Tying arrangements | Cannot condition access on purchasing unrelated products or agreements to not use competitors |

### GENIUS Act Compliance Timeline

1. **Now:** Determine if your token meets "payment stablecoin" definition
2. **Now:** Begin state licensing process or OCC non-bank charter application
3. **Before effective date:** Establish 1:1 reserve structure with compliant assets
4. **Before effective date:** Monthly reporting and accounting firm engagement
5. **Before effective date:** AML/sanctions program meeting BSA standards
6. **Before effective date:** Freeze/seize/burn smart contract controls
7. **Before effective date:** Redemption policy drafted and disclosed

---

## Market Structure Legislation

### CLARITY Act (FIT21 Successor) — Not Yet Law

**Citation:** H.R. 3633, 119th Congress
**Status:** Passed House July 17, 2025; pending Senate as of March 2026

**CFTC/SEC Jurisdiction Framework:**

| Asset Category | Regulator | Trigger |
|----------------|-----------|---------|
| Digital Commodity | CFTC (exclusive spot jurisdiction) | Blockchain is "functional" AND "sufficiently decentralized" |
| Restricted Digital Asset | SEC | Not yet functional OR not sufficiently decentralized |
| Permitted Payment Stablecoin | Separate framework (GENIUS Act) | |

**"Sufficiently Decentralized":** No single person/affiliated group controls ≥20% of digital asset or voting power.

**DeFi safe harbor:** Decentralized protocols expressly exempt from exchange registration requirements where no single party has unilateral control.

**If enacted:** All token issuers and platforms must determine asset classification and register with the appropriate regulator.

### FIT21 (Historical — Shaped Current Framework)

Passed House May 22, 2024; did not become law. Superseded by CLARITY Act. Its jurisdictional framework (CFTC for commodities, SEC for securities, decentralization test) directly shaped GENIUS Act and CLARITY Act.

### Lummis-Gillibrand (Historical — Template Reference)

Never passed. Its classification taxonomy (digital commodity vs. digital security vs. ancillary asset) is widely used by practitioners and referenced in agency guidance.

---

## Bank Secrecy Act and FinCEN Registration

**Citation:** 31 U.S.C. §§ 5311-5336; 31 C.F.R. Chapter X

### When Crypto Businesses Are Money Services Businesses

**FinCEN FIN-2019-G001** (authoritative guidance): Three categories of CVC market participants:

| Category | MSB Status | Description |
|----------|-----------|-------------|
| **User** | NOT an MSB | Obtains and uses CVC solely for own purposes |
| **Exchanger** | MSB (money transmitter) | Accepts and transmits CVC, or buys/sells CVC for any reason |
| **Administrator** | MSB (money transmitter) | Issues and redeems CVC; has authority to redeem/withdraw from circulation |

**Stablecoin issuer that issues AND redeems = Administrator = MSB (money transmitter)**

### FinCEN Registration (Required Within 180 Days of Commencing Operations)

- **Form 107** (Registration of Money Services Business), filed electronically at BSA E-Filing System
- **Free** (no filing fee); renewal every 2 years
- Update within 180 days of any change (new locations, new services, ownership changes)
- FinCEN registration does NOT replace state money transmitter licenses — both required

### Mandatory AML Program Requirements (31 C.F.R. § 1022.210)

Every MSB must maintain a written AML program with at minimum:
1. **Policies, procedures, and internal controls** — reasonably designed to prevent money laundering and terrorist financing
2. **Compliance officer** — designated, responsible for day-to-day AML compliance
3. **Ongoing employee training** — periodic, relevant to roles
4. **Independent review** — testing to monitor and maintain AML program adequacy

### Reporting Requirements

| Report | Trigger | Deadline |
|--------|---------|---------|
| CTR (Currency Transaction Report) | Cash transactions > $10,000 | 15 calendar days |
| SAR (Suspicious Activity Report) | Suspected illicit activity ≥ $2,000 | 30 days (60 if no suspect identified) |

### Recordkeeping

**Funds Transfer Rule (31 C.F.R. § 1010.410):** For transfers of **$3,000 or more**, collect and retain:
- Originator: full legal name, address, account number, amount
- Beneficiary: full legal name, account number
- Retain for **5 years**

### Travel Rule (31 C.F.R. § 1010.410)

**Current threshold:** $3,000 (same as traditional wire transfers)

For transfers ≥ $3,000, originating and receiving financial institution/MSB must collect and pass along originator and beneficiary information.

**VASP-to-VASP compliance solutions:** TRISA, TRP, OpenVASP, Notabene, Sygna

**Open gap:** VASP-to-unhosted wallet transfers — FinCEN's 2020 proposed rule (never finalized) would require verification of unhosted wallet owners. Future rulemaking expected.

---

## Other Key Business Model Determinations (FIN-2019-G001)

| Business | MSB Status |
|----------|-----------|
| DEX | May be exchanger/MSB depending on whether they hold or transmit funds on behalf of users |
| Multi-signature wallet provider | MSB if co-signs transactions (control over funds); NOT MSB if providing software without independent control |
| Hosted wallet provider (custodian) | MSB |
| Unhosted wallet software developer | Generally NOT MSB (no control over funds) |
| Mining/validation (own rewards) | NOT MSB when selling mined cryptocurrency |
| Mining pool (holds/transmits for miners) | May be MSB |

---

## Digital Asset Anti-Money Laundering Act (DAAMLA) — NOT Current Law

**Status:** S. 2669, 118th Congress — did not pass. Monitor for reintroduction.

**If enacted, would:**
- Extend BSA obligations (including KYC) to digital asset wallet providers, miners, and validators
- Finalize the December 2020 FinCEN proposed rule on unhosted wallets (verification and reporting requirements)
- Direct FinCEN to issue guidance and authorize Treasury to prohibit handling of digital asset mixers, privacy coins, and anonymity-enhancing technologies
- Extend OFAC sanctions obligations to all crypto transactions

**Why this matters even though it didn't pass:** The 2020 FinCEN unhosted wallet rule (basis for DAAMLA) could be finalized by executive action at any time. Build compliance infrastructure for future unhosted wallet reporting.

---

## OCC Guidance for National Banks

### OCC Interpretive Letter 1172 (October 2020) — Active

National banks **may hold deposits serving as reserves for stablecoins**:
- Applies to 1:1 fiat-backed stablecoins
- Banks must verify daily that reserve account balances ≥ outstanding stablecoins issued
- Reserves can be held as issuer deposits OR as deposits of individual stablecoin holders (with pass-through FDIC insurance if requirements met)

### OCC Interpretive Letter 1183 (March 2025) — Active (Supersedes 1179)

National banks may now engage without advance OCC approval:
- **Crypto-asset custody services** — holding crypto on behalf of customers
- **Stablecoin reserve holding** — per Letter 1172 conditions
- **Stablecoin issuance and payment activities** — participating in stablecoin payment networks
- **Node verification network participation** — operating blockchain nodes

**Practical impact:** Banks are now more accessible as banking partners for stablecoin reserve custody without special OCC approval.

---

## State Money Transmitter Licenses

**Required in addition to FinCEN registration.** 49 states + DC + territories have MTL requirements (Montana is the only exception).

| State | Key Notes |
|-------|-----------|
| New York | BitLicense required for any "Virtual Currency Business Activity" involving NY or NY residents; $5,000 application fee; most stringent |
| California | Digital Financial Assets Law (DFAL) effective July 1, 2026; DFPI licensing required |
| Wyoming | Most permissive; SPDI (Special Purpose Depository Institution) charter available |
| Texas, Florida | Generally permissive |

**GENIUS Act impact on state MTLs:** Creates federal licensing pathway but may not automatically replace state MTL requirements. Legal analysis of preemption is developing. Continue pursuing MTLs while this develops.

**Multi-state licensing strategy:**
1. File FinCEN Form 107 first (federal baseline)
2. Obtain MTL in state of incorporation
3. High-priority states: NY, CA, TX, FL
4. Use NMLS (Nationwide Multistate Licensing System) for coordinated applications
5. Budget 12-24 months and $500K-$2M+ for full 50-state build-out

---

## Compliance Checklist

### Immediate (Pre-Launch)

- [ ] Legal classification: Does your token meet "payment stablecoin" definition under GENIUS Act?
- [ ] FinCEN MSB determination: Are you administrator, exchanger, or user under FIN-2019-G001?
- [ ] File FinCEN Form 107 within 180 days of commencing operations (free, online)
- [ ] Written AML program — must exist before taking customer funds
- [ ] Designate Compliance Officer

### Short-Term (0-6 Months)

- [ ] Implement AML/KYC program with policies, procedures, Customer Identification Program (CIP)
- [ ] OFAC sanctions screening for all customers and transactions
- [ ] State MTL applications — NY BitLicense and top-5 state MTLs (12-24 month process, start immediately)
- [ ] Bank account for reserves — approach OCC-regulated national bank (Letter 1183 makes this easier)
- [ ] Reserve structure design — only GENIUS Act-compliant assets in reserve accounts
- [ ] Travel Rule compliance solution — integrate with TRISA, Notabene, or equivalent

### Before GENIUS Act Effective Date (~January 2027)

- [ ] PPSI license — obtain OCC non-bank charter or qualifying state license
- [ ] 1:1 reserve custody — segregated reserve account, no rehypothecation
- [ ] Monthly reporting system — reserve composition reports + accounting firm examination
- [ ] Executive certification process for monthly AML/sanctions program certification
- [ ] Freeze/seize/burn controls — smart contract technical capability for lawful orders
- [ ] Redemption policy — drafted, disclosed, implemented
- [ ] No yield to holders — token design does not pay yield/interest for holding

### Ongoing

- [ ] CTR filings for cash transactions > $10,000 (15-day deadline)
- [ ] SAR filings for suspicious activity ≥ $2,000 (30-day deadline)
- [ ] Travel Rule records collected and transmitted for transfers ≥ $3,000
- [ ] FinCEN Form 107 renewal every 2 years
- [ ] State MTL renewals (typically annual or biennial)
- [ ] Monitor CLARITY Act Senate action for CFTC/SEC jurisdiction changes
- [ ] Monitor DAAMLA reintroduction — unhosted wallet rules could be finalized by executive action

---

## Sources

- [GENIUS Act — S. 1582 (119th Congress)](https://www.congress.gov/bill/119th-congress/senate-bill/1582)
- [CLARITY Act — H.R. 3633 (119th Congress)](https://www.congress.gov/bill/119th-congress/house-bill/3633/text)
- [FinCEN CVC Guidance FIN-2019-G001](https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models)
- [FinCEN MSB Registration](https://www.fincen.gov/resources/money-services-business-msb-registration)
- [31 U.S.C. Chapter 53 — BSA](https://www.law.cornell.edu/uscode/text/31/subtitle-IV/chapter-53)
- [OCC Interpretive Letter 1172 (October 2020)](https://www.occ.gov/topics/charters-and-licensing/interpretations-and-actions/2020/int1172.pdf)
- [OCC Interpretive Letter 1183 (March 2025)](https://www.occ.gov/topics/charters-and-licensing/interpretations-and-actions/2025/int1183.pdf)
- [NYDFS BitLicense](https://www.dfs.ny.gov/virtual_currency_businesses)
- [White House GENIUS Act Fact Sheet](https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-president-donald-j-trump-signs-genius-act-into-law/)
- [Latham & Watkins GENIUS Act Analysis](https://www.lw.com/en/insights/the-genius-act-of-2025-stablecoin-legislation-adopted-in-the-us)
