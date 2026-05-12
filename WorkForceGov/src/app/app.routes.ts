import { Routes } from '@angular/router';
import { authGuard, guestGuard, roleGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  // ── Public ──────────────────────────────────────────────────────────────────
  { path: '',       redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',   loadComponent: () => import('./features/Home/components/home.component/home.component').then(m => m.HomeComponent) },
  { path: 'login',    canActivate: [guestGuard], loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', canActivate: [guestGuard], loadComponent: () => import('./features/auth/components/register/register.component').then(m => m.RegisterComponent) },

  // ── Admin ────────────────────────────────────────────────────────────────────
  { path: 'admin', component: LayoutComponent, canActivate: [roleGuard(['SystemAdmin'])], children: [
    { path: '',                redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',       loadComponent: () => import('./features/admin/components/dashboard/dashboard.component').then(m => m.AdminDashboardComponent) },
    { path: 'manage-users',    loadComponent: () => import('./features/admin/components/manage-users/manage-users.component').then(m => m.ManageUsersComponent) },
    { path: 'create-user',     loadComponent: () => import('./features/admin/components/create-user/create-user.component').then(m => m.CreateUserComponent) },
    { path: 'edit-user/:id',   loadComponent: () => import('./features/admin/components/edit-user/edit-user.component').then(m => m.EditUserComponent) },
    { path: 'reports',         loadComponent: () => import('./features/admin/components/reports/reports.component').then(m => m.AdminReportsComponent) },
    { path: 'system-monitoring', loadComponent: () => import('./features/admin/components/system-monitoring/system-monitoring.component').then(m => m.SystemMonitoringComponent) },
  ]},

  // ── Citizen ──────────────────────────────────────────────────────────────────
  { path: 'citizen', component: LayoutComponent, canActivate: [roleGuard(['Citizen'])], children: [
    { path: '',                redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',       loadComponent: () => import('./features/citizen/components/dashboard/dashboard.component').then(m => m.CitizenDashboardComponent) },
    { path: 'job-search',      loadComponent: () => import('./features/citizen/components/job-search/job-search.component').then(m => m.JobSearchComponent) },
    { path: 'job-applications',loadComponent: () => import('./features/citizen/components/job-applications/job-applications.component').then(m => m.JobApplicationsComponent) },
    { path: 'benefits',        loadComponent: () => import('./features/citizen/components/benefits/benefits.component').then(m => m.CitizenBenefitsComponent) },
    { path: 'trainings',       loadComponent: () => import('./features/citizen/components/trainings/trainings.component').then(m => m.CitizenTrainingsComponent) },
    { path: 'documents',       loadComponent: () => import('./features/citizen/components/documents/documents.component').then(m => m.CitizenDocumentsComponent) },
    { path: 'profile',         loadComponent: () => import('./features/citizen/components/profile/profile.component').then(m => m.CitizenProfileComponent) },
    { path: 'notifications',   loadComponent: () => import('./features/citizen/components/notifications/notifications.component').then(m => m.CitizenNotificationsComponent) },
  ]},

  // ── Employer ─────────────────────────────────────────────────────────────────
  { path: 'employer', component: LayoutComponent, canActivate: [roleGuard(['Employer'])], children: [
    { path: '',                    redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',           loadComponent: () => import('./features/employer/components/dashboard/dashboard.component').then(m => m.EmployerDashboardComponent) },
    { path: 'register',            loadComponent: () => import('./features/employer/components/register/register.component').then(m => m.EmployerRegisterComponent) },
    { path: 'manage-jobs',         loadComponent: () => import('./features/employer/components/manage-jobs/manage-jobs.component').then(m => m.ManageJobsComponent) },
    { path: 'create-job',          loadComponent: () => import('./features/employer/components/create-job/create-job.component').then(m => m.CreateJobComponent) },
    { path: 'edit-job/:id',        loadComponent: () => import('./features/employer/components/edit-job/edit-job.component').then(m => m.EditJobComponent) },
    { path: 'applications',        loadComponent: () => import('./features/employer/components/applications/applications.component').then(m => m.EmployerApplicationsComponent) },
    { path: 'application-details/:id', loadComponent: () => import('./features/employer/components/application-details/application-details.component').then(m => m.ApplicationDetailsComponent) },
    { path: 'upload-documents',    loadComponent: () => import('./features/employer/components/upload-documents/upload-documents.component').then(m => m.UploadDocumentsComponent) },
    { path: 'profile',             loadComponent: () => import('./features/employer/components/profile/profile.component').then(m => m.EmployerProfileComponent) },
    { path: 'notifications',       loadComponent: () => import('./features/employer/components/notifications/notifications.component').then(m => m.EmployerNotificationsComponent) },
  ]},

  // ── Labor Officer ─────────────────────────────────────────────────────────────
  { path: 'labor-officer', component: LayoutComponent, canActivate: [roleGuard(['LaborOfficer'])], children: [
    { path: '',                       redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',              loadComponent: () => import('./features/labor-officer/components/dashboard/dashboard.component').then(m => m.LODashboardComponent) },
    { path: 'document-verifications', loadComponent: () => import('./features/labor-officer/components/document-verifications/document-verifications.component').then(m => m.DocumentVerificationsComponent) },
    { path: 'applications',           loadComponent: () => import('./features/labor-officer/components/applications/applications.component').then(m => m.LOApplicationsComponent) },
    { path: 'audits',                 loadComponent: () => import('./features/labor-officer/components/audits/audits.component').then(m => m.LOAuditsComponent) },
    { path: 'compliance',             loadComponent: () => import('./features/labor-officer/components/compliance/compliance.component').then(m => m.LOComplianceComponent) },
    { path: 'reports',                loadComponent: () => import('./features/labor-officer/components/reports/reports.component').then(m => m.LOReportsComponent) },
  ]},

  // ── Compliance Officer ────────────────────────────────────────────────────────
  { path: 'compliance-officer', component: LayoutComponent, canActivate: [roleGuard(['ComplianceOfficer'])], children: [
    { path: '',                    redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',           loadComponent: () => import('./features/compliance-officer/components/dashboard/dashboard.component').then(m => m.CODashboardComponent) },
    { path: 'employer-review',     loadComponent: () => import('./features/compliance-officer/components/employer-review/employer-review.component').then(m => m.EmployerReviewComponent) },
    { path: 'investigate-complaint', loadComponent: () => import('./features/compliance-officer/components/investigate-complaint/investigate-complaint.component').then(m => m.InvestigateComplaintComponent) },
    { path: 'compliance-reports',  loadComponent: () => import('./features/compliance-officer/components/compliance-reports/compliance-reports.component').then(m => m.COComplianceReportsComponent) },
  ]},

  // ── Government Auditor ───────────────────────────────────────────────────────
  { path: 'gov-auditor', component: LayoutComponent, canActivate: [roleGuard(['GovernmentAuditor'])], children: [
    { path: '',                      redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',             loadComponent: () => import('./features/gov-auditor/components/dashboard/dashboard.component').then(m => m.GADashboardComponent) },
    { path: 'audit-reports',         loadComponent: () => import('./features/gov-auditor/components/audit-reports/audit-reports.component').then(m => m.GAAuditReportsComponent) },
    { path: 'compliance-monitoring', loadComponent: () => import('./features/gov-auditor/components/compliance-monitoring/compliance-monitoring.component').then(m => m.GAComplianceMonitoringComponent) },
    { path: 'workforce-programs',    loadComponent: () => import('./features/gov-auditor/components/workforce-programs/workforce-programs.component').then(m => m.GAWorkforceProgramsComponent) },
    { path: 'alerts',                loadComponent: () => import('./features/gov-auditor/components/alerts/alerts.component').then(m => m.GAAlertsComponent) },
  ]},

  // ── Program Manager ──────────────────────────────────────────────────────────
  { path: 'program-manager', component: LayoutComponent, canActivate: [roleGuard(['ProgramManager'])], children: [
    { path: '',                   redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',          loadComponent: () => import('./features/program-manager/components/dashboard/dashboard.component').then(m => m.PMDashboardComponent) },
    { path: 'program-management', loadComponent: () => import('./features/program-manager/components/program-management/program-management.component').then(m => m.ProgramManagementComponent) },
    { path: 'create-program',     loadComponent: () => import('./features/program-manager/components/create-program/create-program.component').then(m => m.CreateProgramComponent) },
    { path: 'edit-program/:id',   loadComponent: () => import('./features/program-manager/components/edit-program/edit-program.component').then(m => m.EditProgramComponent) },
    { path: 'training-management',loadComponent: () => import('./features/program-manager/components/training-management/training-management.component').then(m => m.TrainingManagementComponent) },
    { path: 'create-training',    loadComponent: () => import('./features/program-manager/components/create-training/create-training.component').then(m => m.CreateTrainingComponent) },
    { path: 'edit-training/:id',  loadComponent: () => import('./features/program-manager/components/edit-training/edit-training.component').then(m => m.EditTrainingComponent) },
    { path: 'benefits',           loadComponent: () => import('./features/program-manager/components/benefits/benefits.component').then(m => m.PMBenefitsComponent) },
    { path: 'assign-benefit',     loadComponent: () => import('./features/program-manager/components/assign-benefit/assign-benefit.component').then(m => m.AssignBenefitComponent) },
    { path: 'resource-management',loadComponent: () => import('./features/program-manager/components/resource-management/resource-management.component').then(m => m.ResourceManagementComponent) },
    { path: 'budget-monitoring',  loadComponent: () => import('./features/program-manager/components/budget-monitoring/budget-monitoring.component').then(m => m.BudgetMonitoringComponent) },
    { path: 'performance-tracking',loadComponent: () => import('./features/program-manager/components/performance-tracking/performance-tracking.component').then(m => m.PerformanceTrackingComponent) },
    { path: 'reports',            loadComponent: () => import('./features/program-manager/components/reports/reports.component').then(m => m.PMReportsComponent) },
  ]},

  { path: '**', redirectTo: 'home' },
];
