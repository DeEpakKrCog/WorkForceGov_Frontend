import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditorService } from '../../../../core/services/auditor.service';
import { ComplianceRecord } from '../../../../core/models/index';
@Component({ selector: 'app-ga-compliance-monitoring', standalone: true, imports: [CommonModule], templateUrl: './compliance-monitoring.component.html' })
export class GAComplianceMonitoringComponent implements OnInit {
  svc = inject(AuditorService); records: ComplianceRecord[] = []; loading = true;
  ngOnInit() { this.svc.getCompliance().subscribe({ next: r => { this.records = r; this.loading = false; }, error: () => this.loading = false }); }
  resultBadge(r: string) { return r==='Compliant'?'bs-success':r==='Non-Compliant'?'bs-danger':'bs-warning'; }
  get compliantCount() { return this.records.filter(r => r.result === 'Compliant').length; }
  get nonCompliantCount() { return this.records.filter(r => r.result === 'Non-Compliant').length; }
}
