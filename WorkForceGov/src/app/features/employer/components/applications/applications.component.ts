import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';
import { Application } from '../../../../core/models/index';
@Component({ selector: 'app-employer-applications', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './applications.component.html' })
export class EmployerApplicationsComponent implements OnInit {
  svc = inject(EmployerService); apps: Application[] = []; loading = true;
  ngOnInit() { this.svc.getApplications().subscribe({ next: a => { this.apps = a; this.loading = false; }, error: () => this.loading = false }); }
  statusBadge(s: string) { return s==='Approved'?'bs-success':s==='Rejected'?'bs-danger':s==='Shortlisted'?'bs-info':'bs-warning'; }
}
