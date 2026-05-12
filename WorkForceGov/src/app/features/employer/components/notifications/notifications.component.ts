import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerService } from '../../../../core/services/employer.service';
import { Notification } from '../../../../core/models/index';
@Component({ selector: 'app-employer-notifications', standalone: true, imports: [CommonModule], templateUrl: './notifications.component.html' })
export class EmployerNotificationsComponent implements OnInit {
  svc = inject(EmployerService); notifications: Notification[] = []; loading = true;
  ngOnInit() { this.svc.getNotifications().subscribe({ next: n => { this.notifications = n; this.loading = false; }, error: () => this.loading = false }); }
}
