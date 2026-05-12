import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EmployerService } from '../../../../core/services/employer.service';
@Component({ selector: 'app-employer-profile', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './profile.component.html' })
export class EmployerProfileComponent implements OnInit {
  svc = inject(EmployerService); fb = inject(FormBuilder);
  loading = signal(false); saved = signal(false);
  industries = ['Information Technology','Manufacturing','Healthcare','Finance','Education','Retail','Construction','Hospitality','Agriculture','Government','Other'];
  form = this.fb.group({ companyName: [''], industry: [''], address: [''], contactInfo: [''] });
  ngOnInit() { this.svc.getProfile().subscribe({ next: p => this.form.patchValue(p as any), error: () => {} }); }
  submit() { this.loading.set(true); this.svc.updateProfile(this.form.value as any).subscribe({ next: () => { this.loading.set(false); this.saved.set(true); setTimeout(() => this.saved.set(false), 3000); }, error: () => this.loading.set(false) }); }
}
