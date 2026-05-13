import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CitizenService } from '../../../../core/services/citizen.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Citizen } from '../../../../core/models/index';

@Component({
  selector: 'app-citizen-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html'
})
export class CitizenProfileComponent implements OnInit {
  private svc = inject(CitizenService);
  private fb = inject(FormBuilder);
  
  // Public for template access
  auth = inject(AuthService);

  // State Management via Signals
  loading = signal(false);
  saved = signal(false);
  errorMsg = signal('');
  
  // FIXED: Store the full original profile
  currentProfile: Citizen | null = null; 

  // Form Definition
  form = this.fb.group({
    fullName: ['', [Validators.required]],
    dob: [''],
    gender: [''],
    phoneNumber: [''],
    address: ['']
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.svc.getProfile().subscribe({
      next: (profile: Citizen) => {
        this.currentProfile = profile; // Save the original data
        const formattedProfile = { ...profile };
        if (profile.dob) {
          formattedProfile.dob = new Date(profile.dob).toISOString().split('T')[0] as any;
        }
        this.form.patchValue(formattedProfile as any);
      },
      error: () => this.errorMsg.set('Failed to load profile data.')
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.errorMsg.set('');

    // FIXED: Merge form values with the original profile to retain IDs
    const profileData = { ...this.currentProfile, ...this.form.value };

    this.svc.updateProfile(profileData as Partial<Citizen>).subscribe({
      next: () => {
        this.loading.set(false);
        this.saved.set(true);

        setTimeout(() => this.saved.set(false), 3000);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(err?.error?.message || 'Error saving profile changes.');
      }
    });
  }
}