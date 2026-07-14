# Stablecoins, AML, and Payment Rails

US stablecoin law and AML/sanctions overlay for startup operations.

**Last verified:** July 14, 2026
**Scope:** federal stablecoin law, FinCEN/BSA, OFAC, IRS reporting overlap, and selected operational issues
**Not legal advice**

## Governing Authority

- GENIUS Act:
  - S.1582, 119th Congress
  - Became **Public Law No. 119-27** on **July 18, 2025**
  - Statute PDF: https://www.congress.gov/119/plaws/publ27/PLAW-119publ27.pdf
  - Bill page: https://www.congress.gov/bill/119th-congress/senate-bill/1582
- White House fact sheet on enactment:
  - https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-president-donald-j-trump-signs-genius-act-into-law/
- Executive Order 14178:
  - https://www.whitehouse.gov/presidential-actions/2025/01/strengthening-american-leadership-in-digital-financial-technology/
- White House digital-assets report:
  - https://www.whitehouse.gov/wp-content/uploads/2025/07/Digital-Assets-Report-EO14178.pdf
- FinCEN FIN-2019-G001:
  - https://www.fincen.gov/index.php/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models
- FinCEN MSB registration resources:
  - https://www.fincen.gov/resources/money-services-business-msb-registration
- Bank Secrecy Act:
  - https://www.law.cornell.edu/uscode/text/31/subtitle-IV/chapter-53
- SEC staff statement on covered stablecoins:
  - https://www.sec.gov/newsroom/speeches-statements/statement-stablecoins-040425
- IRS digital-asset broker reporting page:
  - https://www.irs.gov/newsroom/final-regulations-and-related-irs-guidance-for-reporting-by-brokers-on-sales-and-exchanges-of-digital-assets

## Current Status as of July 14, 2026

### GENIUS Is Enacted Federal Law — Not Fully Operative Yet

- Congress.gov states that **S.1582** became **Public Law No. 119-27** on **July 18, 2025**.
- **Enacted ≠ fully effective.** § 20 provides that the Act **and the amendments made by the Act** take effect on the **earlier of**:
  1. **18 months after enactment** (i.e., **January 18, 2027**); or
  2. **120 days after** the primary Federal payment stablecoin regulators issue **any final regulations** implementing the Act.
- As of July 14, 2026, implementation remains in rulemaking (proposals and ANPRMs). Do **not** treat the full GENIUS supervisory/issuance regime, or the § 17 definitional amendments, as automatically live without checking whether the § 20 trigger has been met.
- Separate transitional rule: § 3(b) makes it unlawful for a digital asset service provider to offer or sell a payment stablecoin in the United States unless issued by a permitted payment stablecoin issuer, beginning **3 years after enactment** (i.e., **July 18, 2028**), subject to foreign-issuer and safe-harbor provisions.
- This is the canonical citation for current federal **stablecoin statute text**. Earlier legislative vehicles, including `S.394`, should be treated as history or predecessor context only.

### § 17 Securities / Commodities Carve-Out (Payment Stablecoins of Permitted Issuers)

- GENIUS **§ 17** amends the definitions of “security” and “commodity” so that a **payment stablecoin issued by a permitted payment stablecoin issuer** (as defined in GENIUS § 2) is **not** a “security” under:
  - Securities Act of 1933 § 2(a)(1)
  - Securities Exchange Act of 1934 § 3(a)(10)
  - Investment Advisers Act of 1940 § 202(a)(18)
  - Investment Company Act of 1940 § 2(a)(36) (and related ICA treatment for permitted issuers)
  - Securities Investor Protection Act of 1970 § 16(14)
- § 17(f) likewise provides that the CEA definition of “commodity” **does not include** a payment stablecoin issued by a permitted payment stablecoin issuer.
- **Limits (do not overread):**
  - The carve-out is **tied to permitted-issuer status** and the statute’s payment-stablecoin definitions — not every product labeled “stablecoin.”
  - § 17’s definitional amendments are part of “the amendments made by this Act” and therefore track the **§ 20 effective-date** schedule.
  - Until effective, securities/commodities analysis for stablecoins continues under pre-GENIUS authorities, staff statements, and fact-specific classification work.
  - BSA/AML, OFAC, state money-transmission, and tax/reporting overlays remain independent of § 17.

### CLARITY Is Not Law

- The **Digital Asset Market Clarity Act (H.R. 3633)** passed the House on **July 17, 2025**, was received in the Senate on **September 18, 2025**, and as of **June 1, 2026** was reported out of Senate Banking and **placed on the Senate Legislative Calendar** (Calendar No. 423).
- As of July 14, 2026, it remains **pending legislation — not enacted**. Do not cite CLARITY as current law.

### SEC Staff View on Certain USD Stablecoins

- On **April 4, 2025**, the SEC Division of Corporation Finance issued a staff statement addressing certain fully backed, one-for-one, redeemable USD stablecoins.
- The statement says that, under the described facts and circumstances, the offer and sale of those “Covered Stablecoins” do not involve the offer and sale of securities.
- The statement is expressly limited:
  - it is staff guidance
  - it has no independent force of law
  - it does not cover all stablecoins
  - it excludes yield-bearing and many non-USD or non-reserve-backed models
- Once GENIUS § 17 is effective for a **permitted** payment stablecoin issuer, the statutory carve-out becomes the higher-authority securities/commodities reference for that product class; staff statements remain useful only as secondary interpretive material.

### FinCEN Rules Still Run in Parallel

- Regardless of GENIUS enactment or effective-date status, the FinCEN / BSA framework remains live today.
- Stablecoin-adjacent businesses can still trigger MSB analysis where they administer, exchange, or transmit value.

## Operational Implication for Startups

### 1. Stablecoin Analysis Is Multi-Layered

Do not reduce the question to “security or not.” A startup working around a payment stablecoin should analyze:

1. GENIUS issuer / supervisory pathway **and** whether § 20 has made the operative regime effective
2. reserve design and redemption mechanics
3. FinCEN/MSB exposure
4. sanctions screening and blocking capability
5. custody and hosted-wallet exposure
6. broker-reporting implications where the business is custodial or transaction-effecting
7. state money-transmission overlay

### 2. Marketing Discipline Matters

The strongest non-security posture for a payment stablecoin comes from keeping it framed as:

- payment or settlement infrastructure
- a stable store-of-value instrument
- not an investment
- not a yield product
- not a governance or profit-sharing instrument

### 3. Hosted Intermediation Is Higher-Risk Than Pure Protocol Work

The more the startup does any of the following, the more serious the AML/licensing analysis becomes:

- accepts funds or stablecoins from one person and transmits them to another
- holds customer assets
- runs hosted wallets
- redeems or administers tokens
- interfaces directly with fiat rails
- operates customer-facing exchange or brokerage flows

### 4. Stablecoin Protocols and Service Providers Are Not Automatically Issuers

Protocol authors, software vendors, API providers, and infrastructure contractors should be analyzed separately from the legal issuer.
But if they move into administration, custody, redemption, hosted-wallet control, or transaction intermediation, the risk profile changes quickly.

## GENIUS Act Checklist

Use this as a triage list, not a full statutory summary.

- Confirm **enactment** (Pub. L. 119-27, July 18, 2025) versus **effective date** under § 20
- Determine whether the asset is best analyzed as a **payment stablecoin** under the statute’s definitions
- Identify the actual issuer and any affiliates performing issuance, redemption, reserve, custody, or compliance functions
- Map the contemplated regulatory lane:
  - insured depository institution path
  - federal nonbank path
  - state-qualified path where available
- Assess whether the issuer would be a **permitted payment stablecoin issuer** (relevant to § 17 carve-out once effective)
- Confirm reserve design, liquidity, segregation, and public disclosure assumptions
- Confirm redemption-at-par assumptions and who can redeem
- Check whether product design introduces yield, profit participation, or other features that weaken payment-instrument treatment
- Confirm lawful-order / compliance-control implications in the technical design
- Track the § 3(b) three-year digital-asset-service-provider offer/sale transition

## FinCEN and BSA Overlay

### Core Classification Source

FinCEN's key live source remains **FIN-2019-G001**.

Its framework still matters:

- **user**: generally not an MSB
- **exchanger**: can be an MSB
- **administrator**: can be an MSB

For stablecoin projects, ask:

- Who issues?
- Who redeems?
- Who accepts and transmits value?
- Who controls customer assets or hosted wallets?
- Who sits in the middle of the payment flow?

### MSB Registration

- FinCEN registration is handled through Form 107 and related MSB-registration resources.
- Federal registration does not eliminate state licensing where state law also applies.

### Travel Rule / Recordkeeping

- The BSA and FinCEN rules continue to matter for larger-value transfers and for customer / counterparty information flows.
- Firms handling virtual-asset transfers through hosted or intermediary channels should document how Travel Rule and recordkeeping obligations are analyzed and operationalized.

## OFAC and Sanctions Overlay

Sanctions compliance is not optional just because activity is on-chain.

High-signal enforcement and sanctions references:

- Bittrex civil penalty (sanctions compliance failures):
  - https://home.treasury.gov/news/press-releases/jy1006
- Binance:
  - https://home.treasury.gov/news/press-releases/jy1925
- **Tornado Cash — status as of July 14, 2026 (do not treat as currently designated):**
  - OFAC originally designated Tornado Cash-related addresses in 2022 (historical action: https://home.treasury.gov/news/press-releases/jy0916).
  - On **March 21, 2025**, Treasury **removed the economic sanctions** against Tornado Cash (delisting): https://home.treasury.gov/news/press-releases/sb0057 and OFAC recent-actions: https://ofac.treasury.gov/recent-actions/20250321.
  - Use Tornado Cash as a **historical** sanctions / mixer-control case study and as a reminder that designations can be challenged, modified, or delisted — **not** as a live SDN designation of the protocol addresses.
  - Related criminal prosecutions of individuals and residual SDN issues for named persons can still matter; check current SDN status before stating that any person or address is blocked.

Operational takeaway:

- hosted or custodial businesses need sanctions controls
- firms should know who and where their customers are
- geofencing alone is not a full sanctions program
- mixers, sanctioned jurisdictions, blocked persons, and high-risk counterparties require documented controls
- always verify current SDN / OFAC list status rather than relying on older designation headlines

## IRS Reporting Overlap

For custodial or hosted-wallet stablecoin businesses, check whether the model begins to resemble a reporting broker.

IRS states:

- brokers must report **gross proceeds** for transactions effected on or after **January 1, 2025**
- brokers must report **basis** on certain transactions effected on or after **January 1, 2026**

Source:

- https://www.irs.gov/newsroom/final-regulations-and-related-irs-guidance-for-reporting-by-brokers-on-sales-and-exchanges-of-digital-assets

## Unresolved or Contested Points

- GENIUS implementation details will continue to develop through rules and supervision; the § 20 effective date may land earlier than January 18, 2027 if final implementing regulations issue.
- State-law preemption or displacement questions should not be overstated while the statute is still in the transitional / rulemaking window.
- The boundary between protocol authorship and regulated intermediation remains highly fact-dependent.
- SEC's April 2025 stablecoin statement is helpful, but not a general safe harbor for all stablecoin designs, and it is subordinate to statute once GENIUS § 17 is effective for a covered permitted issuer product.
- Yield-bearing or hybrid “stablecoin” products remain significantly riskier than plain payment-stablecoin models.

## Primary Sources

- S.1582 / Pub. L. 119-27 (enactment page):
  - https://www.congress.gov/bill/119th-congress/senate-bill/1582
- Pub. L. 119-27 statute PDF (§§ 3, 17, 20):
  - https://www.congress.gov/119/plaws/publ27/PLAW-119publ27.pdf
- White House GENIUS fact sheet:
  - https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-president-donald-j-trump-signs-genius-act-into-law/
- EO 14178:
  - https://www.whitehouse.gov/presidential-actions/2025/01/strengthening-american-leadership-in-digital-financial-technology/
- Digital Assets Report:
  - https://www.whitehouse.gov/wp-content/uploads/2025/07/Digital-Assets-Report-EO14178.pdf
- H.R. 3633 (CLARITY) status:
  - https://www.congress.gov/bill/119th-congress/house-bill/3633
- FinCEN FIN-2019-G001:
  - https://www.fincen.gov/index.php/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models
- FinCEN MSB registration:
  - https://www.fincen.gov/resources/money-services-business-msb-registration
- BSA:
  - https://www.law.cornell.edu/uscode/text/31/subtitle-IV/chapter-53
- SEC stablecoin statement:
  - https://www.sec.gov/newsroom/speeches-statements/statement-stablecoins-040425
- IRS broker-reporting page:
  - https://www.irs.gov/newsroom/final-regulations-and-related-irs-guidance-for-reporting-by-brokers-on-sales-and-exchanges-of-digital-assets
- Tornado Cash delisting (Treasury, Mar. 21, 2025):
  - https://home.treasury.gov/news/press-releases/sb0057
  - https://ofac.treasury.gov/recent-actions/20250321

## Secondary Commentary

- Latham & Watkins crypto tracker:
  - https://www.lw.com/en/us-crypto-policy-tracker
- Cleary Gottlieb 2026 digital-assets update:
  - https://www.clearygottlieb.com/news-and-insights/publication-listing/2026-digital-assets-regulatory-update-a-landmark-2025-but-more-developments-on-the-horizon
- TRM policy review:
  - https://www.trmlabs.com/reports-and-whitepapers/global-crypto-policy-review-outlook-2025-26
