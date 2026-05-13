import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'; // Required for strict typing
import { environment } from '../../../environments/environment';
import { 
  AdminDashboard, 
  CreateUserRequest, 
  Report, 
  SystemLog, 
  User 
} from '../models/index';

@Injectable({ 
  providedIn: 'root' 
})
export class AdminService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private base = environment.apis.admin;

  /**
   * Helper to attach JWT and X-User-Id to every request.
   * Checks both standalone 'token' and 'wfg_user' JSON object.
   */
  private getAuthHeaders(): { headers: HttpHeaders } {
    // Check standalone key first, then fallback to JSON object
    let token = localStorage.getItem('token');
    
    if (!token) {
      const userData = localStorage.getItem('wfg_user');
      if (userData) {
        try {
          token = JSON.parse(userData).token;
        } catch (e) {
          console.warn('Failed to parse wfg_user for token retrieval.');
        }
      }
    }

    let headers = new HttpHeaders();
    
    if (token) {
      const cleanToken = token.replace(/['"]+/g, '');
      headers = headers.set('Authorization', `Bearer ${cleanToken}`);
      
      try {
        // Decode payload for X-User-Id logging
        const base64 = cleanToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        const userId = payload.sub || payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        if (userId) {
          headers = headers.set('X-User-Id', userId.toString());
        }
      } catch (e) {
        console.warn('Could not decode local token payload.');
      }
    }
    return { headers };
  }

  // ═══════════════════════════════════════════════════════════════════
  //  AUTHENTICATION
  // ═══════════════════════════════════════════════════════════════════

  logout() {
    this.http.post(`${this.base}/auth/logout`, {}, this.getAuthHeaders()).subscribe({
      next: () => this.finalizeLogout(),
      error: (err) => {
        console.error('Logout failed on server, forcing local logout.', err);
        this.finalizeLogout(); 
      }
    });
  }

  private finalizeLogout() {
    localStorage.removeItem('token'); 
    localStorage.removeItem('wfg_user'); // Ensure full cleanup
    this.router.navigate(['/login']); 
  }

  // ═══════════════════════════════════════════════════════════════════
  //  DASHBOARD & MONITORING
  // ═══════════════════════════════════════════════════════════════════

  getDashboard() { 
    return this.http.get<AdminDashboard>(`${this.base}/admin/dashboard`, this.getAuthHeaders()); 
  }

  getLogs() { 
    return this.http.get<SystemLog[]>(`${this.base}/admin/system-logs`, this.getAuthHeaders()); 
  }

  // ═══════════════════════════════════════════════════════════════════
  //  USER MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════

  getUsers() { 
    return this.http.get<User[]>(`${this.base}/admin/users`, this.getAuthHeaders()); 
  }

  getUserById(id: number) { 
    return this.http.get<User>(`${this.base}/admin/users/${id}`, this.getAuthHeaders()); 
  }

  createUser(data: CreateUserRequest) { 
    return this.http.post<User>(`${this.base}/admin/users`, data, this.getAuthHeaders()); 
  }

  updateUser(id: number, data: Partial<User & { password?: string }>) { 
    return this.http.put<User>(`${this.base}/admin/users/${id}`, data, this.getAuthHeaders()); 
  }

  deleteUser(id: number) { 
    return this.http.delete(`${this.base}/admin/users/${id}`, this.getAuthHeaders()); 
  }
  // Inside admin.service.ts
deactivateUser(id: number) { 
  // Change this from this.http.delete to this.http.put
  return this.http.put(`${this.base}/admin/users/${id}/deactivate`, {}, this.getAuthHeaders()); 
}

  // ═══════════════════════════════════════════════════════════════════
  //  REPORTS
  // ═══════════════════════════════════════════════════════════════════

  getReports() { 
    return this.http.get<Report[]>(`${this.base}/admin/reports`, this.getAuthHeaders()); 
  }

  generateReport(name: string, type: string, startDate?: string, endDate?: string) { 
    return this.http.post<Report>(`${this.base}/admin/reports`, { 
      reportName: name, 
      reportType: type,
      startDate: startDate || null,
      endDate: endDate || null
    }, this.getAuthHeaders()); 
  }

  /**
   * Fixed download method with strict return typing to resolve TS errors
   */
  downloadReport(id: number): Observable<Blob> {
    return this.http.get(`${this.base}/admin/reports/${id}/download`, {
      headers: this.getAuthHeaders().headers,
      responseType: 'blob'
    });
  }
}
