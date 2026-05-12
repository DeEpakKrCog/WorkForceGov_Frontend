import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { ProgramManagerDashboard } from '../../../../core/models/index';
@Component({ selector: 'app-pm-dashboard', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './dashboard.component.html' })
export class PMDashboardComponent implements OnInit {
  svc = inject(ProgramManagerService); data: ProgramManagerDashboard | null = null; loading = true;
  ngOnInit() { this.svc.getDashboard().subscribe({ next: d => { this.data = d; this.loading = false; }, error: () => this.loading = false }); }
  get budgetPct() { if (!this.data || !this.data.totalBudget) return 0; return Math.min(100, Math.round((this.data.budgetUtilized / this.data.totalBudget) * 100)); }
}
