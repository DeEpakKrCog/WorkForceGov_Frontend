import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { Benefit } from '../../../../core/models/index';
@Component({ selector: 'app-pm-benefits', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './benefits.component.html' })
export class PMBenefitsComponent implements OnInit {
  svc = inject(ProgramManagerService); benefits: Benefit[] = []; msg = ''; loading = true;
  ngOnInit() { this.load(); }
  load() { this.svc.getBenefits().subscribe({ next: b => { this.benefits = b; this.loading = false; }, error: () => this.loading = false }); }
  approve(id: number) { const amt = prompt('Enter approved amount ($):'); if (!amt) return; this.svc.approveBenefit(id, Number(amt)).subscribe({ next: () => { this.msg = 'Benefit approved!'; this.load(); }, error: () => this.msg = 'Error.' }); }
  reject(id: number) { this.svc.rejectBenefit(id).subscribe({ next: () => { this.msg = 'Rejected.'; this.load(); }, error: () => {} }); }
  statusBadge(s: string) { return s==='Active'?'bs-success':s==='Pending'?'bs-warning':s==='Rejected'?'bs-danger':'bs-secondary'; }
}
