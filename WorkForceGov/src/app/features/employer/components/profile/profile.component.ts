import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EmployerService } from '../../../../core/services/employer.service';

@Component({
  selector: 'app-employer-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html'
})
export class EmployerProfileComponent implements OnInit {
  private svc = inject(EmployerService);
  private fb = inject(FormBuilder);

  loading = signal(false);
  saved = signal(false);

  // 1. ADD THIS: Create a variable to store the original full profile
  fullProfile: any = {};

  industries = [
    'Information Technology', 'Manufacturing', 'Healthcare', 'Finance', 
    'Education', 'Retail', 'Construction', 'Hospitality', 
    'Agriculture', 'Government', 'Other'
  ];

  form = this.fb.group({
    companyName: [''],
    industry: [''],
    address: [''],
    phoneNumber: [''], 
    website: [''],     
    description: ['']  
  });

  ngOnInit(): void {
    this.svc.getProfile().subscribe({
      next: (p) => {
        // 2. ADD THIS: Save the complete profile (including Id, Status, etc.)
        this.fullProfile = p; 
        
        this.form.patchValue(p as any);
      },
      error: (err) => console.error('Failed to load profile:', err)
    });
  }

  submit(): void {
    this.loading.set(true);
    
    // 3. ADD THIS: Merge the full profile with the updated form values
    const payload = {
      ...this.fullProfile,
      ...this.form.value
    };

    // Send the merged payload instead of just the form values
    this.svc.updateProfile(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.saved.set(true);
        setTimeout(() => this.saved.set(false), 3000);
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Update failed:', err);
      }
    });
  }
}