import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../core/services/admin.service';
import { SystemLog } from '../../../../core/models/index';

@Component({
  selector: 'app-system-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-monitoring.component.html'
})
export class SystemMonitoringComponent implements OnInit {
  // Dependency Injection
  private svc = inject(AdminService);

  // State Management
  logs: SystemLog[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadLogs();
  }

  /**
   * Fetches the latest system activity logs
   */
  private loadLogs(): void {
    this.svc.getLogs().subscribe({
      next: (l) => {
        this.logs = l;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load system logs:', err);
        this.loading = false;
      }
    });
  }

  /**
   * Returns a Bootstrap status class based on the log action string
   * @param action The activity description
   */
  badgeClass(action: string): string {
    if (!action) return 'bs-info';
    
    const a = action.toLowerCase();
    
    if (a.includes('login')) return 'bs-success';
    if (a.includes('delete') || a.includes('reject') || a.includes('error')) {
      return 'bs-danger';
    }
    if (a.includes('create') || a.includes('update')) return 'bs-info';
    
    return 'bs-warning'; // Default for other actions like "Export" or "View"
  }
}