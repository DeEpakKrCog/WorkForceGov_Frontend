import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';

@Component({
  selector: 'app-employer-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class EmployerRegisterComponent {
  // Dependency Injection
  private fb = inject(FormBuilder);
  private svc = inject(EmployerService);
  private router = inject(Router);

  // State Management Signals
  loading = signal(false);
  error = signal('');

  // Domain Data
  industries = [
    'Information Technology', 'Manufacturing', 'Healthcare', 'Finance',
    'Education', 'Retail', 'Construction', 'Hospitality',
    'Agriculture', 'Government', 'Other'
  ];

  // Form Configuration
  form = this.fb.group({
    companyName: ['', Validators.required],
    industry: ['', Validators.required],
    address: [''],
    contactInfo: ['']
  });

  /**
   * Handles company registration submission.
   * On success, navigates to the document upload stage for verification.
   */
  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.svc.registerEmployer(this.form.value as any).subscribe({
      next: () => {
        // Redirect to the next step in the onboarding process
        this.router.navigate(['/employer/upload-documents']);
      },
      error: (e) => {
        this.loading.set(false);
        this.error.set(e?.error?.message ?? 'An error occurred during registration.');
      }
    });
  }
}