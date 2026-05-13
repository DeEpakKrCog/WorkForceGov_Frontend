import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';
import { AdminDashboard } from '../../../../core/models/index';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ],
  templateUrl: './dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  // Dependency Injection
  private svc = inject(AdminService);

  // State Properties
  data: AdminDashboard | null = null;
  loading = true;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.svc.getDashboard().subscribe({
      next: (d) => {
        this.data = d;
        this.loading = false;
      },
      error: (err) => {
        console.error('Dashboard Load Error:', err);
        this.loading = false;
      }
    });
  }
}