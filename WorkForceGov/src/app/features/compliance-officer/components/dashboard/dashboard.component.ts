import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComplianceService } from '../../../../core/services/compliance.service';
import { ComplianceDashboard } from '../../../../core/models/index';
@Component({ selector: 'app-co-dashboard', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './dashboard.component.html' })
export class CODashboardComponent implements OnInit {
  svc = inject(ComplianceService); data: ComplianceDashboard | null = null; loading = true;
  ngOnInit() { this.svc.getDashboard().subscribe({ next: d => { this.data = d; this.loading = false; }, error: () => this.loading = false }); }
  resultBadge(r: string) { return r==='Compliant'?'bs-success':r==='Non-Compliant'?'bs-danger':'bs-warning'; }
  statusBadge(s: string) { return s==='Resolved'?'bs-success':s==='Open'?'bs-danger':'bs-warning'; }
}
