---
source: b-open-io/product-skills
derived_from: "General-Legal/legal-templates templates/master-services-agreement/template.md @ c7c947f5d65716f1395d58ef7fda6eb2847a29b0 (donor material — deliberately not vendored in Phase 1)"
license: CC0-1.0
created: 2026-08-20
status: b-open derivative — Phase 2(3) of the legal-templates vendoring (issue #2)
modifications: "rebuilt from the donor MSA's good bones (mutual 12-month-fees liability cap with confidentiality/IP/gross-negligence/indemnity carve-outs, IP indemnity with the standard (i)-(iii) exclusions, AAA expedited arbitration, DPA-trigger clause, Outputs disclaimer) for a hosted API / SaaS deployment: on-prem license, source-code delivery, Customer Environment, System Requirements, Generic Judges/Platform AI-eval deal residue, Integration Tools, and Connected Accounts machinery removed; hosted access grant, API keys, and new API Use and Fair Use section added; new SLA + service-credits exhibit added (sole-remedy framing, standard exclusions); fixed the donor's No Assignment asymmetry (consent now required from the other party, not just Company); removed the post-termination fee-acceleration clause and net-60 default (net 30 with mark); confidentiality marking trap removed (protection now covers information reasonably understood to be confidential; no 30-day oral-disclosure summaries); Feedback assignment narrowed to a license; donor typos fixed (herby, Company', stray Client); every generated draft remains first-draft-for-counsel"
---

> **Not legal advice.** This template is a starting draft. Have licensed counsel in the relevant jurisdiction review any adapted document before use.

**MASTER SERVICES AGREEMENT (HOSTED SERVICES / API)**

This Master Services Agreement is made and entered into on [<mark>__________</mark>] (the "**Effective Date**") by and between <mark>[Company]</mark> ("**Company**") and <mark>[Customer]</mark> ("**Customer**"). In consideration of the mutual promises contained herein, the parties hereby agree to the following:

**1. DEFINITIONS.** Capitalized terms shall have the meanings set forth in this section, or in the section where they are first used.

"**Aggregated Data**" means data and information related to Customer Data and/or Customer's use of the Services that is used by Company in an aggregate and de-identified manner, including to compile statistical and performance information related to the provision and operation of the Services.

"**Agreement**" means this Master Services Agreement (and Exhibits), together with all Order Forms.

"**API**" means the application programming interfaces, endpoints, developer tools, and associated software made available by Company as part of the Services.

"**API Keys**" means the keys, tokens, credentials, and other access protocols issued by Company to Customer for authentication to and use of the Services.

"**Applicable Data Protection Laws**" means any applicable Laws, regulations, orders, or judgments issued by a governmental authority that govern the privacy, security, confidentiality, protection, processing or transfer of Personal Data or that govern the rights of Authorized Users or other data subjects with regard to that Personal Data.

"**Authorized User**" means any individual who is an employee or independent contractor of Customer, or such other individual as may be authorized by Customer to access the Services pursuant to Customer's rights under this Agreement.

"**Customer Data**" means, other than Aggregated Data, (a) Inputs; and (b) information, data, and other content, in any form or medium, that is submitted, posted, or otherwise transmitted by or on behalf of Customer or an Authorized User through the use of the Services, including via user interface or API.

"**Documentation**" means Company-provided user documentation, in all forms, relating to the Services (e.g., user manuals, API references, and online help files).

"**Input**" means information, data, materials, text, or other content (including any snippets of code that may be provided by Customer) that is (i) input, entered, posted, uploaded, submitted, transferred, transmitted, or otherwise provided or made available for processing by or through the Services, or (ii) collected, downloaded, or otherwise received by the Services on Customer's behalf.

"**Intellectual Property Rights**" means any and all now known or hereafter existing intellectual property rights, including (a) rights associated with works of authorship, including copyrights, mask work rights, and moral rights; (b) trademark or service mark rights; (c) trade secret rights; (d) patents, patent rights, and industrial property rights; (e) layout design rights, design rights, and other proprietary rights of every kind and nature other than trademarks, service marks, trade dress, and similar rights; and (f) all registrations, applications, renewals, extensions, or reissues of the foregoing, in each case in any jurisdiction throughout the world.

"**Law(s)**" means, with respect to any party, in each case to the extent applicable to such party, its property, the Services or in connection with this Agreement, any federal, national, provincial, state, county, municipal or local law, ordinance, statute, rule, regulation, code, policy, notice, treaty, judgment, executive order, decree, injunction, permit, issuance or other determination or finding of any governmental authority which is legally enforceable by a governmental entity.

"**Order**" or "**Order Form**" means an ordering document that is signed by both parties (or an online ordering flow accepted by Customer) identifying the Services purchased pursuant to this Agreement. The initial Order is set forth on **Exhibit A**.

"**Order Term**" means the term length specified in the applicable Order Form.

"**Output**" means the content, data, information, recommendations, and other materials that are generated through the Services by or for Customer through the processing (including by application of analytics, data enrichment, data discovery, artificial intelligence or machine learning) of Customer Data and/or Inputs.

"**Personal Data**" means any information relating to an identified or identifiable natural person, and all information that is "personal data," "personal information," or "personally identifiable information" under Applicable Data Protection Laws.

"**Platform**" means Company's hosted software platform and infrastructure through which the Services are delivered, including the API.

"**Services**" means Company's: (1) provision of remote access to the features and functionality of the Platform as a hosted service, including via the API; and (2) any professional or other services set forth in the applicable Order Form.

"**SLA**" means the service level agreement set forth on **Exhibit B**.

**2. PROVISION OF SERVICES.**

2.1 **Order Forms.** Each Order Form is governed by, and hereby incorporated into, this Agreement. If there is a conflict between this Agreement and an Order Form, this Agreement will control unless the Order Form expressly states that a specific provision of this Agreement will be superseded by a specific provision of the Order Form.

2.2 **Access to Services.** Subject to and conditioned on Customer's payment of Fees and compliance with all the terms and conditions of this Agreement, Company grants to Customer a non-exclusive, non-transferable right during each Order Term to access and use the Services, solely by Authorized Users, for Customer's internal business purposes and in accordance with the Documentation. The Services are provided on a hosted basis only: no software is delivered to Customer, no license to source code is granted, and nothing in this Agreement grants Customer any right to possess or host the Platform.

2.3 **API Keys.** Company will issue Customer API Keys for access to the Services. Customer will keep API Keys confidential, will use them only as documented, and will be responsible for all activity occurring under its API Keys. Customer will notify Company promptly upon becoming aware of any compromise of an API Key, and Company may rotate, suspend, or revoke API Keys that it reasonably believes are compromised or being misused.

2.4 **Availability; Support; Changes.** Company will make the Services available in accordance with the SLA, which states Customer's sole and exclusive remedies for unavailability of the Services. Company will provide support for the Services in accordance with its then-current support terms, as may be described in the applicable Order Form. Company manages, hosts, maintains, and updates the Platform, and may modify the Services from time to time, provided that Company will not materially degrade the core functionality of the Services purchased under an active Order during its Order Term. Company will provide reasonable advance notice of deprecation of any generally available API on which Customer's usage depends, of at least <mark>[90]</mark> days where practicable.

2.5 **Personal Data.** Before providing to Company or enabling Company to process any Personal Data, Customer will enter into a Data Processing Addendum ("**DPA**") with Company. If Customer has not entered into a DPA, Customer represents, warrants and covenants that no Personal Data processed by Company under this Agreement is subject to Applicable Data Protection Laws. Any Personal Data that is subject to Applicable Data Protection Laws shall be governed by the DPA and shall not be Confidential Information (as defined herein). In the event of a conflict between any provision of the DPA and this Agreement, the provision providing the higher level of privacy or data protection shall govern.

2.6 **Third-Party Services.** The Services may include, or be dependent on, certain third-party data, software components, application programming interfaces, and other products and services (the "**Third-Party Services**"). Where Customer elects to use a Third-Party Service in connection with the Services, Customer is solely responsible for procuring and maintaining, at its own expense, all rights, licenses, and accounts necessary for that use. COMPANY, NOT BEING THE OWNER, OPERATOR, SUPPLIER, OR PRODUCER OF THE THIRD-PARTY SERVICES NOR THEIR AGENT, DOES NOT ENDORSE ANY THIRD-PARTY SERVICES, AND MAKES NO EXPRESS OR IMPLIED WARRANTY OF ANY KIND WHATSOEVER WITH RESPECT TO THE THIRD-PARTY SERVICES AND DISCLAIMS ANY SUCH WARRANTIES THAT MIGHT OTHERWISE EXIST.

**3. API USE AND FAIR USE.**

3.1 **Usage Limits.** Customer's use of the Services is subject to the rate limits, quota, throughput, and other usage parameters specified in the applicable Order Form or Documentation ("**Usage Limits**"). Company may enforce Usage Limits technically (including by throttling or rejecting requests over limit). If Customer's usage repeatedly and materially exceeds its Usage Limits, Company may require Customer to upgrade to an appropriate tier, effective on notice, for usage going forward.

3.2 **API Restrictions.** Except as expressly permitted by applicable Laws or this Agreement, Customer will not, and will not permit any Authorized User or other party to: (a) use the API in a manner that circumvents Usage Limits, authentication, or other access controls, including by creating multiple accounts or rotating credentials to evade limits; (b) resell, sublicense, or provide access to the Services to third parties as a standalone offering, except as expressly permitted in an Order Form; (c) use the Services to build or train a product or service that competes with the Services, or scrape or bulk-extract data from the Services for that purpose; (d) interfere with or disrupt the integrity, security, or performance of the Platform, including by transmitting malware or conducting load or penetration testing without Company's prior written consent; or (e) use the Services in violation of applicable Laws or the rights of any third party.

3.3 **Suspension for Abuse or Risk.** Company may suspend or restrict access to the Services (in whole or in part, including by revoking API Keys) with notice where practicable, if Company reasonably determines that (a) Customer's use violates Section 3.2 or otherwise threatens the security, integrity, or availability of the Platform or other customers' use of the Services; (b) suspension is required by Law; or (c) Customer's account is subject to Section 5.4 (payment suspension). Company will limit any suspension in scope and duration to what is reasonably necessary and will restore access promptly once the grounds for suspension are cured.

**4. CUSTOMER RESTRICTIONS AND RESPONSIBILITIES.**

4.1 **Restrictions.** Except as may be expressly permitted by applicable Laws or this Agreement, Customer agrees that it will not, and will not permit any Authorized User or other party to: (a) permit any party other than Authorized Users to access or use the Services or Documentation; (b) modify, adapt, alter or translate the Platform or Documentation; (c) sublicense, lease, rent, loan, distribute, or otherwise transfer any right in the Services or Documentation to any third party except as expressly permitted herein; (d) reverse engineer, decompile, disassemble, or otherwise derive or determine or attempt to derive or determine the source code (or the underlying ideas, algorithms, structure or organization) of the Platform; (e) circumvent, remove, alter, deactivate, degrade or thwart any technological measure or content protections of the Services; or (f) use or copy the Platform or Documentation except as expressly allowed hereunder. Except as expressly set forth herein, no express or implied license or right of any kind is granted to Customer regarding the Services, Platform, or Documentation, or any part thereof.

4.2 **Authorized Users; Account Security.** Customer may permit Authorized Users to access and use the features and functions of the Services as contemplated by this Agreement. Credentials and API Keys cannot be shared except as the Documentation expressly permits. Customer shall use commercially reasonable efforts to prevent unauthorized access to, or use of, the Services, and shall notify Company promptly of any such unauthorized use known to Customer. Customer will be responsible for the acts or omissions of any Authorized Users in their access to and use of the Services, and any breach by an Authorized User of the terms of this Agreement will constitute a breach by Customer of this Agreement.

4.3 **Customer Data Responsibility.** Customer is solely responsible for the accuracy, quality and legality of Customer Data, for all changes to and/or deletions of Customer Data made through its account, and for maintaining the security of its own systems, devices, and networks used to access the Services. Customer shall promptly inform Company of any actual or suspected security incident involving the Services of which it becomes aware.

4.4 **Compliance.** Customer shall at all times comply with all international and domestic Laws applicable to its access to and use of the Services and Documentation. Customer represents and warrants that it has provided all notices and obtained all consents necessary to submit the Customer Data for processing by Company and the Services as contemplated herein.

**5. FEES AND EXPENSES; PAYMENTS.**

5.1 **Fees.** Customer shall pay to Company, without offset or deduction, the fees and expenses as determined under any Orders and this Agreement ("**Fees**"). Usage-based Fees, if any, will be calculated from Company's measurements of Customer's usage of the Services, which shall be authoritative absent manifest error. Company reserves the right to increase the Fees under each Order following the Initial Order Term, and each Renewal Order Term thereafter, but must provide notification of such increases at least thirty (30) days prior to the end of the Initial Order Term or then-current Renewal Order Term. Except as otherwise set forth on an Order Form, all Fees shall be due and payable within <mark>[thirty (30)]</mark> days after Customer's receipt of an invoice from Company.

5.2 **Taxes.** The Fees and other amounts payable by Customer to Company do not include any taxes of any jurisdiction that may be assessed or imposed upon the Services or otherwise, including sales, use, excise, value added, personal property, export, import and withholding taxes, excluding only taxes based upon Company's net income. Customer shall directly pay any such taxes assessed, and shall promptly reimburse Company for any taxes payable or collectable by Company (other than taxes based upon Company's net income).

5.3 **Late Payment.** If any Customer payment is more than thirty (30) days past due, interest at the rate of <mark>[twelve percent (12%) per annum]</mark> (or, if lower, the maximum rate permitted by applicable Laws) shall accrue. Unless otherwise specified in this Agreement, all Fees and other amounts paid by Customer under this Agreement are non-refundable, except as expressly provided in Section 10.4 and the SLA. All dollar amounts referred to in this Agreement are in United States Dollars.

5.4 **Suspension for Non-Payment.** In the event that Customer's account is more than thirty (30) days overdue on any undisputed payment, Company shall have the right, in addition to its remedies under this Agreement or pursuant to applicable Laws, to suspend Customer's access to or use of the Services, upon at least ten (10) days' written notice, until Customer has paid the full undisputed balance owed, plus any interest due.

**6. OWNERSHIP AND DATA RIGHTS.**

6.1 **Company Intellectual Property.** The Services, Platform and underlying source code, and Documentation, and all worldwide Intellectual Property Rights in each of the foregoing, are the exclusive property of Company and its suppliers. All rights not expressly granted to Customer in this Agreement are reserved by Company and its suppliers.

6.2 **Customer Data and Outputs.** Customer grants Company a non-exclusive, worldwide, royalty-free and fully paid license during the Order Term to use the Customer Data as necessary for purposes of providing the Services, and to de-identify and aggregate such Customer Data to create Aggregated Data. As between the parties, Customer Data and Outputs, and all worldwide Intellectual Property Rights therein, are the exclusive property of Customer. All rights in and to the Customer Data and/or Outputs not expressly granted to Company in this Agreement are reserved by Customer. Company will not use Customer Data or Outputs to train, fine-tune, develop, or improve any artificial intelligence or machine learning model except as expressly authorized by Customer in writing or as reasonably necessary to provide the Services in accordance with Customer's documented instructions.

6.3 **Aggregated Data.** Notwithstanding anything to the contrary in this Agreement, Company may monitor Customer's use of the Services and collect and compile Aggregated Data. As between Company and Customer, all right, title, and interest in Aggregated Data, and all Intellectual Property Rights therein, belong to and are retained solely by Company, provided that Aggregated Data does not identify Customer, any Authorized User or data subject, or Customer's Confidential Information. Company may use Aggregated Data to operate, analyze, and improve the Platform and Services and Company's other products and services, and may make Aggregated Data publicly available, in each case in compliance with applicable Laws.

6.4 **Feedback.** If Customer or any of its employees or contractors sends or transmits any communications or materials to Company suggesting or recommending changes to the Services or Documentation, including new features or functionality, or any comments, questions, suggestions, or the like ("**Feedback**"), Customer grants Company a perpetual, irrevocable, worldwide, non-exclusive, fully-paid, royalty-free license to use and exploit such Feedback for any purpose, without attribution or compensation, although Company is not required to use any Feedback.

**7. WARRANTIES AND DISCLAIMERS.**

7.1 **Mutual Warranties.** Each party represents and warrants to the other that: (1) this Agreement has been duly executed and delivered and constitutes a binding agreement enforceable against the executing party in accordance with its terms; (2) no authorization or approval from any third party is required in connection with the execution, delivery, or performance of this Agreement by the executing party; and (3) the execution, delivery, and performance of this Agreement by the executing party do not violate the Laws of any jurisdiction or the terms or conditions of any other agreement to which it is a party or by which it is otherwise bound.

7.2 **Limited Service Warranty.** Company warrants that the Services, when used as authorized under this Agreement, will perform materially in accordance with the Documentation. Customer's sole and exclusive remedy, and Company's entire liability, for breach of this warranty is for Company to use commercially reasonable efforts to correct the non-conformity, and, if Company is unable to do so within thirty (30) days of written notice, Customer may terminate the affected Order and receive a pro-rata refund of prepaid Fees for the unused remainder of the Order Term.

7.3 **General Disclaimer.** EXCEPT FOR THE LIMITED WARRANTIES SET FORTH IN THIS SECTION, COMPANY MAKES NO OTHER EXPRESS OR IMPLIED WARRANTIES WITH RESPECT TO THE PLATFORM, DOCUMENTATION, AGGREGATED DATA, INPUTS, OUTPUTS, SERVICES OR OTHERWISE, AND SPECIFICALLY DISCLAIMS ALL IMPLIED AND STATUTORY WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF NON-INFRINGEMENT OF THIRD-PARTY RIGHTS, MERCHANTABILITY, SATISFACTORY QUALITY, ACCURACY, TITLE, AND FITNESS FOR A PARTICULAR PURPOSE, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING, USAGE, OR TRADE PRACTICE. EXCEPT AS SET FORTH IN THE SLA AND SECTION 7.2, THE SERVICES ARE PROVIDED "AS IS," AND COMPANY DOES NOT WARRANT THAT THE SERVICES WILL SATISFY CUSTOMER'S REQUIREMENTS, ARE WITHOUT DEFECT OR ERROR, OR THAT THE OPERATION OF THE SERVICES WILL BE UNINTERRUPTED. SOME STATES AND JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF WARRANTIES; THIS SECTION WILL APPLY TO CUSTOMER SOLELY TO THE EXTENT PERMITTED BY APPLICABLE LAWS.

7.4 **Outputs.** COMPANY MAKES NO WARRANTY OR GUARANTY THAT THE OUTPUTS WILL PROVIDE ACCURATE, TAILORED OR INFORMATIVE RESULTS OR BE FIT FOR ANY PARTICULAR PURPOSE OR USE CASE. COMPANY DOES NOT REPRESENT OR WARRANT THAT CUSTOMER IS THE LEGAL OWNER OF THE OUTPUTS, OR THAT THE INPUTS OR OUTPUTS ARE PROTECTABLE BY ANY INTELLECTUAL PROPERTY RIGHTS, OR THAT THE OUTPUTS DO NOT INCORPORATE, INFRINGE OR MISAPPROPRIATE THE INTELLECTUAL PROPERTY OR PROPRIETARY RIGHTS OF ANY THIRD PARTY. CUSTOMER SHALL BE SOLELY RESPONSIBLE FOR CUSTOMER'S USE OF THE SERVICES AND ANY OUTPUTS RESULTING THEREFROM, AND SHOULD EVALUATE THE FITNESS OF ANY OUTPUTS AS APPROPRIATE FOR CUSTOMER'S SPECIFIC USE CASE.

7.5 **Customer Warranty.** Customer represents and warrants to Company that: (1) Customer owns the Customer Data, or has the necessary licenses, rights, consents, and permissions to authorize Company to use the Customer Data in accordance with this Agreement; (2) Customer Data and the use of Customer Data as contemplated by this Agreement does not and will not: (a) infringe, violate, or misappropriate any third-party right, including any Intellectual Property Right; (b) slander, defame, libel, or invade the right of privacy, publicity, or other property rights of any other person; (c) violate, or cause Company to violate, any Law; (d) be deceptive, obscene, pornographic or unlawful; or (e) contain any viruses, worms or other malicious computer programming code intended to damage Company's systems or data; and (3) Customer will use the Services in compliance with the Documentation and applicable Laws. Company may monitor Customer's use of the Services and may suspend any use of the Services it reasonably believes violates the foregoing warranties or applicable Laws, in accordance with Section 3.3.

**8. LIMITATION OF LIABILITY.**

8.1 **Exclusion of Damages.** EXCEPT WITH RESPECT TO LIABILITY ARISING FROM BREACHES OF CONFIDENTIALITY UNDER SECTION 9, MISAPPROPRIATION BY A PARTY OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS, A PARTY'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT, OR A PARTY'S INDEMNIFICATION OBLIGATIONS UNDER SECTION 10 (COLLECTIVELY, "**EXCLUDED LIABILITY**"), NEITHER PARTY SHALL BE LIABLE TO THE OTHER PARTY FOR ANY SPECIAL, INDIRECT, EXEMPLARY, PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES OF ANY NATURE ARISING OUT OF THIS AGREEMENT, INCLUDING DAMAGES OR COSTS DUE TO LOSS OF PROFITS, BUSINESS INTERRUPTION, OR PERSONAL OR PROPERTY DAMAGE, REGARDLESS OF THE CAUSE OF ACTION OR THE THEORY OF LIABILITY, WHETHER IN TORT, CONTRACT, OR OTHERWISE, EVEN IF SUCH PARTY HAS BEEN NOTIFIED OF THE LIKELIHOOD OF SUCH DAMAGES. SOME STATES AND JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES; THIS SECTION WILL APPLY SOLELY TO THE EXTENT PERMITTED BY APPLICABLE LAWS.

8.2 **Amount of Damages.** EXCEPT WITH RESPECT TO EXCLUDED LIABILITY, THE MAXIMUM AGGREGATE LIABILITY OF EITHER PARTY ARISING OUT OF OR IN ANY WAY CONNECTED TO THIS AGREEMENT SHALL NOT EXCEED THE FEES PAID OR PAYABLE BY CUSTOMER TO COMPANY DURING THE TWELVE (12) MONTHS PRECEDING THE ACT, OMISSION OR OCCURRENCE GIVING RISE TO SUCH LIABILITY.

8.3 **Basis of the Bargain.** THE PARTIES AGREE THAT THE LIMITATIONS OF LIABILITY SET FORTH IN THIS SECTION SHALL SURVIVE AND CONTINUE IN FULL FORCE AND EFFECT DESPITE ANY FAILURE OF CONSIDERATION OR OF AN EXCLUSIVE REMEDY. THE PARTIES ACKNOWLEDGE THAT THE PRICES HAVE BEEN SET AND THE AGREEMENT ENTERED INTO IN RELIANCE UPON THESE LIMITATIONS OF LIABILITY AND THAT ALL SUCH LIMITATIONS FORM AN ESSENTIAL BASIS OF THE BARGAIN BETWEEN THE PARTIES.

**9. CONFIDENTIALITY.**

9.1 **Confidential Information.** During the term of this Agreement, each party (the "**Disclosing Party**") may provide the other party (the "**Receiving Party**") with certain information regarding the Disclosing Party's business, technology, products, or services or other confidential or proprietary information that is either identified as confidential at the time of disclosure or that a reasonable person would understand to be confidential given the nature of the information and the circumstances of disclosure (collectively, "**Confidential Information**"). The Platform, Documentation, API Keys, and all enhancements and improvements thereto will be considered Confidential Information of Company; Customer Data will be considered Confidential Information of Customer.

9.2 **Protection of Confidential Information.** The Receiving Party agrees that it will not use or disclose to any third party any Confidential Information of the Disclosing Party, except as expressly permitted under this Agreement. The Receiving Party will limit access to the Confidential Information to Authorized Users (with respect to Customer) or to employees and subcontractors who have a need to know, who have confidentiality obligations no less restrictive than those set forth herein, and who have been informed of the confidential nature of such information (with respect to Company). The Receiving Party will protect the Disclosing Party's Confidential Information from unauthorized use, access, or disclosure in the same manner that it protects its own proprietary information of a similar nature, but in no event with less than reasonable care. At the Disclosing Party's request or upon termination of this Agreement, the Receiving Party will return to the Disclosing Party or destroy (or permanently erase in the case of electronic files) all copies of the Confidential Information that the Receiving Party does not have a continuing right to use under this Agreement, and will certify such return or destruction upon request.

9.3 **Exceptions.** The confidentiality obligations set forth in this section will not apply to any information that (a) becomes generally available to the public through no fault of the Receiving Party; (b) is lawfully provided to the Receiving Party by a third party free of any confidentiality duties or obligations; (c) was already known to the Receiving Party at the time of disclosure; or (d) was independently developed by employees and contractors of the Receiving Party who had no access to the Confidential Information. In addition, the Receiving Party may disclose Confidential Information to the extent that such disclosure is necessary for the Receiving Party to enforce its rights under this Agreement or is required by law or by the order of a court or similar judicial or administrative body, provided that (where legally permitted) the Receiving Party promptly notifies the Disclosing Party in writing of such required disclosure and cooperates with the Disclosing Party if the Disclosing Party seeks an appropriate protective order.

**10. INDEMNIFICATION.**

10.1 **By Company.** Company will indemnify and hold harmless, at its own expense, Customer from and against any and all threatened third-party claims, proceedings, or suits (each, a "**Claim**"), and pay all liabilities, losses, damages, costs, and other expenses (including attorneys' and expert witnesses' costs and fees), arising out of or relating to an allegation that the Services, when used by Customer as authorized herein, infringe or misappropriate a third party's patents, copyrights or trade secret rights under applicable Laws of any jurisdiction within the United States of America. If any portion of the Services becomes, or in Company's opinion is likely to become, the subject of a claim of infringement, Company may, at Company's option: (a) procure for Customer the right to continue using the Services; (b) replace the infringing component with a non-infringing component that does not materially impair the functionality of the Services; (c) modify the Services so that they become non-infringing; or (d) terminate the affected Order and refund any unused prepaid Fees for the remainder of the Order Term then in effect, whereupon Customer will cease all use of the affected Services. Notwithstanding the foregoing, Company will have no obligation under this section or otherwise with respect to any infringement claim based upon (i) any use of the Services not in accordance with this Agreement or the Documentation; (ii) any use of the Services in combination with other products, equipment, software or data not supplied by Company, where the infringement would not have arisen but for such combination; or (iii) any modification of the Services by any person other than Company or its authorized agents. This section states the sole and exclusive remedy of Customer and the entire liability of Company, and of the officers, directors, employees, shareholders, contractors and representatives of the foregoing, for infringement claims and actions.

10.2 **By Customer.** Customer will indemnify and hold harmless, at its own expense, Company and its affiliates, employees, directors, and agents from and against any and all Claims, and pay all liabilities, losses, damages, costs and other expenses (including attorneys' and expert witnesses' costs and fees) arising out of or relating to (a) Customer's breach or alleged breach of Sections 3.2, 4.1 and/or 7.5; or (b) Customer's use of the Outputs in violation of this Agreement or applicable Laws.

10.3 **Procedure.** The indemnifying party's obligations as set forth above are expressly conditioned upon each of the foregoing: (a) the indemnified party shall promptly notify the indemnifying party in writing of any threatened or actual claim or suit (provided that failure to do so relieves the indemnifying party only to the extent it is materially prejudiced thereby); (b) the indemnifying party shall have sole control of the defense or settlement of any claim or suit, except that the indemnifying party may not settle any claim in a manner that imposes liability or admission on the indemnified party without its consent; and (c) the indemnified party shall cooperate with the indemnifying party to facilitate the settlement or defense of any claim or suit. The indemnified party may participate in the defense of the Claim at its own expense and with counsel of its own choosing.

10.4 **Refund on IP Termination.** For clarity, a refund of unused prepaid Fees under Section 10.1(d) or Section 7.2 is computed pro-rata over the remainder of the applicable Order Term.

**11. TERM AND TERMINATION.**

11.1 **Term.** The term of this Agreement will commence on the Effective Date and will continue in full force and effect, unless earlier terminated in accordance with the Agreement. Unless otherwise stated in the applicable Order Form, each Order Term will continue in full force and effect for one (1) year ("**Initial Order Term**"), unless earlier terminated in accordance with the Agreement. Thereafter, the Order Form will automatically renew for additional terms of one (1) year (each, a "**Renewal Order Term**"), unless either party gives written notice of non-renewal to the other party no later than <mark>[ninety (90)]</mark> days prior to the expiration of the then-current Initial Order Term or Renewal Order Term.

11.2 **Termination if No Outstanding Orders.** If there are no outstanding Order Forms, either party may terminate this Agreement for any reason upon thirty (30) days' prior written notice to the other. Neither party may terminate an Order once it has been executed, other than by mutual consent or termination for material breach as set forth below.

11.3 **Termination for Breach.** Either party may terminate this Agreement or any Order immediately upon notice to the other party if the other party materially breaches this Agreement or the applicable Order, and such breach remains uncured more than thirty (30) days after receipt of written notice of such breach.

11.4 **Effect of Termination.** Expiration or termination of this Agreement will automatically terminate all active Orders, but termination of a single Order will not result in termination of this Agreement or any other Orders. Upon the expiration or termination of this Agreement or an Order, all rights of access granted by Company to Customer under this Agreement or the applicable Order will terminate, and Customer will cease all use of the affected Services and destroy or return all Company Confidential Information (including API Keys). If Customer terminates for Company's material breach, Company will refund Customer any prepaid Fees for the unused remainder of the terminated Order Term(s), computed pro-rata. If Company terminates for Customer's material breach, Fees prepaid by Customer are non-refundable and Fees accrued for usage through the effective date of termination remain payable. Either party's termination of this Agreement is without prejudice to any other remedies it may have at law or in equity, and does not relieve either party of breaches occurring prior to the effective date of termination.

11.5 **Data Export.** For thirty (30) days following expiration or termination of an Order (other than termination by Company for Customer's material breach involving unlawful use), Company will, upon Customer's written request, make Customer Data available for export in a commercially reasonable format. Thereafter, Company will delete Customer Data from its systems within a commercially reasonable period, except to the extent retention is required by Law or permitted under the DPA, and subject to Company's standard backup rotation.

11.6 **Survival.** The sections titled *Definitions, Customer Restrictions and Responsibilities, Fees and Expenses; Payments (with respect to accrued amounts), Ownership and Data Rights, Warranties and Disclaimers, Limitation of Liability, Confidentiality, Indemnification, Effect of Termination, Data Export, Survival,* and *Miscellaneous* will survive expiration or termination of this Agreement for any reason.

**12. MISCELLANEOUS.**

12.1 **Governing Law.** This Agreement and any action related thereto will be governed and interpreted by and under the laws of the State of [<mark>Delaware</mark>], without giving effect to any conflicts of laws principles that require the application of the law of a different jurisdiction.

12.2 **Dispute Resolution.** For any dispute between Customer and Company, Customer agrees to first contact Company at <mark>[Company Email Address]</mark> and to attempt to resolve the claim with Company informally. In the unlikely event that the parties have not been able to resolve a claim within sixty (60) days, the parties each agree to resolve such claim exclusively through binding arbitration by the American Arbitration Association ("**AAA**") before a single arbitrator (the "**Arbitrator**"), under the Expedited Procedures then in effect for AAA (the "**Rules**"), except as otherwise provided herein, or as otherwise determined by the Arbitrator. In the event of any conflict between the Rules and this arbitration agreement, this arbitration agreement will control. AAA may be contacted at www.adr.org, where the Rules are also available. The arbitration will be conducted in [<mark>New Castle County, Delaware</mark>], unless the parties agree otherwise. Each party will be responsible for paying any AAA filing and administrative and Arbitrator fees in accordance with the Rules, and the award rendered by the Arbitrator will include costs of arbitration, reasonable attorneys' fees, and reasonable costs for expert and other witnesses. Any judgment on the award rendered by the Arbitrator may be entered in any court of competent jurisdiction. The parties agree that the Arbitrator, and not any federal, state, or local court or agency, will have exclusive authority to resolve any disputes relating to the scope, interpretation, applicability, enforceability, or formation of this arbitration agreement, including any claim that all or any part of it is void or voidable, or relating to any defense to arbitration. Notwithstanding anything to the contrary, nothing in this arbitration agreement will be construed to prevent either party from seeking injunctive or other equitable relief from the courts as necessary to prevent the actual or threatened infringement, misappropriation, or violation of its data security, Intellectual Property Rights, or other proprietary rights, or as preventing either party from asserting claims in a small claims court, provided that such claims qualify and the matter remains in such court and advances only on an individual (non-class, non-representative) basis.

12.3 **Severability.** If any provision of this Agreement or a portion of a provision is held to be invalid, illegal, or unenforceable, the rest of this Agreement will remain enforceable.

12.4 **Waiver.** Any waiver or failure to enforce any provision of this Agreement on one occasion will not be deemed a waiver of any other provision or of such provision on any other occasion.

12.5 **Remedies.** Except as provided in the section titled *Indemnification*, the parties' rights and remedies under this Agreement are cumulative. Customer acknowledges that the Services, Platform, and Documentation contain valuable trade secrets and proprietary information of Company, and that any actual or threatened breach of the sections titled *Ownership and Data Rights* or *Confidentiality*, or any other breach by Customer of its obligations with respect to Intellectual Property Rights of Company, will constitute immediate, irreparable harm to Company for which monetary damages would be an inadequate remedy, entitling Company to seek immediate injunctive or other equitable relief without the requirement of posting bond. If any legal action is brought to enforce this Agreement, the prevailing party will be entitled to receive its attorneys' fees, court costs, and other collection expenses, in addition to any other relief it may receive.

12.6 **Assignment.** Neither party shall assign, subcontract, delegate, or otherwise transfer this Agreement, or its rights and obligations herein, without obtaining the prior written consent of the other party, and any attempted assignment, subcontract, delegation, or transfer in violation of the foregoing will be null and void; provided, however, that either party may assign this Agreement to an affiliate or in connection with a merger, acquisition, reorganization or sale of all or substantially all of its assets, or other operation of law, without any consent of the other party. This Agreement shall inure to the benefit of each party's permitted successors and assigns.

12.7 **Publicity.** <mark>[Optional: Company may publicly list Customer as a customer of Company and, subject to Customer's brand guidelines, use Customer's trademark, trade name, and logo solely for marketing or promotional purposes. / Neither party may use the other party's name or marks without prior written consent.]</mark>

12.8 **Force Majeure.** Any delay in the performance of any duties or obligations of either party (except the payment of money owed) will not be considered a breach of this Agreement if such delay is caused by a labor dispute, shortage of materials, fire, earthquake, flood, pandemic, epidemic, quarantine, or any other event beyond the control of such party, provided that such party uses reasonable efforts, under the circumstances, to notify the other party of the cause of such delay and to resume performance as soon as possible.

12.9 **Relationship of the Parties.** Customer's relationship to Company is that of an independent contractor, and neither party is an agent or partner of the other. Customer will not have, and will not represent to any third party that it has, any authority to act on behalf of Company.

12.10 **Notices.** All notices required or permitted under this Agreement must be delivered in writing, if to Company, by emailing <mark>[Company Email Address]</mark>, and if to Customer, by emailing the email address set forth on the Order Form; provided, however, that with respect to any notices relating to breaches of this Agreement or termination, a copy of such notice will also be sent in writing to the other party at the address listed on the signature page of this Agreement by courier, by certified or registered mail (postage prepaid and return receipt requested), or by a nationally-recognized express mail service. Each party may change its email address and/or address for receipt of notice by giving notice of such change to the other party.

12.11 **Precedence.** To the extent that a conflict arises between the terms and conditions of an Order Form and the terms of this Agreement, the terms and conditions of this Agreement will govern, except to the extent that the Order Form expressly states that it supersedes specific language in the Agreement.

12.12 **Counterparts.** This Agreement may be executed in multiple counterparts, each of which shall be deemed an original and all of which together shall constitute one instrument. A signed copy of this Agreement delivered by email or other means of electronic transmission shall be deemed to have the same legal effect as delivery of an original signed copy of this Agreement.

12.13 **Entire Agreement.** This Agreement (including the DPA, Order Form(s), the SLA, and any supplemental terms) is the final, complete and exclusive agreement of the parties with respect to the subject matters hereof and supersedes and merges all prior discussions between the parties with respect to such subject matters. No usage of trade or other regular practice or method of dealing between the parties will be used to modify, interpret, supplement, or alter the terms of the Agreement. No modification of or amendment to this Agreement, or any waiver of any rights under this Agreement, will be effective unless in writing and signed by an authorized signatory of Customer and Company.

[*The remainder of this page is intentionally left blank; signature page follows.*]

**IN WITNESS WHEREOF**, the parties have caused this Agreement to be executed by their duly authorized representatives as of the Effective Date.

<mark>[Company]</mark>		<mark>[Customer]</mark>

By:	_________		By:

Name:			Name:

Title:			Title:

Address:		Address:

---

**Exhibit A**

**Order Form #1**

| <mark>[Company]</mark> Address:  Email Address: | Order Form For: _______________ Valid Through: _______________ |
| --- | --- |

**Billing Information**

- Bill To:
- Billing Customer Name: ____________________
- Billing Contact Name: ____________________
- Billing Email Address: ____________________

**Terms and Conditions**

| Anticipated Start Date: | Payment Method: |
| --- | --- |
|  | Payment Term: Net <mark>[30]</mark> |
| Initial Term: 12 months Renewal Term: 12 months | Billing Method: Email Billing Frequency: Monthly |

**Services**

| Services | Usage Limits (rate limits / quotas) | Fees |
| --- | --- | --- |
| <mark>[API tier / plan]</mark> | <mark>[requests/min, monthly quota]</mark> | $______________ |

Prices shown above do not include any taxes that may apply. Any such taxes are the responsibility of the Customer. This is not an invoice.

This Order Form (the "**Order Form**") is entered into by and between the company identified in the signature line below ("**Company**") and the customer identified in the signature line below ("**Customer**") and is subject to the Master Services Agreement entered into by the parties concurrently herewith (the "**MSA**," and, together with this Order Form and any attached exhibits or schedules, the "**Agreement**"). Capitalized terms used, but not defined, in this Order Form have the meaning set forth in the MSA.

Upon signature by both parties, this Order Form shall become legally binding. Subscriptions are non-cancelable before the end of the Initial Order Term or Renewal Order Term, except as the Agreement expressly provides.

**Customer:** <mark>________________________________</mark>	**Company:** <mark>_____________________________</mark>

**By:**			**By:**

**Name:**		**Name:**

**Title:**			**Title:**

**Date:**			**Date:**

---

**Exhibit B**

**Service Level Agreement (SLA)**

1. **Uptime Commitment.** Company will use commercially reasonable efforts to make the Services available with a Monthly Uptime Percentage of at least <mark>[99.9%]</mark>. "**Monthly Uptime Percentage**" means the total number of minutes in a calendar month, minus the number of minutes of Downtime in that month, divided by the total number of minutes in that month. "**Downtime**" means a period of at least <mark>[one (1) minute]</mark> during which the Services' production API endpoints return server-error responses to, or fail to respond to, properly formed requests at a material error rate, as measured by Company's monitoring systems.

2. **Exclusions.** Downtime does not include unavailability to the extent caused by: (a) scheduled maintenance announced at least <mark>[48]</mark> hours in advance and performed within Company's published maintenance windows; (b) emergency maintenance reasonably necessary to protect the security or integrity of the Platform; (c) Customer's or an Authorized User's acts, omissions, equipment, software, or network connectivity; (d) use of the Services in excess of Usage Limits or in violation of the Agreement; (e) Third-Party Services, internet backbone failures, or other factors outside Company's reasonable control; or (f) suspension or restriction of access permitted under the Agreement.

3. **Service Credits.** If the Monthly Uptime Percentage for a calendar month falls below the commitment above, Customer will be eligible for a credit against future Fees ("**Service Credit**") computed as a percentage of the monthly Fees attributable to the affected Services for that month:

| Monthly Uptime Percentage | Service Credit |
| --- | --- |
| Below <mark>[99.9%]</mark> but at or above <mark>[99.0%]</mark> | <mark>[10%]</mark> |
| Below <mark>[99.0%]</mark> but at or above <mark>[95.0%]</mark> | <mark>[25%]</mark> |
| Below <mark>[95.0%]</mark> | <mark>[50%]</mark> |

4. **Credit Requests.** To receive a Service Credit, Customer must submit a request to <mark>[SUPPORT EMAIL]</mark> within thirty (30) days after the end of the month in which the Downtime occurred, including the dates, times, and description of the incidents claimed. Company will apply valid Service Credits to a future invoice; Service Credits have no cash value, are not refundable, do not accumulate beyond <mark>[50%]</mark> of the applicable month's Fees, and may not be transferred.

5. **Sole Remedy.** The Service Credits described in this SLA are Customer's sole and exclusive remedy, and Company's entire liability, for any unavailability or performance degradation of the Services. If the Monthly Uptime Percentage falls below <mark>[95.0%]</mark> in each of any three (3) consecutive calendar months, Customer may terminate the affected Order upon written notice within thirty (30) days after the end of the third such month and receive a pro-rata refund of prepaid Fees for the unused remainder of the Order Term, which is Customer's sole and exclusive remedy for chronic unavailability.
