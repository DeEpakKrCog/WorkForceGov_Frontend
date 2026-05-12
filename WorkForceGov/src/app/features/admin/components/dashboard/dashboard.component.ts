import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';
import { AdminDashboard } from '../../../../core/models/index';
@Component({ selector: 'app-admin-dashboard', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './dashboard.component.html' })
export class AdminDashboardComponent implements OnInit {
  svc = inject(AdminService); data: AdminDashboard | null = null; loading = true;
  ngOnInit() { this.svc.getDashboard().subscribe({ next: d => { this.data = d; this.loading = false; }, error: () => this.loading = false }); }
}
