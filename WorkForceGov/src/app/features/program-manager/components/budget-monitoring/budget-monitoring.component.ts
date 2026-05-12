import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { EmploymentProgram } from '../../../../core/models/index';
@Component({ selector: 'app-budget-monitoring', standalone: true, imports: [CommonModule], templateUrl: './budget-monitoring.component.html' })
export class BudgetMonitoringComponent implements OnInit {
  svc = inject(ProgramManagerService); programs: EmploymentProgram[] = []; loading = true;
  ngOnInit() { this.svc.getPrograms().subscribe({ next: p => { this.programs = p; this.loading = false; }, error: () => this.loading = false }); }
  get totalBudget() { return this.programs.reduce((s, p) => s + p.totalBudget, 0); }
  pct(p: EmploymentProgram) { return this.totalBudget ? Math.round(p.totalBudget / this.totalBudget * 100) : 0; }
}
