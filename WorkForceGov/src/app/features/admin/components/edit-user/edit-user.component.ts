import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  // Dependency Injection
  private fb = inject(FormBuilder);
  private svc = inject(AdminService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // State Management
  loading = signal(false);
  error = signal('');
  id = 0;

  // Options Arrays
  roles = [
    'Citizen', 
    'Employer', 
    'LaborOfficer', 
    'ComplianceOfficer', 
    'GovernmentAuditor', 
    'ProgramManager', 
    'SystemAdmin'
  ];
  
  statuses = ['Active', 'Inactive'];

  // Form Definition
  form = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [''], // Optional on edit
    role: [''],
    status: ['Active'],
    phone: ['']
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUserData();
  }

  private loadUserData(): void {
    this.svc.getUserById(this.id).subscribe({
      next: (user) => {
        // PatchValue only fills fields that exist in the form
        this.form.patchValue(user as any);
      },
      error: (err) => {
        this.error.set('Failed to load user data.');
        console.error(err);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set('');

    this.svc.updateUser(this.id, this.form.value as any).subscribe({
      next: () => {
        this.router.navigate(['/admin/manage-users']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? 'An error occurred while updating the user.');
      }
    });
  }
}