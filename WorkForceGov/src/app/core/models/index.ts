// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  fullName: string;
  email: string;
  role: string;
}


// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  status: string;
  phone?: string;
  createdAt: string;
}

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
}


// ─── Citizen ──────────────────────────────────────────────────────────────────

export interface Citizen {
  id: number;
  userId: number;
  fullName: string;
  email?: string;
  dob?: string;
  gender?: string;
  phoneNumber?: string;
  address?: string;
}


// ─── Employer ─────────────────────────────────────────────────────────────────

export interface Employer {
  id: number;
  userId: number;
  companyName: string;
  industry: string;
  address?: string;
  contactInfo?: string;
  status: string;
  registrationDate: string;
}


// ─── Job ──────────────────────────────────────────────────────────────────────

export interface JobOpening {
  id: number;
  employerId: number;
  jobTitle: string;
  description: string;
  location: string;
  jobCategory?: string;
  salaryMin: number;
  salaryMax: number;
  postedDate: string;
  closingDate?: string;
  status: string;
  employer?: Employer;
  applications?: Application[];
  employerName?: string; // flat from API
}


// ─── Application ──────────────────────────────────────────────────────────────

export interface Application {
  id: number;
  citizenId: number;
  jobOpeningId: number;
  submittedDate: string;
  status: string;
  coverLetter?: string;
  notes?: string;
  citizen?: Citizen;
  jobOpening?: JobOpening;
}


// ─── Benefit ──────────────────────────────────────────────────────────────────

export interface Benefit {
  id: number;
  citizenId: number;
  programId: number;
  benefitType: string;
  amount: number;
  benefitDate: string;
  status: string;
  description?: string;
  citizen?: Citizen;
  employmentProgram?: EmploymentProgram; // <--- FIXED!
}


// ─── Training ─────────────────────────────────────────────────────────────────

export interface Training {
  id: number;
  programId: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  program?: EmploymentProgram;
}

export interface TrainingEnrollment {
  id: number;
  trainingId: number;
  citizenId: number;
  enrolledDate: string;
  status: string;
  completedDate?: string;
  training?: Training;
  citizen?: Citizen;
}


// ─── Documents ────────────────────────────────────────────────────────────────

export interface CitizenDocument {
  id: number;
  citizenId: number;
  documentType: string;
  fileName: string;
  filePath?: string;
  uploadedDate: string;
  verificationStatus: string;
  citizen?: Citizen;
}

export interface EmployerDocument {
  id: number;
  employerId: number;
  docType: string;
  fileName?: string;
  fileURL?: string;
  uploadedDate: string;
  verificationStatus: string;
  employer?: Employer;
}


// ─── Program ──────────────────────────────────────────────────────────────────

export interface EmploymentProgram {
  id: number;
  programName: string;
  programType: string;
  description?: string;
  startDate: string;
  endDate?: string;
  totalBudget: number;
  status: string;
}


// ─── Compliance ───────────────────────────────────────────────────────────────

export interface ComplianceRecord {
  id: number;
  entityId: number;
  type: string;
  result: string;
  date: string;
  notes?: string;
}

export interface Complaint {
  id: number;
  userId: number;
  employerId?: number;
  complaintDescription: string;
  status: string;
  submittedDate: string;
  resolution?: string;
  user?: User;
  employer?: Employer;
}

export interface Violation {
  id: number;
  employerId: number;
  type: string;
  description: string;
  issuedDate: string;
  status: string;
  employer?: Employer;
}


// ─── Audit ────────────────────────────────────────────────────────────────────

export interface Audit {
  id: number;
  scope: string;
  findings?: string;
  date: string;
  status: string;
  conductedBy?: number;
}


// ─── Report ───────────────────────────────────────────────────────────────────

export interface Report {
  id: number;
  reportName: string;
  reportType: string;
  generatedDate: string;
  generatedBy?: number;
  content?: string;
}


// ─── Resource ─────────────────────────────────────────────────────────────────

export interface Resource {
  id: number;
  programId: number;
  resourceName: string;
  resourceType: string;
  quantity: number;
  allocatedDate: string;
  program?: EmploymentProgram;
}


// ─── Notification ─────────────────────────────────────────────────────────────

export interface Notification {
  id: number;
  userId: number;
  message: string;
  isRead: boolean;
  createdDate: string;
  category: string;
}


// ─── System Log ───────────────────────────────────────────────────────────────

export interface SystemLog {
  id: number;
  userId: number;
  action: string;
  resource?: string;
  ipAddress?: string;
  timestamp: string;
  user?: User;
}


// ─── Dashboards ───────────────────────────────────────────────────────────────

export interface AdminDashboard {
  totalUsers: number;
  openJobs: number;
  activePrograms: number;
  pendingApplications: number;
  totalCitizens: number;
  totalEmployers: number;
  totalBudget: number;
  totalAudits: number;
  recentJobs: JobOpening[];
  recentLogs: SystemLog[];
}

export interface CitizenDashboard {
  citizen: Citizen;
  activeApplications: number;
  totalBenefits: number;
  documentCount: number;
  verifiedDocs: number;
  totalBenefitAmount: number;
  recentApplications: Application[];
  recommendedJobs: JobOpening[];
}

export interface EmployerDashboard {
  employer: Employer;
  totalJobPostings: number;
  totalApplicationsReceived: number;
  shortlistedCandidates: number;
  hiredCandidates: number;
  recentApplications: Application[];
  recentJobs: JobOpening[];
}

export interface LaborOfficerDashboard {
  pendingDocuments: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  pendingDocs: CitizenDocument[];
  notifications: Notification[];
}

export interface ComplianceDashboard {
  pendingReviews: number;
  pendingComplaints: number;
  totalViolations: number;
  totalInspections: number;
  employers: Employer[];
  recentRecords: ComplianceRecord[];
  recentComplaints: Complaint[];
}

export interface AuditorDashboard {
  totalAudits: number;
  openAudits: number;
  completedAudits: number;
  nonCompliant: number;
  recentAudits: Audit[];
  programs: EmploymentProgram[];
}

export interface ProgramManagerDashboard {
  activePrograms: number;
  totalBudget: number;
  budgetUtilized: number;
  totalTrainings: number;
  totalBeneficiaries: number;
  programs: EmploymentProgram[];
  activeTrainings: Training[];
}


// ─── API Response wrapper ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}