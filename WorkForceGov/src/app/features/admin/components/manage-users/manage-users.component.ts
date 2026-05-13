import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';
import { User } from '../../../../core/models/index';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-users.component.html'
})
export class ManageUsersComponent implements OnInit {
  // Dependency Injection
  private svc = inject(AdminService);

  // State Properties
  users: User[] = [];
  msg = '';
  loading = true;

  ngOnInit(): void {
    this.load();
  }

  /**
   * Fetches the user list using headers that sync with AuthService
   */
  load(): void {
    this.loading = true;
    this.svc.getUsers().subscribe({
      next: (u) => {
        this.users = u;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
        this.loading = false;
        this.msg = 'Error loading user data. Please check your connection.';
      }
    });
  }

  /**
   * Performs a Soft Delete (Deactivation)
   * This prevents SQL reference constraint errors by updating status instead of deleting
   */
  deactivate(id: number): void {
    const confirmMsg = 'Are you sure you want to deactivate this user? Their records will be preserved for auditing, but they will no longer be able to log in.';
    
    if (!confirm(confirmMsg)) {
      return;
    }

    // Call deactivateUser (PUT) instead of deleteUser (DELETE)
    this.svc.deactivateUser(id).subscribe({
      next: (response: any) => {
        // Success: Show message and refresh the table
        this.msg = response?.message || 'User deactivated successfully.';
        this.load(); 
      },
      error: (err) => {
        console.error('Deactivation failed:', err);
        this.msg = 'Failed to deactivate user. They may have active system dependencies.';
      }
    });
  }
}