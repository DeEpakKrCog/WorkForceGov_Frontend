import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';
@Component({ selector: 'app-edit-user', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterModule], templateUrl: './edit-user.component.html' })
export class EditUserComponent implements OnInit {
  fb = inject(FormBuilder); svc = inject(AdminService); router = inject(Router); route = inject(ActivatedRoute);
  loading = signal(false); error = signal(''); id = 0;
  roles = ['Citizen','Employer','LaborOfficer','ComplianceOfficer','GovernmentAuditor','ProgramManager','SystemAdmin'];
  statuses = ['Active','Inactive'];
  form = this.fb.group({ fullName: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: [''], role: [''], status: ['Active'], phone: [''] });
  ngOnInit() { this.id = Number(this.route.snapshot.paramMap.get('id')); this.svc.getUserById(this.id).subscribe({ next: u => this.form.patchValue(u as any), error: () => {} }); }
  submit() { if (this.form.invalid) return; this.loading.set(true); this.svc.updateUser(this.id, this.form.value as any).subscribe({ next: () => this.router.navigate(['/admin/manage-users']), error: e => { this.loading.set(false); this.error.set(e?.error?.message ?? 'Error.'); } }); }
}
