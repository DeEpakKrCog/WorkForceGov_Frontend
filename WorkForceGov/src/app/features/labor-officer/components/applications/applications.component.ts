import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 🚨 REQUIRED for the Review Documents button
import { LaborOfficerService } from '../../../../core/services/labor-officer.service';
import { Application } from '../../../../core/models/index';

@Component({
  selector: 'app-lo-applications',
  standalone: true,
  imports: [CommonModule, RouterModule], // 🚨 Added RouterModule here
  templateUrl: './applications.component.html'
})
export class LOApplicationsComponent implements OnInit {
  private svc = inject(LaborOfficerService);

  // State Properties
  apps: Application[] = [];
  msg = '';
  loading = true;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.svc.getApplications().subscribe({
      next: (a) => {
        this.apps = a;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load applications', err);
        this.loading = false;
        this.msg = 'Error loading applications.';
      }
    });
  }

  statusBadge(status: string): string {
    switch (status) {
      case 'Approved':
        return 'bs-success';
      case 'Rejected':
        return 'bs-danger';
      case 'Shortlisted':
        return 'bs-info';
      case 'Pending':
      default:
        return 'bs-warning';
    }
  }
}