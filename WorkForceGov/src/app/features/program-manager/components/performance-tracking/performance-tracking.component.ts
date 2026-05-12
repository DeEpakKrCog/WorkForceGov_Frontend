import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { Benefit, EmploymentProgram, Training } from '../../../../core/models/index';
@Component({ selector: 'app-performance-tracking', standalone: true, imports: [CommonModule], templateUrl: './performance-tracking.component.html' })
export class PerformanceTrackingComponent implements OnInit {
  svc = inject(ProgramManagerService); programs: EmploymentProgram[] = []; trainings: Training[] = []; benefits: Benefit[] = []; loading = true;
  ngOnInit() {
    this.svc.getPrograms().subscribe({ next: p => { this.programs = p; this.loading = false; }, error: () => this.loading = false });
    this.svc.getTrainings().subscribe({ next: t => this.trainings = t, error: () => {} });
    this.svc.getBenefits().subscribe({ next: b => this.benefits = b, error: () => {} });
  }
  get activePrograms() { return this.programs.filter(p => p.status === 'Active').length; }
  get totalBudget() { return this.programs.reduce((s, p) => s + p.totalBudget, 0); }
  get uniqueBeneficiaries() { return new Set(this.benefits.map(b => b.citizenId)).size; }
}
