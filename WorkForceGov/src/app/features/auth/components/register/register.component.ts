import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

function passwordMatch(ctrl: AbstractControl): ValidationErrors | null {
  const p = ctrl.get('password')?.value;
  const c = ctrl.get('confirmPassword')?.value;
  return p === c ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);

  loading   = signal(false);
  error     = signal('');
  success   = signal('');
  submitted = false;

  // Only Citizen and Employer can self-register.
  // Government roles are assigned directly by the government authority.
  roles = [
    { value: 'Citizen',  label: 'Citizen / Job Seeker' },
    { value: 'Employer', label: 'Employer / Company'   },
  ];

  form = this.fb.group({
    fullName:        ['', [Validators.required, Validators.minLength(3)]],
    email:           ['', [Validators.required, Validators.email]],
    phone:           [''],
    role:            ['', Validators.required],
    password:        ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    agreeTerms:      [false, Validators.requiredTrue],
  }, { validators: passwordMatch });

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set('');

    const v = this.form.value;
    this.auth.register({
      fullName:        v.fullName!,
      email:           v.email!,
      password:        v.password!,
      confirmPassword: v.confirmPassword!,
      role:            v.role!,
      phone:           v.phone ?? undefined,
    }).subscribe({
      next: (res: any) => {
        this.loading.set(false);
        // Backend returns { Message: "User created." }
        const msg = res?.Message || res?.message || 'Account created successfully!';
        this.success.set(msg + ' Redirecting to login...');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (e) => {
        this.loading.set(false);
        const msg =
          e?.error?.Message ||
          e?.error?.message ||
          e?.error ||
          'Registration failed. The email may already be registered.';
        this.error.set(typeof msg === 'string' ? msg : 'Registration failed. Please try again.');
      }
    });
  }
}
