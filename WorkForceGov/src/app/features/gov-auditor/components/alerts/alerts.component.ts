import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditorService } from '../../../../core/services/auditor.service';
import { Notification } from '../../../../core/models/index';
@Component({ selector: 'app-ga-alerts', standalone: true, imports: [CommonModule], templateUrl: './alerts.component.html' })
export class GAAlertsComponent implements OnInit {
  svc = inject(AuditorService); alerts: Notification[] = []; loading = true;
  ngOnInit() { this.svc.getAlerts().subscribe({ next: a => { this.alerts = a; this.loading = false; }, error: () => this.loading = false }); }
}
