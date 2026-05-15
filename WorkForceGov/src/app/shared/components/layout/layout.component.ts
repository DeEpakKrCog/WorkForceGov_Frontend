import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

interface NavItem { label: string; icon: string; route: string; }

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  auth = inject(AuthService);
  sidebarOpen = signal(true);

  navItems = computed<NavItem[]>(() => {
    const role = this.auth.role();
    const map: Record<string, NavItem[]> = {
      SystemAdmin: [
        { label: 'Dashboard',        icon: 'bi-speedometer2',      route: '/admin/dashboard' },
        { label: 'Manage Users',     icon: 'bi-people-fill',       route: '/admin/manage-users' },
        { label: 'Reports',          icon: 'bi-bar-chart-fill',    route: '/admin/reports' },
        { label: 'System Logs',      icon: 'bi-activity',          route: '/admin/system-monitoring' },
      ],
      Citizen: [
        { label: 'Dashboard',        icon: 'bi-speedometer2',      route: '/citizen/dashboard' },
        { label: 'Job Search',       icon: 'bi-search',            route: '/citizen/job-search' },
        { label: 'My Applications',  icon: 'bi-file-earmark-text', route: '/citizen/job-applications' },
        { label: 'Benefits',         icon: 'bi-gift',              route: '/citizen/benefits' },
        { label: 'Trainings',        icon: 'bi-journal-bookmark',  route: '/citizen/trainings' },
        { label: 'Documents',        icon: 'bi-folder2',           route: '/citizen/documents' },
        { label: 'Profile',          icon: 'bi-person-circle',     route: '/citizen/profile' },
        { label: 'Notifications',    icon: 'bi-bell',              route: '/citizen/notifications' },
      ],
      Employer: [
        { label: 'Dashboard',        icon: 'bi-speedometer2',      route: '/employer/dashboard' },
        { label: 'Manage Jobs',      icon: 'bi-briefcase',         route: '/employer/manage-jobs' },
        { label: 'Applications',     icon: 'bi-people',            route: '/employer/applications' },
        { label: 'Upload Documents', icon: 'bi-cloud-upload',      route: '/employer/upload-documents' },
        { label: 'Company Profile',  icon: 'bi-building',          route: '/employer/profile' },
        { label: 'Notifications',    icon: 'bi-bell',              route: '/employer/notifications' },
      ],
      LaborOfficer: [
        { label: 'Dashboard',        icon: 'bi-speedometer2',      route: '/labor-officer/dashboard' },
        { label: 'Doc Verifications',icon: 'bi-shield-check',      route: '/labor-officer/document-verifications' },
        { label: 'Applications',     icon: 'bi-file-text',         route: '/labor-officer/applications' },
        { label: 'Audits',           icon: 'bi-clipboard-data',    route: '/labor-officer/audits' },
        { label: 'Compliance',       icon: 'bi-check-square',      route: '/labor-officer/compliance' },
        { label: 'Reports',          icon: 'bi-bar-chart',         route: '/labor-officer/reports' },
      ],
      ComplianceOfficer: [
        { label: 'Dashboard',        icon: 'bi-speedometer2',      route: '/compliance-officer/dashboard' },
        { label: 'Employer Review',  icon: 'bi-building',          route: '/compliance-officer/employer-review' },
        { label: 'Complaints',       icon: 'bi-chat-square-text',  route: '/compliance-officer/investigate-complaint' },
        { label: 'Reports',          icon: 'bi-bar-chart',         route: '/compliance-officer/compliance-reports' },
      ],
      GovernmentAuditor: [
        { label: 'Dashboard',        icon: 'bi-speedometer2',      route: '/gov-auditor/dashboard' },
        { label: 'Audit Reports',    icon: 'bi-clipboard-data',    route: '/gov-auditor/audit-reports' },
        { label: 'Compliance',       icon: 'bi-shield-check',      route: '/gov-auditor/compliance-monitoring' },
        { label: 'Programs',         icon: 'bi-diagram-3',         route: '/gov-auditor/workforce-programs' },
        { label: 'Alerts',           icon: 'bi-bell',              route: '/gov-auditor/alerts' },
      ],
      ProgramManager: [
        { label: 'Dashboard',        icon: 'bi-speedometer2',      route: '/program-manager/dashboard' },
        { label: 'Programs',         icon: 'bi-kanban',            route: '/program-manager/program-management' },
        { label: 'Trainings',        icon: 'bi-mortarboard',       route: '/program-manager/training-management' },
        { label: 'Benefits',         icon: 'bi-gift',              route: '/program-manager/benefits' },
        { label: 'Budget Monitor',   icon: 'bi-wallet2',           route: '/program-manager/budget-monitoring' },
        
      ],
    };
    return map[role] ?? [];
  });

  toggleSidebar() { this.sidebarOpen.update(v => !v); }
  logout() { this.auth.logout(); }
}
