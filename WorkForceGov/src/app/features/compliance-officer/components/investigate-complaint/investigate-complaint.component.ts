import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplianceService } from '../../../../core/services/compliance.service';
import { Complaint } from '../../../../core/models/index';
@Component({ selector: 'app-investigate-complaint', standalone: true, imports: [CommonModule], templateUrl: './investigate-complaint.component.html' })
export class InvestigateComplaintComponent implements OnInit {
  svc = inject(ComplianceService); complaints: Complaint[] = []; msg = ''; loading = true;
  ngOnInit() { this.load(); }
  load() { this.svc.getComplaints().subscribe({ next: c => { this.complaints = c; this.loading = false; }, error: () => this.loading = false }); }
  resolve(id: number) {
    const resolution = prompt('Enter resolution notes:');
    if (!resolution) return;
    this.svc.resolveComplaint(id, resolution).subscribe({ next: () => { this.msg = 'Complaint resolved!'; this.load(); }, error: () => this.msg = 'Error.' });
  }
  statusBadge(s: string) { return s==='Resolved'?'bs-success':s==='Open'?'bs-danger':'bs-warning'; }
}
