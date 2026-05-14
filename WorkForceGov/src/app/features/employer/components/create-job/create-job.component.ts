import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-job.component.html'
})
export class CreateJobComponent {
  // Dependency Injection
  private fb = inject(FormBuilder);
  private svc = inject(EmployerService);
  private router = inject(Router);

  // State Management
  loading = signal(false);
  error = signal('');

  categories = [
    'Information Technology', 'Finance', 'Healthcare', 'Education', 
    'Manufacturing', 'Retail', 'Construction', 'Hospitality', 
    'Agriculture', 'Government', 'Other'
  ];

  // Form Definition
  form = this.fb.group({
    jobTitle: ['', Validators.required],
    location: ['', Validators.required],
    description: ['', Validators.required],
    jobCategory: [''],
    salaryMin: [0],
    salaryMax: [0],
    closingDate: ['']
  });

  /**
   * Handles form submission and API call
   */
  submit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set('');

    this.svc.createJob(this.form.value as any).subscribe({
      next: () => {
        this.router.navigate(['/employer/manage-jobs']);
      },
      error: (e) => {
        this.loading.set(false);
        this.error.set(e?.error?.message ?? 'An error occurred while creating the job.');
      }
    });
  }
}