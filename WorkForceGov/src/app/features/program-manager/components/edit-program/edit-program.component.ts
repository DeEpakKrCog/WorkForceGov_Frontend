import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
@Component({ selector: 'app-edit-program', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterModule], templateUrl: './edit-program.component.html' })
export class EditProgramComponent implements OnInit {
  fb = inject(FormBuilder); svc = inject(ProgramManagerService); router = inject(Router); route = inject(ActivatedRoute);
  loading = signal(false); error = signal(''); id = 0;
  types = ['Employment','Training','Benefits','Rehabilitation','Placement','Reintegration'];
  form = this.fb.group({ programName: ['', Validators.required], programType: [''], description: [''], startDate: [''], endDate: [''], totalBudget: [0], status: ['Active'] });
  ngOnInit() { this.id = Number(this.route.snapshot.paramMap.get('id')); this.svc.getProgram(this.id).subscribe({ next: p => this.form.patchValue(p as any), error: () => {} }); }
  submit() { if (this.form.invalid) return; this.loading.set(true); this.svc.updateProgram(this.id, this.form.value as any).subscribe({ next: () => this.router.navigate(['/program-manager/program-management']), error: e => { this.loading.set(false); this.error.set(e?.error?.message ?? 'Error.'); } }); }
}
