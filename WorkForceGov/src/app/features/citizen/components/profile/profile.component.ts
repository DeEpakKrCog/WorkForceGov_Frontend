import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CitizenService } from '../../../../core/services/citizen.service';
import { AuthService } from '../../../../core/services/auth.service';

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

  // Form Definition
  form = this.fb.group({
    fullName: [''],
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
      next: (profile) => this.form.patchValue(profile as any),
      error: () => this.errorMsg.set('Failed to load profile data.')
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.errorMsg.set('');

    this.svc.updateProfile(this.form.value as any).subscribe({
      next: () => {
        this.loading.set(false);
        this.saved.set(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => this.saved.set(false), 3000);
      },
      error: () => {
        this.loading.set(false);
        this.errorMsg.set('Error saving profile changes.');
      }
    });
  }
}