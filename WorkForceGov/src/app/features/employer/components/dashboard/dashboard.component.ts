import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';
import { EmployerDashboard } from '../../../../core/models/index';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class EmployerDashboardComponent implements OnInit {
  // Dependency Injection
  private svc = inject(EmployerService);

  // State Management
  data: EmployerDashboard | null = null;
  loading = true;
  
  // NEW: Track if the employer has already uploaded documents
  hasUploadedDocs = false; 

  ngOnInit(): void {
    // 1. Fetch dashboard stats
    this.svc.getDashboard().subscribe({
      next: (d) => {
        this.data = d;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard data:', err);
        this.loading = false;
      }
    });

    // 2. NEW: Fetch documents to see if they've uploaded anything yet
    this.svc.getDocuments().subscribe({
      next: (docs) => {
        // If the array has items, set to true
        this.hasUploadedDocs = docs && docs.length > 0;
      },
      error: (err) => console.error('Failed to load documents:', err)
    });
  }

  /**
   * Returns the appropriate CSS class for the status badge
   * @param s The status string
   */
  statusBadge(s: string): string {
    const badgeMap: Record<string, string> = {
      'Approved': 'bs-success',
      'Rejected': 'bs-danger',
      'Shortlisted': 'bs-info'
    };
    return badgeMap[s] || 'bs-warning';
  }
}