import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { EmploymentProgram } from '../../../../core/models/index';

@Component({
  selector: 'app-create-training',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule
  ],
  templateUrl: './create-training.component.html'
})
export class CreateTrainingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private svc = inject(ProgramManagerService);
  private router = inject(Router);

  // Signals for state management
  loading = signal(false);
  error = signal('');
  
  programs: EmploymentProgram[] = [];

  form = this.fb.group({
    programId: ['', Validators.required],
    title: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });

  ngOnInit(): void {
    this.svc.getPrograms().subscribe({
      next: (p) => {
        this.programs = p;
      },
      error: (e) => {
        console.error('Failed to load programs', e);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.error.set('Please fill out all required fields correctly.');
      return;
    }
    
    this.loading.set(true);
    this.error.set(''); // Clear any previous errors

    // Get raw form values
    const rawData = this.form.value;

    // 🚨 FIX: Force programId to be a Number so C# model binding doesn't crash
    const payload = {
      ...rawData,
      programId: Number(rawData.programId)
    };
    
    this.svc.createTraining(payload as any).subscribe({
      next: () => {
        this.router.navigate(['/program-manager/training-management']);
      },
      error: (e) => {
        this.loading.set(false);
        // Log the exact error object to console so you can see C# validation errors if it fails again
        console.error('Validation Error Details:', e.error);
        
        // Show the specific error title from C# (like "One or more validation errors occurred.")
        this.error.set(
          e?.error?.message || 
          e?.error?.title || 
          'An error occurred while creating the training.'
        );
      }
    });
  }
}