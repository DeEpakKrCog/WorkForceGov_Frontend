import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../../core/services/admin.service';
import { Report } from '../../../../core/models/index';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reports.component.html'
})
export class AdminReportsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private svc = inject(AdminService);

  reports: Report[] = [];
  loading = signal(false);
  downloadingId = signal<number | null>(null);
  msg = signal('');

  types = ['UserActivity', 'Compliance', 'Employment', 'Audit', 'Financial'];

  // ADDED DATE CONTROLS TO FORM
  form = this.fb.group({
    reportName: ['', [Validators.required]],
    reportType: ['', [Validators.required]],
    startDate: [''],
    endDate: ['']
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.svc.getReports().subscribe({
      next: (r) => (this.reports = r),
      error: (err) => console.error('Failed to load reports', err)
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.msg.set('');

    const { reportName, reportType, startDate, endDate } = this.form.value;

    // Passing the new date variables
    this.svc.generateReport(reportName!, reportType!, startDate!, endDate!).subscribe({
      next: () => {
        this.loading.set(false);
        this.msg.set('Report generated successfully!');
        // Keep the type and dates, just reset the name for convenience
        this.form.patchValue({ reportName: '' }); 
        this.load();
      },
      error: (err) => {
        this.loading.set(false);
        this.msg.set('Error generating report.');
        console.error(err);
      }
    });
  }

  download(report: Report): void {
    if (!report.id) return;
    
    this.downloadingId.set(report.id);
    
    this.svc.downloadReport(report.id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${report.reportName.replace(/\s+/g, '_')}_${new Date().getTime()}.csv`;
        
        a.click();
        
        window.URL.revokeObjectURL(url);
        this.downloadingId.set(null);
      },
      error: (err) => {
        console.error('Download failed', err);
        this.msg.set('Failed to download report.');
        this.downloadingId.set(null);
      }
    });
  }
}