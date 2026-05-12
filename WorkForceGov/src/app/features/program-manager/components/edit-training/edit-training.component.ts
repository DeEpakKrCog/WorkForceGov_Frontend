import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { EmploymentProgram } from '../../../../core/models/index';
@Component({ selector: 'app-edit-training', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterModule], templateUrl: './edit-training.component.html' })
export class EditTrainingComponent implements OnInit {
  fb = inject(FormBuilder); svc = inject(ProgramManagerService); router = inject(Router); route = inject(ActivatedRoute);
  loading = signal(false); error = signal(''); id = 0; programs: EmploymentProgram[] = [];
  form = this.fb.group({ programId: ['', Validators.required], title: ['', Validators.required], description: [''], startDate: ['', Validators.required], endDate: ['', Validators.required] });
  ngOnInit() { this.id = Number(this.route.snapshot.paramMap.get('id')); this.svc.getPrograms().subscribe({ next: p => this.programs = p, error: () => {} }); this.svc.getTraining(this.id).subscribe({ next: t => this.form.patchValue(t as any), error: () => {} }); }
  submit() { if (this.form.invalid) return; this.loading.set(true); this.svc.updateTraining(this.id, this.form.value as any).subscribe({ next: () => this.router.navigate(['/program-manager/training-management']), error: e => { this.loading.set(false); this.error.set(e?.error?.message ?? 'Error.'); } }); }
}
