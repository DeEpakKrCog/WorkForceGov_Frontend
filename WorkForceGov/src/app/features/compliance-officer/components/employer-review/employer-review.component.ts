import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplianceService } from '../../../../core/services/compliance.service';
import { Employer } from '../../../../core/models/index';

@Component({
  selector: 'app-employer-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employer-review.component.html',
})
export class EmployerReviewComponent implements OnInit {
  svc = inject(ComplianceService);
  
  employers: Employer[] = [];
  loading = true;

  ngOnInit(): void {
    this.svc.getEmployers().subscribe({
      next: (e) => {
        this.employers = e;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  statusBadge(status: string): string {
    if (status === 'Verified') {
      return 'bs-success';
    } else if (status === 'Suspended') {
      return 'bs-danger';
    } else if (status === 'Flagged') {
      return 'bs-warning';
    } else {
      return 'bs-info';
    }
  }
}