import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplianceService } from '../../../../core/services/compliance.service';
import { Employer } from '../../../../core/models/index';
@Component({ selector: 'app-employer-review', standalone: true, imports: [CommonModule], templateUrl: './employer-review.component.html' })
export class EmployerReviewComponent implements OnInit {
  svc = inject(ComplianceService); employers: Employer[] = []; loading = true;
  ngOnInit() { this.svc.getEmployers().subscribe({ next: e => { this.employers = e; this.loading = false; }, error: () => this.loading = false }); }
  statusBadge(s: string) { return s==='Verified'?'bs-success':s==='Suspended'?'bs-danger':s==='Flagged'?'bs-warning':'bs-info'; }
}
