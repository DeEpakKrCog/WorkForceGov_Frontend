import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuditorService } from '../../../../core/services/auditor.service';
import { Audit, Report } from '../../../../core/models/index';
@Component({ selector: 'app-ga-audit-reports', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './audit-reports.component.html' })
export class GAAuditReportsComponent implements OnInit {
  svc = inject(AuditorService); fb = inject(FormBuilder);
  audits: Audit[] = []; reports: Report[] = []; loading = signal(false); msg = signal('');
  statuses = ['Open','InProgress','Completed'];
  form = this.fb.group({ scope: ['', Validators.required], findings: [''], status: ['Open'] });
  ngOnInit() { this.loadAudits(); this.loadReports(); }
  loadAudits() { this.svc.getAudits().subscribe({ next: a => this.audits = a, error: () => {} }); }
  loadReports() { this.svc.getReports().subscribe({ next: r => this.reports = r, error: () => {} }); }
  submit() { if (this.form.invalid) return; this.loading.set(true); this.svc.createAudit(this.form.value as any).subscribe({ next: () => { this.loading.set(false); this.msg.set('Audit created!'); this.form.reset({ status: 'Open' }); this.loadAudits(); }, error: () => { this.loading.set(false); this.msg.set('Error.'); } }); }
  statusBadge(s: string) { return s==='Completed'?'bs-success':s==='Open'?'bs-warning':'bs-info'; }
}
