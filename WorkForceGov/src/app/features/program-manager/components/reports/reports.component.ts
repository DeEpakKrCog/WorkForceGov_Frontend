import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { Report } from '../../../../core/models/index';
@Component({ selector: 'app-pm-reports', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './reports.component.html' })
export class PMReportsComponent implements OnInit {
  fb = inject(FormBuilder); svc = inject(ProgramManagerService);
  reports: Report[] = []; loading = signal(false); msg = signal('');
  types = ['Program','Training','Benefits','Budget','Performance','Enrollment'];
  form = this.fb.group({ reportName: ['', Validators.required], reportType: ['', Validators.required] });
  ngOnInit() { this.load(); }
  load() { this.svc.getReports().subscribe({ next: r => this.reports = r, error: () => {} }); }
  submit() { if (this.form.invalid) return; this.loading.set(true); const v = this.form.value; this.svc.generateReport(v.reportName!, v.reportType!).subscribe({ next: () => { this.loading.set(false); this.msg.set('Report generated!'); this.form.reset(); this.load(); }, error: () => { this.loading.set(false); this.msg.set('Error.'); } }); }
}
