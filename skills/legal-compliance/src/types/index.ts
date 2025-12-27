// Legal Compliance Types and Interfaces

export interface CompanyInfo {
  name: string;
  legalName?: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  email: string;
  website: string;
  phone?: string;
  registrationNumber?: string;
  vatNumber?: string;
}

export interface PrivacyPolicyOptions {
  company: CompanyInfo;
  dataController?: CompanyInfo;
  dataProtectionOfficer?: {
    name: string;
    email: string;
    phone?: string;
  };
  dataTypes: DataType[];
  purposes: DataPurpose[];
  legalBases: LegalBasis[];
  dataRetention: DataRetentionPolicy[];
  thirdParties: ThirdParty[];
  internationalTransfers?: InternationalTransfer[];
  userRights: UserRight[];
  cookies?: CookieCategory[];
  childrenPrivacy?: boolean;
  californiaPrivacy?: boolean;
  lastUpdated: Date;
  effectiveDate: Date;
}

export interface DataType {
  category: string;
  description: string;
  examples: string[];
  sensitive?: boolean;
}

export interface DataPurpose {
  purpose: string;
  description: string;
  lawfulBasis: string;
}

export interface LegalBasis {
  basis: 'consent' | 'contract' | 'legal_obligation' | 'vital_interests' | 'public_task' | 'legitimate_interests';
  description: string;
}

export interface DataRetentionPolicy {
  dataCategory: string;
  retentionPeriod: string;
  deletionProcess: string;
}

export interface ThirdParty {
  name: string;
  purpose: string;
  category: string;
  dataShared: string[];
}

export interface InternationalTransfer {
  country: string;
  safeguards: string;
  adequacyDecision?: boolean;
}

export interface UserRight {
  right: string;
  description: string;
  howToExercise: string;
}

export interface TermsOfServiceOptions {
  company: CompanyInfo;
  serviceDescription: string;
  userObligations: string[];
  prohibitedUses: string[];
  intellectualProperty: IntellectualPropertyTerms;
  limitationOfLiability: LiabilityTerms;
  indemnification: string;
  termination: TerminationTerms;
  disputeResolution: DisputeResolutionTerms;
  governingLaw: GoverningLawTerms;
  lastUpdated: Date;
  effectiveDate: Date;
}

export interface IntellectualPropertyTerms {
  ownership: string;
  userContent: string;
  license: string;
  feedback: string;
}

export interface LiabilityTerms {
  disclaimer: string;
  limitationAmount?: string;
  exceptions: string[];
}

export interface TerminationTerms {
  byUser: string;
  byCompany: string;
  effect: string;
  survival: string[];
}

export interface DisputeResolutionTerms {
  informalResolution: string;
  arbitration?: boolean;
  arbitrationRules?: string;
  classActionWaiver?: boolean;
  venue: string;
}

export interface GoverningLawTerms {
  jurisdiction: string;
  venue: string;
}

export interface CookiePolicyOptions {
  company: CompanyInfo;
  cookieCategories: CookieCategory[];
  cookieTable: Cookie[];
  consentMechanism: ConsentMechanism;
  optOutMethods: OptOutMethod[];
  lastUpdated: Date;
}

export interface CookieCategory {
  name: string;
  description: string;
  required: boolean;
  defaultEnabled: boolean;
}

export interface Cookie {
  name: string;
  category: string;
  purpose: string;
  duration: string;
  provider: string;
  type: 'first_party' | 'third_party';
}

export interface ConsentMechanism {
  type: 'banner' | 'modal' | 'implicit' | 'explicit';
  granularControl: boolean;
  withdrawMethod: string;
}

export interface OptOutMethod {
  method: string;
  instructions: string;
  link?: string;
}

export interface DPAOptions {
  controller: CompanyInfo;
  processor: CompanyInfo;
  servicesDescription: string;
  processingDetails: ProcessingDetails;
  technicalMeasures: string[];
  organizationalMeasures: string[];
  subprocessors: SubprocessorTerms;
  dataSubjectRights: string;
  breach: BreachTerms;
  audit: AuditTerms;
  liability: string;
  term: ContractTerm;
  effectiveDate: Date;
}

export interface ProcessingDetails {
  nature: string;
  purpose: string;
  duration: string;
  dataTypes: string[];
  dataSubjects: string[];
}

export interface SubprocessorTerms {
  allowed: boolean;
  approvalRequired: boolean;
  notificationPeriod?: number;
  objectionRight: boolean;
  list?: CompanyInfo[];
}

export interface BreachTerms {
  notificationPeriod: number;
  notificationMethod: string;
  cooperation: string;
}

export interface AuditTerms {
  frequency: string;
  notice: number;
  scope: string;
  auditor: 'controller' | 'third_party' | 'both';
}

export interface ContractTerm {
  duration: string;
  termination: string;
  dataReturn: string;
  dataDeletion: string;
}

export interface ComplianceCheckResult {
  compliant: boolean;
  issues: ComplianceIssue[];
  warnings: ComplianceWarning[];
  recommendations: string[];
  score: number;
}

export interface ComplianceIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  issue: string;
  location?: string;
  regulation?: string;
  recommendation: string;
}

export interface ComplianceWarning {
  category: string;
  warning: string;
  recommendation: string;
}

export interface DPIAOptions {
  project: ProjectDetails;
  dataProcessing: DataProcessingActivities;
  necessity: NecessityAssessment;
  risks: RiskAssessment[];
  measures: SafeguardMeasures;
  consultation: ConsultationDetails;
  approval: ApprovalDetails;
  review: ReviewSchedule;
}

export interface ProjectDetails {
  name: string;
  description: string;
  controller: CompanyInfo;
  jointControllers?: CompanyInfo[];
  dpo?: ContactPerson;
  projectLead: ContactPerson;
  startDate: Date;
}

export interface ContactPerson {
  name: string;
  role: string;
  email: string;
  phone?: string;
}

export interface DataProcessingActivities {
  purposes: string[];
  dataTypes: ProcessedDataType[];
  dataSubjects: DataSubjectCategory[];
  processingOperations: string[];
  dataFlows: DataFlow[];
  retention: RetentionSchedule[];
  internationalTransfers?: InternationalTransferDPIA[];
}

export interface ProcessedDataType {
  category: string;
  description: string;
  sensitive: boolean;
  specialCategory: boolean;
}

export interface DataSubjectCategory {
  category: string;
  description: string;
  vulnerable: boolean;
  approximateNumber?: string;
}

export interface DataFlow {
  from: string;
  to: string;
  dataTypes: string[];
  purpose: string;
  safeguards: string[];
}

export interface RetentionSchedule {
  dataType: string;
  retentionPeriod: string;
  reviewPeriod: string;
  deletionMethod: string;
}

export interface InternationalTransferDPIA {
  country: string;
  recipient: string;
  safeguards: string[];
  adequacyDecision: boolean;
}

export interface NecessityAssessment {
  purposes: string[];
  lawfulBasis: string[];
  necessity: string;
  proportionality: string;
  lesIntrusive: string;
}

export interface RiskAssessment {
  risk: string;
  source: string;
  likelihood: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  severity: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  impact: string;
  riskScore: number;
}

export interface SafeguardMeasures {
  technical: TechnicalMeasure[];
  organizational: OrganizationalMeasure[];
  additionalMeasures: string[];
}

export interface TechnicalMeasure {
  measure: string;
  description: string;
  implementation: string;
}

export interface OrganizationalMeasure {
  measure: string;
  description: string;
  responsible: string;
}

export interface ConsultationDetails {
  stakeholders: string[];
  dataSubjects: boolean;
  dpo: boolean;
  otherExperts: string[];
  feedback: string;
}

export interface ApprovalDetails {
  approvedBy: ContactPerson;
  approvalDate: Date;
  conditions: string[];
  nextReview: Date;
}

export interface ReviewSchedule {
  frequency: string;
  triggers: string[];
  responsible: ContactPerson;
}

export interface LicenseCompatibilityResult {
  compatible: boolean;
  conflicts: LicenseConflict[];
  recommendations: string[];
  compatibilityMatrix: CompatibilityMatrix;
}

export interface LicenseConflict {
  license1: string;
  license2: string;
  conflictType: string;
  severity: 'blocking' | 'warning' | 'notice';
  resolution: string;
}

export interface CompatibilityMatrix {
  [license: string]: {
    [otherLicense: string]: 'compatible' | 'incompatible' | 'conditional';
  };
}

export interface ConsentImplementation {
  method: ConsentMechanism;
  code: ConsentCode;
  documentation: string;
  compliance: ConsentCompliance;
}

export interface ConsentCode {
  html: string;
  css: string;
  javascript: string;
  framework?: string;
}

export interface ConsentCompliance {
  gdprCompliant: boolean;
  ccpaCompliant: boolean;
  eprivacyCompliant: boolean;
  requirements: string[];
}

export interface LegalDocumentTemplate {
  type: string;
  name: string;
  description: string;
  template: string;
  variables: TemplateVariable[];
  jurisdiction: string[];
  lastUpdated: Date;
}

export interface TemplateVariable {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
  validation?: string;
}

export interface RegulatoryFramework {
  name: string;
  abbreviation: string;
  jurisdiction: string;
  requirements: RegulationRequirement[];
  effectiveDate: Date;
  penalties: PenaltyStructure;
}

export interface RegulationRequirement {
  requirement: string;
  category: string;
  description: string;
  technicalMeasures: string[];
  organizationalMeasures: string[];
}

export interface PenaltyStructure {
  maxFine: string;
  calculationMethod: string;
  factors: string[];
}