import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { EmploymentProgram } from '../../../../core/models/index';
@Component({ selector: 'app-create-training', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterModule], templateUrl: './create-training.component.html' })
export class CreateTrainingComponent implements OnInit {
  fb = inject(FormBuilder); svc = inject(ProgramManagerService); router = inject(Router);
  loading = signal(false); error = signal(''); programs: EmploymentProgram[] = [];
  form = this.fb.group({ programId: ['', Validators.required], title: ['', Validators.required], description: [''], startDate: ['', Validators.required], endDate: ['', Validators.required] });
  ngOnInit() { this.svc.getPrograms().subscribe({ next: p => this.programs = p, error: () => {} }); }
  submit() { if (this.form.invalid) return; this.loading.set(true); this.svc.createTraining(this.form.value as any).subscribe({ next: () => this.router.navigate(['/program-manager/training-management']), error: e => { this.loading.set(false); this.error.set(e?.error?.message ?? 'Error.'); } }); }
}
