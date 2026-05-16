import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuditorService } from '../../../../core/services/auditor.service';
import { AuditorDashboard } from '../../../../core/models/index';

@Component({
  selector: 'app-ga-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class GADashboardComponent implements OnInit {
  svc = inject(AuditorService);
  
  data: AuditorDashboard | null = null;
  loading = true;

  ngOnInit(): void {
    this.svc.getDashboard().subscribe({
      next: (d) => {
        this.data = d;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard:', err);
        this.loading = false;
      }
    });
  }

  statusBadge(s: string): string {
    switch (s) {
      case 'Completed':
        return 'bs-success';
      case 'Open':
        return 'bs-warning';
      default:
        return 'bs-info';
    }
  }
}