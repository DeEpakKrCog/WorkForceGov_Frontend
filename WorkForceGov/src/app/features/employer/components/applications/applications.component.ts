import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';
import { Application } from '../../../../core/models/index';

@Component({
  selector: 'app-employer-applications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './applications.component.html'
})
export class EmployerApplicationsComponent implements OnInit {
  // Dependency Injection
  private svc = inject(EmployerService);

  // State Properties
  apps: Application[] = [];
  loading = true;

  ngOnInit(): void {
    this.svc.getApplications().subscribe({
      next: (a) => {
        this.apps = a;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load applications:', err);
        this.loading = false;
      }
    });
  }

  /**
   * Returns CSS class for application status badges
   */
  statusBadge(s: string): string {
    const statusMap: Record<string, string> = {
      'Approved': 'bs-success',
      'Rejected': 'bs-danger',
      'Shortlisted': 'bs-info'
    };
    return statusMap[s] || 'bs-warning';
  }
}