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

  isNewProfile = false;
  fullProfile: any = {};

  industries = [
    'Information Technology', 'Manufacturing', 'Healthcare', 'Finance', 
    'Education', 'Retail', 'Construction', 'Hospitality', 
    'Agriculture', 'Government', 'Other'
  ];

  form = this.fb.group({
    companyName: [''],
    industry: [''],
    contactInfo: [''], // 👈 Added ContactInfo field for the email
    address: [''],
    phoneNumber: [''], 
    website: [''],     
    description: ['']  
  });

  ngOnInit(): void {
    this.svc.getProfile().subscribe({
      next: (p) => {
        if (p) {
          this.fullProfile = p; 
          this.form.patchValue(p as any);
          this.isNewProfile = false;
        }
      },
      error: (err: any) => { 
        if (err.status === 404 || err.status === 204) {
          console.log('New employer detected. Form ready for fresh data.');
          this.isNewProfile = true;
        } else {
          console.error('Failed to load profile:', err);
        }
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    
    const payload = {
      ...this.fullProfile,
      ...this.form.value
    };

    if (this.isNewProfile) {
      
      this.svc.registerEmployer(payload).subscribe({
        next: (res: any) => { 
          this.loading.set(false);
          this.saved.set(true);
          this.isNewProfile = false; 
          
          if (res.employer) {
             this.fullProfile = res.employer; 
          }
          
          setTimeout(() => this.saved.set(false), 3000);
        },
        error: (err: any) => { 
          this.loading.set(false);
          console.error('Registration failed:', err);
        }
      });

    } else {
      
      this.svc.updateProfile(payload).subscribe({
        next: () => {
          this.loading.set(false);
          this.saved.set(true);
          setTimeout(() => this.saved.set(false), 3000);
        },
        error: (err: any) => { 
          this.loading.set(false);
          console.error('Update failed:', err);
        }
      });
      
    }
  }
}