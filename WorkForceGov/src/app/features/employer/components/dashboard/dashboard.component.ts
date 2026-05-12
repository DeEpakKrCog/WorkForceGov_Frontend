import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';
import { EmployerDashboard } from '../../../../core/models/index';
@Component({ selector: 'app-employer-dashboard', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './dashboard.component.html' })
export class EmployerDashboardComponent implements OnInit {
  svc = inject(EmployerService); data: EmployerDashboard | null = null; loading = true;
  ngOnInit() { this.svc.getDashboard().subscribe({ next: d => { this.data = d; this.loading = false; }, error: () => this.loading = false }); }
  statusBadge(s: string) { return s==='Approved'?'bs-success':s==='Rejected'?'bs-danger':s==='Shortlisted'?'bs-info':'bs-warning'; }
}
