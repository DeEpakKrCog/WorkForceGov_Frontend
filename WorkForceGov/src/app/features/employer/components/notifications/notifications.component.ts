import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerService } from '../../../../core/services/employer.service';
import { Notification } from '../../../../core/models/index';

@Component({
  selector: 'app-employer-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html'
})
export class EmployerNotificationsComponent implements OnInit {
  private svc = inject(EmployerService);

  notifications: Notification[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadNotifications();
  }

  // Changed to public so the HTML can call it
  loadNotifications(): void {
    this.loading = true;
    this.svc.getNotifications().subscribe({
      next: (n) => {
        // Sort notifications to show newest first
        this.notifications = n.sort((a, b) => 
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load notifications:', err);
        this.loading = false;
      }
    });
  }
}