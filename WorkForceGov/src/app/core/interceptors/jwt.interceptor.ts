import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Read from localStorage directly (works before DI is fully settled)
  let token: string | null = null;
  let userId: number = 0;
  try {
    const stored = localStorage.getItem('wfg_user');
    if (stored) {
      const user = JSON.parse(stored);
      token  = user?.token  ?? null;
      userId = user?.userId ?? 0;
    }
  } catch { /* ignore */ }

  // Skip adding auth headers for the login and register requests
  const isAuthCall = req.url.includes('/auth/login') || req.url.includes('/admin/users');

  if (token && !isAuthCall) {
    const isFormData = req.body instanceof FormData;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      'X-User-Id':   String(userId),
    };
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    req = req.clone({ setHeaders: headers });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        localStorage.removeItem('wfg_user');
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
