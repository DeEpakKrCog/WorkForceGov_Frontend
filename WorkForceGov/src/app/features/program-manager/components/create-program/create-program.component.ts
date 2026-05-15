import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';

@Component({
  selector: 'app-create-program',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule
  ],
  templateUrl: './create-program.component.html'
})
export class CreateProgramComponent {
  private fb = inject(FormBuilder);
  private svc = inject(ProgramManagerService);
  private router = inject(Router);

  loading = signal(false);
  error = signal('');
  
  types = [
    'Employment',
    'Training',
    'Benefits',
    'Rehabilitation',
    'Placement',
    'Reintegration'
  ];

  form = this.fb.group({
    programName: ['', Validators.required],
    programType: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required],
    endDate: [''],
    totalBudget: [0, Validators.required],
    status: ['Active']
  });

  submit(): void {
    if (this.form.invalid) return;
    
    this.loading.set(true);
    
    this.svc.createProgram(this.form.value as any).subscribe({
      next: () => {
        this.router.navigate(['/program-manager/program-management']);
      },
      error: (e) => {
        this.loading.set(false);
        this.error.set(e?.error?.message ?? 'An error occurred while creating the program.');
      }
    });
  }
}