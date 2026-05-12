import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  // State Management
  loading = signal(false);
  error = signal('');
  submitted = false;
  debugInfo = signal('');

  // Form Initialization
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Getter for easy access to form controls
  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error.set('');
    this.debugInfo.set('');

    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);

    const loginData = {
      email: this.f.email.value!,
      password: this.f.password.value!,
    };

    this.auth.login(loginData).subscribe({
      next: () => {
        this.loading.set(false);
        this.debugInfo.set(`✅ Logged in as ${this.auth.fullName()} (${this.auth.role()})`);
        this.auth.redirectToDashboard();
      },
      error: (e: any) => {
        this.loading.set(false);
        const msg =
          e?.error?.message ||
          e?.error?.Message ||
          (typeof e?.error === 'string' ? e.error : null) ||
          e?.message ||
          'Invalid email or password.';
        
        this.error.set(msg);
        this.debugInfo.set(`❌ Error ${e?.status}: ${JSON.stringify(e?.error)}`);
      },
    });
  }
}