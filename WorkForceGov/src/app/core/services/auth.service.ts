import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/index';

// ── ASP.NET Core returns camelCase JSON by default ─────────────────────────
// e.g. { "token": "...", "userId": 1, "role": "Citizen", ... }
interface BackendLoginResponse {
  token:     string;   // camelCase — matches ASP.NET Core default serialization
  userId:    number;
  fullName:  string;
  email:     string;
  role:      string;
  expiresAt?: string;
  // Also accept PascalCase as fallback (some configs differ)
  Token?:     string;
  UserId?:    number;
  FullName?:  string;
  Email?:     string;
  Role?:      string;
}

const STORAGE_KEY = 'wfg_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Admin API (7001) is the single auth gateway for ALL roles (shared DB)
  private loginUrl    = `${environment.apis.admin}/auth/login`;
  private registerUrl = `${environment.apis.admin}/auth/register`;

  private _user = signal<AuthResponse | null>(this._loadUser());

  readonly currentUser = computed(() => this._user());
  // isLoggedIn: true if token exists AND role is known
  readonly isLoggedIn  = computed(() => {
    const u = this._user();
    return !!(u?.token && u.token.length > 0 && u.role && u.role.length > 0);
  });
  readonly role      = computed(() => this._user()?.role ?? '');
  readonly userId    = computed(() => this._user()?.userId ?? 0);
  readonly fullName  = computed(() => this._user()?.fullName ?? '');
  readonly token     = computed(() => this._user()?.token ?? '');
  readonly initials  = computed(() =>
    this.fullName().split(' ').map(w => w[0] ?? '').join('').slice(0, 2).toUpperCase()
  );
  readonly accentColor = computed(() => {
    const map: Record<string, string> = {
      Citizen:           '#0ea5e9',
      Employer:          '#8b5cf6',
      SystemAdmin:       '#ef4444',
      LaborOfficer:      '#f59e0b',
      ComplianceOfficer: '#10b981',
      GovernmentAuditor: '#6366f1',
      ProgramManager:    '#ec4899',
    };
    return map[this.role()] ?? '#64748b';
  });
  readonly roleLabel = computed(() => {
    const map: Record<string, string> = {
      SystemAdmin:       'Administrator',
      LaborOfficer:      'Labor Officer',
      ComplianceOfficer: 'Compliance Officer',
      GovernmentAuditor: 'Government Auditor',
      ProgramManager:    'Program Manager',
    };
    return map[this.role()] ?? this.role();
  });

  constructor(private http: HttpClient, private router: Router) {}

  // ── Login ──────────────────────────────────────────────────────────────────
  login(req: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<BackendLoginResponse>(this.loginUrl, {
        // Send both casings so it works regardless of server config
        email:    req.email,
        password: req.password,
        Email:    req.email,
        Password: req.password,
      })
      .pipe(
        tap((res: BackendLoginResponse) => {
          // Support both camelCase and PascalCase response (covers all ASP.NET Core configs)
          const user: AuthResponse = {
            token:    res.token    || res.Token    || '',
            userId:   res.userId   ?? res.UserId   ?? 0,
            fullName: res.fullName || res.FullName || '',
            email:    res.email    || res.Email    || '',
            role:     res.role     || res.Role     || '',
          };

          if (!user.token) {
            console.error('[AuthService] Login response missing token. Raw response:', res);
            throw new Error('Login response did not include a token.');
          }
          if (!user.role) {
            console.error('[AuthService] Login response missing role. Raw response:', res);
            throw new Error('Login response did not include a role.');
          }

          this._persist(user);
          console.log('[AuthService] Login success. Role:', user.role, '→ redirecting…');
        })
      ) as Observable<AuthResponse>;
  }

  // ── Register ───────────────────────────────────────────────────────────────
  register(req: RegisterRequest): Observable<{ message?: string; Message?: string }> {
    return this.http.post<{ message?: string; Message?: string }>(this.registerUrl, {
      fullName: req.fullName,
      email:    req.email,
      password: req.password,
      role:     req.role,
      phone:    req.phone ?? null,
      // PascalCase fallback
      FullName: req.fullName,
      Email:    req.email,
      Password: req.password,
      Role:     req.role,
      Phone:    req.phone ?? null,
    });
  }

  // ── Redirect after login ───────────────────────────────────────────────────
  redirectToDashboard(): void {
    const dashMap: Record<string, string> = {
      Citizen:           '/citizen/dashboard',
      Employer:          '/employer/dashboard',
      SystemAdmin:       '/admin/dashboard',
      LaborOfficer:      '/labor-officer/dashboard',
      ComplianceOfficer: '/compliance-officer/dashboard',
      GovernmentAuditor: '/gov-auditor/dashboard',
      ProgramManager:    '/program-manager/dashboard',
    };
    const dest = dashMap[this.role()];
    if (!dest) {
      console.warn('[AuthService] No dashboard for role:', this.role(), '— going home');
      this.router.navigate(['/home']);
      return;
    }
    console.log('[AuthService] Navigating to', dest);
    this.router.navigate([dest]);
  }

  // ── Logout ─────────────────────────────────────────────────────────────────
  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  // ── Internals ──────────────────────────────────────────────────────────────
  private _persist(user: AuthResponse): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this._user.set(user);
  }

  private _loadUser(): AuthResponse | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const u: AuthResponse = JSON.parse(raw);
      // Validate stored data has required fields before trusting it
      return (u?.token && u.role) ? u : null;
    } catch {
      return null;
    }
  }
}
