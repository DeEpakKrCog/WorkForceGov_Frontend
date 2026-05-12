import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';
@Component({ selector: 'app-employer-register', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterModule], templateUrl: './register.component.html' })
export class EmployerRegisterComponent {
  fb = inject(FormBuilder); svc = inject(EmployerService); router = inject(Router);
  loading = signal(false); error = signal('');
  industries = ['Information Technology','Manufacturing','Healthcare','Finance','Education','Retail','Construction','Hospitality','Agriculture','Government','Other'];
  form = this.fb.group({ companyName: ['', Validators.required], industry: ['', Validators.required], address: [''], contactInfo: [''] });
  submit() { if (this.form.invalid) return; this.loading.set(true); this.svc.registerEmployer(this.form.value as any).subscribe({ next: () => this.router.navigate(['/employer/upload-documents']), error: e => { this.loading.set(false); this.error.set(e?.error?.message ?? 'Error.'); } }); }
}
