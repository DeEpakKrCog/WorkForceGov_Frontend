import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitizenService } from '../../../../core/services/citizen.service';
import { Training, TrainingEnrollment } from '../../../../core/models/index';

@Component({
  selector: 'app-citizen-trainings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainings.component.html',
})
export class CitizenTrainingsComponent implements OnInit {
  private svc = inject(CitizenService);

  // Data State
  trainings: Training[] = [];
  enrollments: TrainingEnrollment[] = [];
  enrolledIds = new Set<number>();

  // UI State
  msg = '';
  errMsg = '';
  loading = true;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.svc.getTrainingsData().subscribe({
      next: (res) => {
        // Handling variations in backend response keys
        this.trainings = res.available || res.Available || [];
        this.enrollments = res.enrollments || res.Enrollments || [];
        this.enrolledIds = new Set(this.enrollments.map((e) => e.trainingId));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errMsg = 'Failed to load trainings.';
      },
    });
  }

  enroll(id: number): void {
    this.msg = '';
    this.errMsg = '';

    this.svc.enroll(id).subscribe({
      next: () => {
        this.msg = 'Successfully enrolled in training program!';
        this.load();
      },
      error: (e) => {
        this.errMsg = e?.error?.message ?? 'Enrollment failed.';
      },
    });
  }

  unenroll(id: number): void {
    if (!confirm('Are you sure you want to unenrol from this training?')) {
      return;
    }

    this.msg = '';
    this.errMsg = '';

    this.svc.unenroll(id).subscribe({
      next: () => {
        this.msg = 'Successfully unenrolled.';
        this.load();
      },
      error: (e) => {
        this.errMsg = e?.error?.message ?? 'Unenrollment failed.';
      },
    });
  }

  enrollBadge(status: string): string {
    const s = status?.toLowerCase();
    switch (s) {
      case 'enrolled':
        return 'bs-info';
      case 'completed':
        return 'bs-success';
      default:
        return 'bs-secondary';
    }
  }
}