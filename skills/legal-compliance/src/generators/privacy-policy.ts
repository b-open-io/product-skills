import { PrivacyPolicyOptions, CompanyInfo } from '../types';
import { formatDate, escapeHtml } from '../utils/helpers';

export class PrivacyPolicyGenerator {
  private options: PrivacyPolicyOptions;

  constructor(options: PrivacyPolicyOptions) {
    this.options = options;
  }

  generate(): string {
    const sections = [
      this.generateHeader(),
      this.generateIntroduction(),
      this.generateDataController(),
      this.generateDataCollection(),
      this.generatePurposesAndLegalBases(),
      this.generateDataSharing(),
      this.generateInternationalTransfers(),
      this.generateDataRetention(),
      this.generateUserRights(),
      this.generateDataSecurity(),
      this.generateCookies(),
      this.generateChildrenPrivacy(),
      this.generateCaliforniaPrivacy(),
      this.generateChanges(),
      this.generateContact()
    ];

    return sections.filter(Boolean).join('\n\n');
  }

  generateMarkdown(): string {
    const sections = [
      `# Privacy Policy`,
      ``,
      `**Last Updated:** ${formatDate(this.options.lastUpdated)}`,
      `**Effective Date:** ${formatDate(this.options.effectiveDate)}`,
      ``,
      `## 1. Introduction`,
      this.generateIntroductionMarkdown(),
      ``,
      `## 2. Data Controller`,
      this.generateDataControllerMarkdown(),
      ``,
      `## 3. Information We Collect`,
      this.generateDataCollectionMarkdown(),
      ``,
      `## 4. How We Use Your Information`,
      this.generatePurposesMarkdown(),
      ``,
      `## 5. Legal Bases for Processing`,
      this.generateLegalBasesMarkdown(),
      ``,
      `## 6. Data Sharing`,
      this.generateDataSharingMarkdown(),
      ``,
      this.options.internationalTransfers ? `## 7. International Transfers\n${this.generateInternationalTransfersMarkdown()}\n` : '',
      `## 8. Data Retention`,
      this.generateDataRetentionMarkdown(),
      ``,
      `## 9. Your Rights`,
      this.generateUserRightsMarkdown(),
      ``,
      `## 10. Data Security`,
      this.generateDataSecurityMarkdown(),
      ``,
      this.options.cookies ? `## 11. Cookies and Tracking\n${this.generateCookiesMarkdown()}\n` : '',
      this.options.childrenPrivacy ? `## 12. Children's Privacy\n${this.generateChildrenPrivacyMarkdown()}\n` : '',
      this.options.californiaPrivacy ? `## 13. California Privacy Rights\n${this.generateCaliforniaPrivacyMarkdown()}\n` : '',
      `## 14. Changes to This Policy`,
      this.generateChangesMarkdown(),
      ``,
      `## 15. Contact Us`,
      this.generateContactMarkdown()
    ];

    return sections.filter(Boolean).join('\n');
  }

  private generateHeader(): string {
    return `<!DOCTYPE html>
<html>
<head>
<title>Privacy Policy - ${escapeHtml(this.options.company.name)}</title>
<style>
  body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
  h1, h2 { color: #333; }
  .metadata { color: #666; margin-bottom: 20px; }
  table { border-collapse: collapse; width: 100%; margin: 20px 0; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f4f4f4; }
</style>
</head>
<body>`;
  }

  private generateIntroduction(): string {
    return `<h1>Privacy Policy</h1>
<div class="metadata">
  <p><strong>Last Updated:</strong> ${formatDate(this.options.lastUpdated)}</p>
  <p><strong>Effective Date:</strong> ${formatDate(this.options.effectiveDate)}</p>
</div>

<h2>1. Introduction</h2>
<p>${escapeHtml(this.options.company.name)} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ${escapeHtml(this.options.company.website)}, use our services, or interact with us.</p>
<p>Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our services.</p>`;
  }

  private generateIntroductionMarkdown(): string {
    return `${this.options.company.name} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ${this.options.company.website}, use our services, or interact with us.

Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our services.`;
  }

  private generateDataController(): string {
    const controller = this.options.dataController || this.options.company;
    let html = `<h2>2. Data Controller</h2>
<p>The data controller responsible for your personal information is:</p>
<address>
  <strong>${escapeHtml(controller.legalName || controller.name)}</strong><br>
  ${escapeHtml(controller.address)}<br>
  ${escapeHtml(controller.city)}, ${controller.state ? escapeHtml(controller.state) + ', ' : ''}${escapeHtml(controller.country)} ${controller.postalCode ? escapeHtml(controller.postalCode) : ''}<br>
  Email: <a href="mailto:${escapeHtml(controller.email)}">${escapeHtml(controller.email)}</a><br>
  ${controller.phone ? `Phone: ${escapeHtml(controller.phone)}<br>` : ''}
  ${controller.registrationNumber ? `Registration Number: ${escapeHtml(controller.registrationNumber)}<br>` : ''}
  ${controller.vatNumber ? `VAT Number: ${escapeHtml(controller.vatNumber)}<br>` : ''}
</address>`;

    if (this.options.dataProtectionOfficer) {
      html += `<h3>Data Protection Officer</h3>
<p>You can contact our Data Protection Officer at:</p>
<address>
  <strong>${escapeHtml(this.options.dataProtectionOfficer.name)}</strong><br>
  Email: <a href="mailto:${escapeHtml(this.options.dataProtectionOfficer.email)}">${escapeHtml(this.options.dataProtectionOfficer.email)}</a><br>
  ${this.options.dataProtectionOfficer.phone ? `Phone: ${escapeHtml(this.options.dataProtectionOfficer.phone)}` : ''}
</address>`;
    }

    return html;
  }

  private generateDataControllerMarkdown(): string {
    const controller = this.options.dataController || this.options.company;
    let markdown = `The data controller responsible for your personal information is:

**${controller.legalName || controller.name}**
${controller.address}
${controller.city}, ${controller.state ? controller.state + ', ' : ''}${controller.country} ${controller.postalCode || ''}
Email: ${controller.email}
${controller.phone ? `Phone: ${controller.phone}  ` : ''}
${controller.registrationNumber ? `Registration Number: ${controller.registrationNumber}  ` : ''}
${controller.vatNumber ? `VAT Number: ${controller.vatNumber}  ` : ''}`;

    if (this.options.dataProtectionOfficer) {
      markdown += `\n\n### Data Protection Officer\n\nYou can contact our Data Protection Officer at:\n\n**${this.options.dataProtectionOfficer.name}**
Email: ${this.options.dataProtectionOfficer.email}
${this.options.dataProtectionOfficer.phone ? `Phone: ${this.options.dataProtectionOfficer.phone}` : ''}`;
    }

    return markdown;
  }

  private generateDataCollection(): string {
    let html = `<h2>3. Information We Collect</h2>
<p>We collect the following categories of personal information:</p>`;

    this.options.dataTypes.forEach(dataType => {
      html += `<h3>${escapeHtml(dataType.category)}${dataType.sensitive ? ' (Sensitive Data)' : ''}</h3>
<p>${escapeHtml(dataType.description)}</p>
<ul>
${dataType.examples.map(example => `  <li>${escapeHtml(example)}</li>`).join('\n')}
</ul>`;
    });

    return html;
  }

  private generateDataCollectionMarkdown(): string {
    let markdown = `We collect the following categories of personal information:\n`;

    this.options.dataTypes.forEach(dataType => {
      markdown += `\n### ${dataType.category}${dataType.sensitive ? ' (Sensitive Data)' : ''}\n\n${dataType.description}\n\n`;
      markdown += dataType.examples.map(example => `- ${example}`).join('\n');
      markdown += '\n';
    });

    return markdown;
  }

  private generatePurposesAndLegalBases(): string {
    let html = `<h2>4. How We Use Your Information</h2>
<p>We use your personal information for the following purposes:</p>
<table>
<thead>
<tr>
  <th>Purpose</th>
  <th>Description</th>
  <th>Legal Basis</th>
</tr>
</thead>
<tbody>`;

    this.options.purposes.forEach(purpose => {
      html += `
<tr>
  <td>${escapeHtml(purpose.purpose)}</td>
  <td>${escapeHtml(purpose.description)}</td>
  <td>${escapeHtml(purpose.lawfulBasis)}</td>
</tr>`;
    });

    html += `
</tbody>
</table>`;

    return html;
  }

  private generatePurposesMarkdown(): string {
    let markdown = `We use your personal information for the following purposes:\n\n`;

    this.options.purposes.forEach(purpose => {
      markdown += `**${purpose.purpose}**\n${purpose.description}\n*Legal Basis: ${purpose.lawfulBasis}*\n\n`;
    });

    return markdown.trim();
  }

  private generateLegalBasesMarkdown(): string {
    let markdown = `We rely on the following legal bases for processing your personal data:\n\n`;

    this.options.legalBases.forEach(basis => {
      const basisName = basis.basis.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      markdown += `- **${basisName}:** ${basis.description}\n`;
    });

    return markdown;
  }

  private generateDataSharing(): string {
    if (this.options.thirdParties.length === 0) {
      return `<h2>5. Data Sharing</h2>
<p>We do not share your personal information with third parties except as necessary to provide our services or as required by law.</p>`;
    }

    let html = `<h2>5. Data Sharing</h2>
<p>We may share your personal information with the following categories of third parties:</p>
<table>
<thead>
<tr>
  <th>Third Party</th>
  <th>Purpose</th>
  <th>Category</th>
  <th>Data Shared</th>
</tr>
</thead>
<tbody>`;

    this.options.thirdParties.forEach(party => {
      html += `
<tr>
  <td>${escapeHtml(party.name)}</td>
  <td>${escapeHtml(party.purpose)}</td>
  <td>${escapeHtml(party.category)}</td>
  <td>${party.dataShared.map(d => escapeHtml(d)).join(', ')}</td>
</tr>`;
    });

    html += `
</tbody>
</table>`;

    return html;
  }

  private generateDataSharingMarkdown(): string {
    if (this.options.thirdParties.length === 0) {
      return `We do not share your personal information with third parties except as necessary to provide our services or as required by law.`;
    }

    let markdown = `We may share your personal information with the following categories of third parties:\n\n`;

    this.options.thirdParties.forEach(party => {
      markdown += `**${party.name}**\n`;
      markdown += `- Purpose: ${party.purpose}\n`;
      markdown += `- Category: ${party.category}\n`;
      markdown += `- Data Shared: ${party.dataShared.join(', ')}\n\n`;
    });

    return markdown.trim();
  }

  private generateInternationalTransfers(): string {
    if (!this.options.internationalTransfers || this.options.internationalTransfers.length === 0) {
      return '';
    }

    let html = `<h2>6. International Transfers</h2>
<p>Your personal information may be transferred to and processed in countries other than your country of residence. These transfers are protected by the following safeguards:</p>
<ul>`;

    this.options.internationalTransfers.forEach(transfer => {
      html += `<li><strong>${escapeHtml(transfer.country)}</strong>: ${escapeHtml(transfer.safeguards)}${transfer.adequacyDecision ? ' (Adequacy Decision in place)' : ''}</li>`;
    });

    html += `</ul>`;
    return html;
  }

  private generateInternationalTransfersMarkdown(): string {
    if (!this.options.internationalTransfers || this.options.internationalTransfers.length === 0) {
      return '';
    }

    let markdown = `Your personal information may be transferred to and processed in countries other than your country of residence. These transfers are protected by the following safeguards:\n\n`;

    this.options.internationalTransfers.forEach(transfer => {
      markdown += `- **${transfer.country}**: ${transfer.safeguards}${transfer.adequacyDecision ? ' (Adequacy Decision in place)' : ''}\n`;
    });

    return markdown;
  }

  private generateDataRetention(): string {
    let html = `<h2>7. Data Retention</h2>
<p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
<table>
<thead>
<tr>
  <th>Data Category</th>
  <th>Retention Period</th>
  <th>Deletion Process</th>
</tr>
</thead>
<tbody>`;

    this.options.dataRetention.forEach(policy => {
      html += `
<tr>
  <td>${escapeHtml(policy.dataCategory)}</td>
  <td>${escapeHtml(policy.retentionPeriod)}</td>
  <td>${escapeHtml(policy.deletionProcess)}</td>
</tr>`;
    });

    html += `
</tbody>
</table>`;

    return html;
  }

  private generateDataRetentionMarkdown(): string {
    let markdown = `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.\n\n`;

    this.options.dataRetention.forEach(policy => {
      markdown += `**${policy.dataCategory}**\n`;
      markdown += `- Retention Period: ${policy.retentionPeriod}\n`;
      markdown += `- Deletion Process: ${policy.deletionProcess}\n\n`;
    });

    return markdown.trim();
  }

  private generateUserRights(): string {
    let html = `<h2>8. Your Rights</h2>
<p>You have the following rights regarding your personal information:</p>
<ul>`;

    this.options.userRights.forEach(right => {
      html += `<li>
  <strong>${escapeHtml(right.right)}</strong>: ${escapeHtml(right.description)}
  <p><em>How to exercise:</em> ${escapeHtml(right.howToExercise)}</p>
</li>`;
    });

    html += `</ul>
<p>To exercise any of these rights, please contact us using the contact information provided at the end of this Privacy Policy.</p>`;

    return html;
  }

  private generateUserRightsMarkdown(): string {
    let markdown = `You have the following rights regarding your personal information:\n\n`;

    this.options.userRights.forEach(right => {
      markdown += `**${right.right}**\n${right.description}\n*How to exercise:* ${right.howToExercise}\n\n`;
    });

    markdown += `To exercise any of these rights, please contact us using the contact information provided at the end of this Privacy Policy.`;

    return markdown;
  }

  private generateDataSecurity(): string {
    return `<h2>9. Data Security</h2>
<p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. These measures include:</p>
<ul>
  <li>Encryption of data in transit and at rest</li>
  <li>Regular security assessments and audits</li>
  <li>Access controls and authentication mechanisms</li>
  <li>Employee training on data protection</li>
  <li>Incident response procedures</li>
</ul>
<p>While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>`;
  }

  private generateDataSecurityMarkdown(): string {
    return `We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. These measures include:

- Encryption of data in transit and at rest
- Regular security assessments and audits
- Access controls and authentication mechanisms
- Employee training on data protection
- Incident response procedures

While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.`;
  }

  private generateCookies(): string {
    if (!this.options.cookies || this.options.cookies.length === 0) {
      return '';
    }

    let html = `<h2>10. Cookies and Tracking Technologies</h2>
<p>We use cookies and similar tracking technologies to collect and use personal information about you. For detailed information about the cookies we use and the purposes for which we use them, please see our Cookie Policy.</p>
<p>The types of cookies we use include:</p>
<ul>`;

    this.options.cookies.forEach(category => {
      html += `<li><strong>${escapeHtml(category.name)}</strong>: ${escapeHtml(category.description)} ${category.required ? '(Required)' : '(Optional)'}</li>`;
    });

    html += `</ul>`;
    return html;
  }

  private generateCookiesMarkdown(): string {
    if (!this.options.cookies || this.options.cookies.length === 0) {
      return '';
    }

    let markdown = `We use cookies and similar tracking technologies to collect and use personal information about you. For detailed information about the cookies we use and the purposes for which we use them, please see our Cookie Policy.\n\nThe types of cookies we use include:\n\n`;

    this.options.cookies.forEach(category => {
      markdown += `- **${category.name}**: ${category.description} ${category.required ? '(Required)' : '(Optional)'}\n`;
    });

    return markdown;
  }

  private generateChildrenPrivacy(): string {
    if (!this.options.childrenPrivacy) {
      return '';
    }

    return `<h2>11. Children's Privacy</h2>
<p>Our services are not directed to children under the age of 16, and we do not knowingly collect personal information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children under 16 without verification of parental consent, we take steps to remove that information from our servers.</p>`;
  }

  private generateChildrenPrivacyMarkdown(): string {
    if (!this.options.childrenPrivacy) {
      return '';
    }

    return `Our services are not directed to children under the age of 16, and we do not knowingly collect personal information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children under 16 without verification of parental consent, we take steps to remove that information from our servers.`;
  }

  private generateCaliforniaPrivacy(): string {
    if (!this.options.californiaPrivacy) {
      return '';
    }

    return `<h2>12. California Privacy Rights</h2>
<p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
<ul>
  <li><strong>Right to Know:</strong> You have the right to request information about the categories and specific pieces of personal information we have collected about you.</li>
  <li><strong>Right to Delete:</strong> You have the right to request that we delete personal information we have collected from you.</li>
  <li><strong>Right to Opt-Out:</strong> You have the right to opt-out of the sale of your personal information. We do not sell personal information.</li>
  <li><strong>Right to Non-Discrimination:</strong> You have the right not to be discriminated against for exercising any of your CCPA rights.</li>
</ul>
<p>To exercise these rights, please contact us using the methods described in this Privacy Policy. We will verify your identity before processing your request.</p>`;
  }

  private generateCaliforniaPrivacyMarkdown(): string {
    if (!this.options.californiaPrivacy) {
      return '';
    }

    return `If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):

- **Right to Know:** You have the right to request information about the categories and specific pieces of personal information we have collected about you.
- **Right to Delete:** You have the right to request that we delete personal information we have collected from you.
- **Right to Opt-Out:** You have the right to opt-out of the sale of your personal information. We do not sell personal information.
- **Right to Non-Discrimination:** You have the right not to be discriminated against for exercising any of your CCPA rights.

To exercise these rights, please contact us using the methods described in this Privacy Policy. We will verify your identity before processing your request.`;
  }

  private generateChanges(): string {
    return `<h2>13. Changes to This Privacy Policy</h2>
<p>We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
<p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>`;
  }

  private generateChangesMarkdown(): string {
    return `We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.

You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.`;
  }

  private generateContact(): string {
    return `<h2>14. Contact Us</h2>
<p>If you have any questions about this Privacy Policy or our privacy practices, please contact us at:</p>
<address>
  <strong>${escapeHtml(this.options.company.name)}</strong><br>
  ${escapeHtml(this.options.company.address)}<br>
  ${escapeHtml(this.options.company.city)}, ${this.options.company.state ? escapeHtml(this.options.company.state) + ', ' : ''}${escapeHtml(this.options.company.country)} ${this.options.company.postalCode ? escapeHtml(this.options.company.postalCode) : ''}<br>
  Email: <a href="mailto:${escapeHtml(this.options.company.email)}">${escapeHtml(this.options.company.email)}</a><br>
  ${this.options.company.phone ? `Phone: ${escapeHtml(this.options.company.phone)}` : ''}
</address>
</body>
</html>`;
  }

  private generateContactMarkdown(): string {
    return `If you have any questions about this Privacy Policy or our privacy practices, please contact us at:

**${this.options.company.name}**
${this.options.company.address}
${this.options.company.city}, ${this.options.company.state ? this.options.company.state + ', ' : ''}${this.options.company.country} ${this.options.company.postalCode || ''}
Email: ${this.options.company.email}
${this.options.company.phone ? `Phone: ${this.options.company.phone}` : ''}`;
  }
}