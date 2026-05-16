import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComplianceService } from '../../../../core/services/compliance.service';
import { ComplianceDashboard } from '../../../../core/models/index';

@Component({
  selector: 'app-co-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class CODashboardComponent implements OnInit {
  svc = inject(ComplianceService);
  
  data: ComplianceDashboard | null = null;
  loading = true;

  ngOnInit(): void {
    this.svc.getDashboard().subscribe({
      next: (d) => {
        this.data = d;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  resultBadge(result: string): string {
    if (result === 'Compliant') {
      return 'bs-success';
    } else if (result === 'Non-Compliant') {
      return 'bs-danger';
    } else {
      return 'bs-warning';
    }
  }

  statusBadge(status: string): string {
    if (status === 'Resolved') {
      return 'bs-success';
    } else if (status === 'Open') {
      return 'bs-danger';
    } else {
      return 'bs-warning';
    }
  }
}