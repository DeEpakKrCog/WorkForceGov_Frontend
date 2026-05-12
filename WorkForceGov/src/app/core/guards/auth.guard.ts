import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Protects routes that require any logged-in user */
export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
};

/** Prevents logged-in users from accessing /login and /register */
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  if (!auth.isLoggedIn()) return true;
  // Already logged in — send them to their dashboard
  const dashMap: Record<string, string> = {
    Citizen:           '/citizen/dashboard',
    Employer:          '/employer/dashboard',
    SystemAdmin:       '/admin/dashboard',
    LaborOfficer:      '/labor-officer/dashboard',
    ComplianceOfficer: '/compliance-officer/dashboard',
    GovernmentAuditor: '/gov-auditor/dashboard',
    ProgramManager:    '/program-manager/dashboard',
  };
  const dest = dashMap[auth.role()] ?? '/home';
  return inject(Router).createUrlTree([dest]);
};

/** Protects routes that require a specific role */
export const roleGuard = (allowedRoles: string[]): CanActivateFn => () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  if (allowedRoles.includes(auth.role())) {
    return true;  // ✅ Role matches — allow navigation
  }

  // Wrong role — redirect to their correct dashboard
  const dashMap: Record<string, string> = {
    Citizen:           '/citizen/dashboard',
    Employer:          '/employer/dashboard',
    SystemAdmin:       '/admin/dashboard',
    LaborOfficer:      '/labor-officer/dashboard',
    ComplianceOfficer: '/compliance-officer/dashboard',
    GovernmentAuditor: '/gov-auditor/dashboard',
    ProgramManager:    '/program-manager/dashboard',
  };
  const dest = dashMap[auth.role()] ?? '/home';
  return router.createUrlTree([dest]);
};
