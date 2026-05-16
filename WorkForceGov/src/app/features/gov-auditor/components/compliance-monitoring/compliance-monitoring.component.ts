import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditorService } from '../../../../core/services/auditor.service';
import { ComplianceRecord } from '../../../../core/models/index';

@Component({
  selector: 'app-ga-compliance-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compliance-monitoring.component.html'
})
export class GAComplianceMonitoringComponent implements OnInit {
  svc = inject(AuditorService);
  
  records: ComplianceRecord[] = [];
  loading = true;

  ngOnInit(): void {
    this.svc.getCompliance().subscribe({
      next: (r) => {
        this.records = r;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load compliance records', err);
        this.loading = false;
      }
    });
  }

  resultBadge(r: string): string {
    switch (r) {
      case 'Compliant':
        return 'bs-success';
      case 'Non-Compliant':
        return 'bs-danger';
      default:
        return 'bs-warning';
    }
  }

  get compliantCount(): number {
    return this.records.filter(r => r.result === 'Compliant').length;
  }

  get nonCompliantCount(): number {
    return this.records.filter(r => r.result === 'Non-Compliant').length;
  }
}