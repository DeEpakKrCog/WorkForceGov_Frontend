import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LaborOfficerService } from '../../../../core/services/labor-officer.service';
import { LaborOfficerDashboard } from '../../../../core/models/index';
@Component({ selector: 'app-lo-dashboard', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './dashboard.component.html' })
export class LODashboardComponent implements OnInit {
  svc = inject(LaborOfficerService); data: LaborOfficerDashboard | null = null; msg = ''; loading = true;
  ngOnInit() { this.load(); }
  load() { this.svc.getDashboard().subscribe({ next: d => { this.data = d; this.loading = false; }, error: () => this.loading = false }); }
  verify(id: number) { this.svc.verifyCitizenDoc(id).subscribe({ next: () => { this.msg = 'Document verified!'; this.load(); }, error: () => {} }); }
  reject(id: number) { this.svc.rejectCitizenDoc(id, 'Does not meet requirements.').subscribe({ next: () => { this.msg = 'Document rejected.'; this.load(); }, error: () => {} }); }
}
