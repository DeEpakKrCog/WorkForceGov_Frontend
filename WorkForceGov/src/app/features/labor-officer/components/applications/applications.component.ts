import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaborOfficerService } from '../../../../core/services/labor-officer.service';
import { Application } from '../../../../core/models/index';
@Component({ selector: 'app-lo-applications', standalone: true, imports: [CommonModule], templateUrl: './applications.component.html' })
export class LOApplicationsComponent implements OnInit {
  svc = inject(LaborOfficerService); apps: Application[] = []; msg = ''; loading = true;
  ngOnInit() { this.load(); }
  load() { this.svc.getApplications().subscribe({ next: a => { this.apps = a; this.loading = false; }, error: () => this.loading = false }); }
  approve(id: number) { this.svc.approveApplication(id).subscribe({ next: () => { this.msg = 'Approved!'; this.load(); }, error: () => {} }); }
  reject(id: number) { this.svc.rejectApplication(id, 'Rejected by Labor Officer.').subscribe({ next: () => { this.msg = 'Rejected.'; this.load(); }, error: () => {} }); }
  statusBadge(s: string) { return s==='Approved'?'bs-success':s==='Rejected'?'bs-danger':s==='Shortlisted'?'bs-info':'bs-warning'; }
}
