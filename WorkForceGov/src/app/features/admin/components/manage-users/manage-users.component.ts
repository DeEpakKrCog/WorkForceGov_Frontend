import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';
import { User } from '../../../../core/models/index';
@Component({ selector: 'app-manage-users', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './manage-users.component.html' })
export class ManageUsersComponent implements OnInit {
  svc = inject(AdminService); users: User[] = []; msg = ''; loading = true;
  ngOnInit() { this.load(); }
  load() { this.svc.getUsers().subscribe({ next: u => { this.users = u; this.loading = false; }, error: () => this.loading = false }); }
  deactivate(id: number) { if (!confirm('Deactivate this user?')) return; this.svc.deleteUser(id).subscribe({ next: () => { this.msg = 'User deactivated.'; this.load(); }, error: () => {} }); }
}
