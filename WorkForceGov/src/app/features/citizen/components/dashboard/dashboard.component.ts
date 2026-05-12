import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CitizenService } from '../../../../core/services/citizen.service';
import { CitizenDashboard } from '../../../../core/models/index';

@Component({
  selector: 'app-citizen-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class CitizenDashboardComponent implements OnInit {
  private svc = inject(CitizenService);

  data: CitizenDashboard | null = null;
  loading = true;

  ngOnInit(): void {
    this.svc.getDashboard().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  statusBadge(status: string): string {
    switch (status) {
      case 'Approved':
        return 'bs-success';
      case 'Rejected':
        return 'bs-danger';
      case 'Withdrawn':
        return 'bs-secondary';
      default:
        return 'bs-warning';
    }
  }
}