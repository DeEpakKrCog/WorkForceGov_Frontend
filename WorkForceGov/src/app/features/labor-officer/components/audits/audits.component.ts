import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaborOfficerService } from '../../../../core/services/labor-officer.service';
import { Audit } from '../../../../core/models/index';
@Component({ selector: 'app-lo-audits', standalone: true, imports: [CommonModule], templateUrl: './audits.component.html' })
export class LOAuditsComponent implements OnInit {
  svc = inject(LaborOfficerService); audits: Audit[] = []; loading = true;
  ngOnInit() { this.svc.getAudits().subscribe({ next: a => { this.audits = a; this.loading = false; }, error: () => this.loading = false }); }
  statusBadge(s: string) { return s==='Completed'?'bs-success':s==='Open'?'bs-warning':'bs-info'; }
}
