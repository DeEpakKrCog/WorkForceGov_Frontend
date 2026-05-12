import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitizenService } from '../../../../core/services/citizen.service';
import { Notification } from '../../../../core/models/index';

@Component({
  selector: 'app-citizen-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html'
})
export class CitizenNotificationsComponent implements OnInit {
  private svc = inject(CitizenService);

  notifications: Notification[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.loading = true;
    this.svc.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  unreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }
}