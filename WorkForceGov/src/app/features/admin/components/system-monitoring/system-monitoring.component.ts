import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../core/services/admin.service';
import { SystemLog } from '../../../../core/models/index';
@Component({ selector: 'app-system-monitoring', standalone: true, imports: [CommonModule], templateUrl: './system-monitoring.component.html' })
export class SystemMonitoringComponent implements OnInit {
  svc = inject(AdminService); logs: SystemLog[] = []; loading = true;
  ngOnInit() { this.svc.getLogs().subscribe({ next: l => { this.logs = l; this.loading = false; }, error: () => this.loading = false }); }
  badgeClass(a: string) { return a.includes('Login') ? 'bs-success' : a.includes('Delete') || a.includes('Reject') ? 'bs-danger' : 'bs-info'; }
}
