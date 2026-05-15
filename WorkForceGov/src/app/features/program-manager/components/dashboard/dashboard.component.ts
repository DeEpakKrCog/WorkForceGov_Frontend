import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { ProgramManagerDashboard } from '../../../../core/models/index';

@Component({
  selector: 'app-pm-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ],
  templateUrl: './dashboard.component.html'
})
export class PMDashboardComponent implements OnInit {
  private svc = inject(ProgramManagerService);
  
  data: ProgramManagerDashboard | null = null;
  loading = true;
  errorMessage: string | null = null; // Added to catch and display API errors

  ngOnInit(): void {
    this.svc.getDashboard().subscribe({
      next: (d) => {
        this.data = d;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        // Capture the error message from the backend response
        this.errorMessage = err.error?.message || err.error?.title || 'Failed to load dashboard data (409 Conflict). Please check if your user profile is fully set up.';
        console.error('Dashboard API Error:', err);
      }
    });
  }

  get budgetPct(): number {
    if (!this.data || !this.data.totalBudget) return 0;
    
    return Math.min(
      100, 
      Math.round((this.data.budgetUtilized / this.data.totalBudget) * 100)
    );
  }
}