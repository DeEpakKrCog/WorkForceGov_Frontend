import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// ── FIXED IMPORT PATH ──
// This tells Angular to go up 3 folders to reach the 'app' root, then down into 'core'
import { AdminService } from '../../../core/services/admin.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private adminService = inject(AdminService);

  isMenuOpen = signal(false);
  isUserLoggedIn = signal(false);

  ngOnInit() {
    // Check if user is already logged in when the header loads
    const token = localStorage.getItem('token');
    this.isUserLoggedIn.set(!!token); 
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  logout() {
    // 1. Call the backend to record the "UserLogout" system log and clear storage
    this.adminService.logout();
    
    // 2. Update the local UI state
    this.isUserLoggedIn.set(false);
    this.closeMenu();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.closeMenu();
  }
}