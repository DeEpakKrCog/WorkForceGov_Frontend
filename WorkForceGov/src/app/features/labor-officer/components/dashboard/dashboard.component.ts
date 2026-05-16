import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LaborOfficerService } from '../../../../core/services/labor-officer.service';
import { LaborOfficerDashboard } from '../../../../core/models/index';

@Component({
  selector: 'app-lo-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class LODashboardComponent implements OnInit {
  private svc = inject(LaborOfficerService);

  // State Properties
  data: LaborOfficerDashboard | null = null;
  loading = true;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.svc.getDashboard().subscribe({
      next: (d) => {
        this.data = d;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard data', err);
        this.loading = false;
      }
    });
  }
}