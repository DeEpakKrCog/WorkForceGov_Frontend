import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-job.component.html'
})
export class EditJobComponent implements OnInit {
  // Dependencies
  private fb = inject(FormBuilder);
  private svc = inject(EmployerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // State Management
  loading = signal(false);
  error = signal('');
  id = 0;

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
    salaryMax: [0]
  });

  ngOnInit() { 
  this.id = Number(this.route.snapshot.paramMap.get('id')); 
  this.svc.getJob(this.id).subscribe({ 
    next: j => this.form.patchValue(j as any), 
    error: (err) => {
      console.error("Backend Error:", err); // This will show 404 or 401 in the console
      this.error.set('Could not load the requested job posting.');
    } 
  }); 
  }

  /**
   * Submits the updated form data to the EmployerService
   */
  submit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set('');

    this.svc.updateJob(this.id, this.form.value as any).subscribe({
      next: () => {
        this.router.navigate(['/employer/manage-jobs']);
      },
      error: (e) => {
        this.loading.set(false);
        this.error.set(e?.error?.message ?? 'An error occurred while updating the job.');
      }
    });
  }
}