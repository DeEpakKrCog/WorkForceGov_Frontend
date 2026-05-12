import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitizenService } from '../../../../core/services/citizen.service';
import { Application } from '../../../../core/models/index';

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-applications.component.html'
})
export class JobApplicationsComponent implements OnInit {
  private svc = inject(CitizenService);

  apps: Application[] = [];
  msg = '';
  loading = true;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.svc.getApplications().subscribe({
      next: (data) => {
        this.apps = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  withdraw(id: number): void {
    if (!confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    this.svc.withdrawApplication(id).subscribe({
      next: () => {
        this.msg = 'Application withdrawn successfully.';
        this.load();
      },
      error: () => {
        this.msg = 'Failed to withdraw application. Please try again.';
      }
    });
  }

  statusBadge(status: string): string {
    switch (status) {
      case 'Approved':
        return 'bs-success';
      case 'Rejected':
        return 'bs-danger';
      case 'Withdrawn':
        return 'bs-secondary';
      default:
        return 'bs-warning';
    }
  }
}