import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuditorService } from '../../../../core/services/auditor.service';
import { AuditorDashboard } from '../../../../core/models/index';
@Component({ selector: 'app-ga-dashboard', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './dashboard.component.html' })
export class GADashboardComponent implements OnInit {
  svc = inject(AuditorService); data: AuditorDashboard | null = null; loading = true;
  ngOnInit() { this.svc.getDashboard().subscribe({ next: d => { this.data = d; this.loading = false; }, error: () => this.loading = false }); }
  statusBadge(s: string) { return s==='Completed'?'bs-success':s==='Open'?'bs-warning':'bs-info'; }
}
