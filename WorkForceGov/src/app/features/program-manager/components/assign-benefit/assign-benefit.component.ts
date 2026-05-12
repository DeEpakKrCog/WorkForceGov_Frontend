import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { EmploymentProgram } from '../../../../core/models/index';
@Component({ selector: 'app-assign-benefit', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterModule], templateUrl: './assign-benefit.component.html' })
export class AssignBenefitComponent implements OnInit {
  fb = inject(FormBuilder); svc = inject(ProgramManagerService);
  loading = signal(false); msg = signal(''); error = signal(''); programs: EmploymentProgram[] = [];
  benefitTypes = ['Financial Aid','Training Subsidy','Job Placement','Housing Support','Healthcare','Transport Allowance','Other'];
  form = this.fb.group({ citizenId: ['', Validators.required], programId: ['', Validators.required], benefitType: ['', Validators.required], amount: [0, [Validators.required, Validators.min(1)]], description: [''] });
  ngOnInit() { this.svc.getPrograms().subscribe({ next: p => this.programs = p, error: () => {} }); }
  submit() {
    if (this.form.invalid) return; this.loading.set(true); this.error.set('');
    const v = this.form.value;
    this.svc.assignBenefit(Number(v.citizenId), Number(v.programId), v.benefitType!, Number(v.amount), v.description ?? '').subscribe({ next: () => { this.loading.set(false); this.msg.set('Benefit assigned!'); this.form.reset(); }, error: e => { this.loading.set(false); this.error.set(e?.error?.message ?? 'Error.'); } });
  }
}
