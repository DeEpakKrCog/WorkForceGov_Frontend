import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplianceService } from '../../../../core/services/compliance.service';
import { ComplianceRecord, Report } from '../../../../core/models/index';

@Component({
  selector: 'app-co-compliance-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compliance-reports.component.html',
})
export class COComplianceReportsComponent implements OnInit {
  svc = inject(ComplianceService);
  
  records: ComplianceRecord[] = [];
  reports: Report[] = [];
  loading = true;

  ngOnInit(): void {
    this.svc.getRecords().subscribe({
      next: (r) => {
        this.records = r;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });

    this.svc.getReports().subscribe({
      next: (r) => {
        this.reports = r;
      },
      error: () => {
        // Handle error if needed
      },
    });
  }

  resultBadge(result: string): string {
    if (result === 'Compliant') {
      return 'bs-success';
    } else if (result === 'Non-Compliant') {
      return 'bs-danger';
    } else {
      return 'bs-warning';
    }
  }
}