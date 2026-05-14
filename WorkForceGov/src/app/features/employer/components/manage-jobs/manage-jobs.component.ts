import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';
import { JobOpening } from '../../../../core/models/index';

@Component({
  selector: 'app-manage-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-jobs.component.html'
})
export class ManageJobsComponent implements OnInit {
  // Dependency Injection
  private svc = inject(EmployerService);

  // State Properties
  jobs: JobOpening[] = [];
  msg = '';
  loading = true;

  ngOnInit(): void {
    this.load();
  }

  /**
   * Fetches the list of jobs for the current employer
   */
  load(): void {
    this.loading = true;
    this.svc.getJobs().subscribe({
      next: (j) => {
        this.jobs = j;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load jobs:', err);
        this.loading = false;
      }
    });
  }

  /**
   * Closes an active job posting after confirmation
   * @param id The ID of the job opening
   */
  close(id: number): void {
    if (!confirm('Are you sure you want to close this job posting? This action cannot be undone.')) {
      return;
    }

    this.svc.closeJob(id).subscribe({
      next: () => {
        this.msg = 'Job closed successfully.';
        this.load(); // Refresh the list
      },
      error: (err) => {
        console.error('Error closing job:', err);
      }
    });
  }
}