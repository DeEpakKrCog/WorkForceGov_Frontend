import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuditorService } from '../../../../core/services/auditor.service';
import { Audit, Report } from '../../../../core/models/index';

@Component({
  selector: 'app-ga-audit-reports',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './audit-reports.component.html'
})
export class GAAuditReportsComponent implements OnInit {
  svc = inject(AuditorService);
  fb = inject(FormBuilder);

  // State
  audits: Audit[] = [];
  reports: Report[] = [];
  loading = signal(false);
  msg = signal('');
  statuses = ['Open', 'InProgress', 'Completed'];

  // Form Definition
  form = this.fb.group({
    scope: ['', Validators.required],
    findings: [''],
    status: ['Open']
  });

  ngOnInit(): void {
    this.loadAudits();
    this.loadReports();
  }

  loadAudits(): void {
    this.svc.getAudits().subscribe({
      next: (a) => this.audits = a,
      error: (err) => console.error('Error loading audits:', err)
    });
  }

  loadReports(): void {
    this.svc.getReports().subscribe({
      next: (r) => this.reports = r,
      error: (err) => console.error('Error loading reports:', err)
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    
    this.loading.set(true);
    
    this.svc.createAudit(this.form.value as any).subscribe({
      next: () => {
        this.loading.set(false);
        this.msg.set('Audit created successfully!');
        this.form.reset({ status: 'Open' });
        this.loadAudits();
      },
      error: (err) => {
        this.loading.set(false);
        this.msg.set('Error creating audit.');
        console.error(err);
      }
    });
  }

  statusBadge(s: string): string {
    switch (s) {
      case 'Completed':
        return 'bs-success';
      case 'Open':
        return 'bs-warning';
      default:
        return 'bs-info'; // Used for InProgress or any other status
    }
  }
}