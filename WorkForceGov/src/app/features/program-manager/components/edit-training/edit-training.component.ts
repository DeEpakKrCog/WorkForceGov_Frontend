import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { EmploymentProgram } from '../../../../core/models/index';

@Component({
  selector: 'app-edit-training',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule
  ],
  templateUrl: './edit-training.component.html'
})
export class EditTrainingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private svc = inject(ProgramManagerService);
  private router = inject(Router);
  
  // 🚨 NEW: Inject ActivatedRoute to get the ID from the URL
  private route = inject(ActivatedRoute);

  loading = signal(false);
  error = signal('');
  
  programs: EmploymentProgram[] = [];
  trainingId!: number; // Store the ID being edited

  form = this.fb.group({
    programId: ['', Validators.required],
    title: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });

  ngOnInit(): void {
    // 1. Get the ID from the URL (e.g., edit-training/6)
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.trainingId = Number(idParam);
    }

    // 2. Load programs for the dropdown
    this.svc.getPrograms().subscribe({
      next: (p) => this.programs = p,
      error: (e) => console.error('Failed to load programs', e)
    });

    // 3. 🚨 FIX: Fetch the existing training data and fill the form
    if (this.trainingId) {
      this.svc.getTraining(this.trainingId).subscribe({
        next: (training) => {
          this.form.patchValue({
            programId: training.programId.toString(),
            title: training.title,
            description: training.description,
            // HTML date inputs strictly require YYYY-MM-DD format
            startDate: this.formatDate(training.startDate),
            endDate: this.formatDate(training.endDate)
          });
        },
        error: () => this.error.set('Failed to load training data.')
      });
    }
  }

  // Helper method to format backend dates for the HTML <input type="date">
  private formatDate(dateInput: any): string {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    return date.toISOString().split('T')[0];
  }

  submit(): void {
    if (this.form.invalid) {
      this.error.set('Please fill out all required fields correctly.');
      return;
    }
    
    this.loading.set(true);
    this.error.set('');

    const rawData = this.form.value;
    const payload = {
      ...rawData,
      id: this.trainingId, // Ensure ID is in the payload
      programId: Number(rawData.programId) // Force to Number to prevent 400 Bad Request
    };
    
    // 🚨 FIX: Call updateTraining instead of createTraining
    this.svc.updateTraining(this.trainingId, payload as any).subscribe({
      next: () => {
        this.router.navigate(['/program-manager/training-management']);
      },
      error: (e) => {
        this.loading.set(false);
        console.error('Update Error:', e.error);
        this.error.set(
          e?.error?.message || 
          e?.error?.title || 
          'An error occurred while updating the training.'
        );
      }
    });
  }
}