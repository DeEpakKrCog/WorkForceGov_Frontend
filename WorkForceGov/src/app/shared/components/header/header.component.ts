import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  isUserLoggedIn = signal(false);

  constructor(private router: Router) {
    // Check if user is logged in (can be updated with actual auth service)
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  logout() {
    console.log('User logged out');
    this.isUserLoggedIn.set(false);
    this.closeMenu();
    this.router.navigate(['/']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.closeMenu();
  }
}
