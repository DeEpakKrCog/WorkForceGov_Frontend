import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeService, PublicJob } from '../../services/home.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private homeService = inject(HomeService);
  auth = inject(AuthService);

  jobs: PublicJob[] = [];

  roles = [
    { icon: 'bi-person-badge',    title: 'Citizen / Job Seeker',   desc: 'Search and apply for jobs, track applications, receive benefits and enrol in government training programs.', color: '#0ea5e9' },
    { icon: 'bi-building',        title: 'Employer',               desc: 'Post job openings, review applications, shortlist and hire candidates through a verified employer portal.', color: '#8b5cf6' },
    { icon: 'bi-shield-lock',     title: 'System Administrator',   desc: 'Manage all platform users, generate reports, and monitor system health and activity logs.', color: '#ef4444' },
    { icon: 'bi-file-earmark-check', title: 'Labor Officer',       desc: 'Verify citizen and employer documents, review applications, and conduct compliance audits.', color: '#f59e0b' },
    { icon: 'bi-clipboard2-check',title: 'Compliance Officer',     desc: 'Review employer compliance, investigate complaints, and record violations to ensure regulatory adherence.', color: '#10b981' },
    { icon: 'bi-eye',             title: 'Government Auditor',     desc: 'Audit workforce programs, monitor compliance, and review fund distribution across all programs.', color: '#6366f1' },
    { icon: 'bi-kanban',          title: 'Program Manager',        desc: 'Create and manage employment programs, assign benefits, monitor budgets and track performance.', color: '#ec4899' },
  ];

  stats = [
    { value: '7', label: 'Modules', color: '#0ea5e9' },
    { value: '24/7', label: 'Availability', color: '#8b5cf6' },
    { value: '100%', label: 'Secure', color: '#10b981' },
    { value: 'Real-time', label: 'Data', color: '#f59e0b' },
  ];

  ngOnInit() {
    this.homeService.getRecentJobs().subscribe({ next: j => this.jobs = j.slice(0, 6), error: () => {} });
  }
}
