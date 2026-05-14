import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';
import { Application } from '../../../../core/models/index';

@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './application-details.component.html'
})
export class ApplicationDetailsComponent implements OnInit {
  // Services
  private svc = inject(EmployerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // State
  app: Application | null = null;
  msg = signal('');
  err = signal('');
  loading = true;
  id = 0;

  // NEW: Signal to track if the resume has been opened
  resumeViewed = signal(false);

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.reload();
  }

  // NEW: Method called when clicking the "View Resume" link
  markResumeAsViewed(): void {
    this.resumeViewed.set(true);
  }

  reload(): void {
    this.svc.getApplication(this.id).subscribe({
      next: (a) => {
        this.app = a;
        this.loading = false;
        // Optional: If the status is already beyond 'Pending', 
        // you might want to auto-enable the buttons.
        if (a.status !== 'Pending') {
          this.resumeViewed.set(true);
        }
      },
      error: () => {
        this.loading = false;
        this.err.set('Failed to load application data.');
      }
    });
  }

  update(status: string, notes: string): void {
    // Extra safety check: Prevent update if resume hasn't been viewed
    if (!this.resumeViewed()) {
      this.err.set('You must review the resume before updating the application status.');
      return;
    }

    this.svc.updateApplication(this.id, status, notes).subscribe({
      next: () => {
        this.msg.set(`Application ${status.toLowerCase()}!`);
        this.reload();
      },
      error: (e) => {
        this.err.set(e?.error?.message ?? 'An error occurred during status update.');
      }
    });
  }

  statusBadge(s: string): string {
    const badges: Record<string, string> = {
      'Approved': 'bs-success',
      'Rejected': 'bs-danger',
      'Shortlisted': 'bs-info',
      'Reviewed': 'bs-info',
      'Pending': 'bs-warning'
    };
    return badges[s] || 'bs-secondary';
  }
}