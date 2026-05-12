import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaborOfficerService } from '../../../../core/services/labor-officer.service';
import { ComplianceRecord } from '../../../../core/models/index';
@Component({ selector: 'app-lo-compliance', standalone: true, imports: [CommonModule], templateUrl: './compliance.component.html' })
export class LOComplianceComponent implements OnInit {
  svc = inject(LaborOfficerService); records: ComplianceRecord[] = []; loading = true;
  ngOnInit() { this.svc.getCompliance().subscribe({ next: r => { this.records = r; this.loading = false; }, error: () => this.loading = false }); }
  resultBadge(r: string) { return r==='Compliant'?'bs-success':r==='Non-Compliant'?'bs-danger':'bs-warning'; }
}
