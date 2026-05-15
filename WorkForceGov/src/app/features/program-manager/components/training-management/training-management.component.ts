import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { Training } from '../../../../core/models/index';

@Component({
  selector: 'app-training-management',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ],
  templateUrl: './training-management.component.html'
})
export class TrainingManagementComponent implements OnInit {
  private svc = inject(ProgramManagerService);

  // State Properties
  trainings: Training[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadTrainings();
  }

  // Extracted to a helper method so we can easily reload if needed
  loadTrainings(): void {
    this.loading = true;
    this.svc.getTrainings().subscribe({
      next: (t) => {
        this.trainings = t;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // 🚨 ADDED: Delete logic with browser confirmation
  deleteTraining(id: number, title: string): void {
    if (confirm(`Are you sure you want to delete the training "${title}"? This action cannot be undone.`)) {
      this.svc.deleteTraining(id).subscribe({
        next: () => {
          // Remove it from the UI instantly
          this.trainings = this.trainings.filter(t => t.id !== id);
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Failed to delete the training. Make sure there are no active enrollments tied to it.');
        }
      });
    }
  }
}