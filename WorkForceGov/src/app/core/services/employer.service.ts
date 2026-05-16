import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  Application, 
  Employer, 
  EmployerDocument, 
  EmployerDashboard, 
  JobOpening, 
  Notification 
} from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private http = inject(HttpClient);
  private base = environment.apis.employer;

  // ═══════════════════════════════════════════════════════════════════
  //  DASHBOARD & PROFILE
  // ═══════════════════════════════════════════════════════════════════

  getDashboard(): Observable<EmployerDashboard> {
    return this.http.get<EmployerDashboard>(`${this.base}/employer/dashboard`);
  }

  getProfile(): Observable<Employer> {
    return this.http.get<Employer>(`${this.base}/employer/profile`);
  }

  // 👉 This is the method we need to call from the component
  registerEmployer(data: Partial<Employer>): Observable<Employer> {
    return this.http.post<Employer>(`${this.base}/employer/profile/register`, data);
  }

  updateProfile(data: Partial<Employer>): Observable<Employer> {
    return this.http.put<Employer>(`${this.base}/employer/profile`, data);
  }

  // ═══════════════════════════════════════════════════════════════════
  //  JOB MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════

  getJobs(): Observable<JobOpening[]> {
    return this.http.get<JobOpening[]>(`${this.base}/employer/jobs`);
  }

  getJob(id: number): Observable<JobOpening> {
    return this.http.get<JobOpening>(`${this.base}/employer/jobs/${id}`);
  }

  createJob(data: Partial<JobOpening>): Observable<JobOpening> {
    return this.http.post<JobOpening>(`${this.base}/employer/jobs`, data);
  }

  updateJob(id: number, data: Partial<JobOpening>): Observable<JobOpening> {
    return this.http.put<JobOpening>(`${this.base}/employer/jobs/${id}`, data);
  }

  closeJob(id: number): Observable<any> {
    return this.http.put(`${this.base}/employer/jobs/${id}/close`, {});
  }

  // ═══════════════════════════════════════════════════════════════════
  //  APPLICATION MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.base}/employer/applications`);
  }

  getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.base}/employer/applications/${id}`);
  }

  updateApplication(id: number, status: string, notes: string): Observable<any> {
    const params = { status }; 
    return this.http.put(`${this.base}/employer/applications/${id}/status`, JSON.stringify(notes), {
      params,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  //  DOCUMENTS & NOTIFICATIONS
  // ═══════════════════════════════════════════════════════════════════

  getDocuments(): Observable<EmployerDocument[]> {
    return this.http.get<EmployerDocument[]>(`${this.base}/employer/documents`);
  }

  uploadDocument(fd: FormData): Observable<any> {
    return this.http.post(`${this.base}/employer/documents`, fd);
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.base}/employer/notifications`);
  }
}