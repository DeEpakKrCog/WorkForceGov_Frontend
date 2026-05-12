import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LaborOfficerService } from '../../../../core/services/labor-officer.service';
import { Report } from '../../../../core/models/index';
@Component({ selector: 'app-lo-reports', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './reports.component.html' })
export class LOReportsComponent implements OnInit {
  svc = inject(LaborOfficerService); fb = inject(FormBuilder);
  reports: Report[] = []; loading = signal(false); msg = signal('');
  types = ['Compliance','Applications','Violations','Audits','Employment'];
  form = this.fb.group({ reportName: ['', Validators.required], reportType: ['', Validators.required] });
  ngOnInit() { this.load(); }
  load() { this.svc.getReports().subscribe({ next: r => this.reports = r, error: () => {} }); }
  submit() { if (this.form.invalid) return; this.loading.set(true); const v = this.form.value; this.svc.generateReport(v.reportName!, v.reportType!).subscribe({ next: () => { this.loading.set(false); this.msg.set('Report generated!'); this.form.reset(); this.load(); }, error: () => { this.loading.set(false); this.msg.set('Error.'); } }); }
}
