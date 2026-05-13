import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent {
  // Dependency Injection
  private fb = inject(FormBuilder);
  private svc = inject(AdminService);
  private router = inject(Router);

  // State Management
  loading = signal(false);
  error = signal('');

  roles = [
    'Citizen', 
    'Employer', 
    'LaborOfficer', 
    'ComplianceOfficer', 
    'GovernmentAuditor', 
    'ProgramManager', 
    'SystemAdmin'
  ];

  // Form Initialization
  form = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['Citizen'],
    phone: ['']
  });

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.svc.createUser(this.form.value as any).subscribe({
      next: () => {
        this.router.navigate(['/admin/manage-users']);
      },
      error: (e) => {
        this.loading.set(false);
        this.error.set(e?.error?.message ?? 'An error occurred while creating the user.');
      }
    });
  }
}