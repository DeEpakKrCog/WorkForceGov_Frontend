import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Application, Employer, EmployerDocument, EmployerDashboard, JobOpening, Notification } from '../models/index';

@Injectable({ providedIn: 'root' })
export class EmployerService {
  private http = inject(HttpClient);
  private base = environment.apis.employer;

  getDashboard()  { return this.http.get<EmployerDashboard>(`${this.base}/employer/dashboard`); }
  getProfile()    { return this.http.get<Employer>(`${this.base}/employer/profile`); }
  updateProfile(d: Partial<Employer>) { return this.http.put<Employer>(`${this.base}/employer/profile`, d); }
  registerEmployer(d: Partial<Employer>) { return this.http.post<Employer>(`${this.base}/employer/register`, d); }

  getJobs()       { return this.http.get<JobOpening[]>(`${this.base}/employer/jobs`); }
  getJob(id: number) { return this.http.get<JobOpening>(`${this.base}/employer/jobs/${id}`); }
  createJob(d: Partial<JobOpening>) { return this.http.post<JobOpening>(`${this.base}/employer/jobs`, d); }
  updateJob(id: number, d: Partial<JobOpening>) { return this.http.put<JobOpening>(`${this.base}/employer/jobs/${id}`, d); }
  closeJob(id: number) { return this.http.post(`${this.base}/employer/jobs/${id}/close`, {}); }

  getApplications() { return this.http.get<Application[]>(`${this.base}/employer/applications`); }
  getApplication(id: number) { return this.http.get<Application>(`${this.base}/employer/applications/${id}`); }
  updateApplication(id: number, status: string, notes: string) { return this.http.put(`${this.base}/employer/applications/${id}`, { status, notes }); }

  getDocuments()  { return this.http.get<EmployerDocument[]>(`${this.base}/employer/documents`); }
  uploadDocument(fd: FormData) { return this.http.post<EmployerDocument>(`${this.base}/employer/documents/upload`, fd); }

  getNotifications() { return this.http.get<Notification[]>(`${this.base}/employer/notifications`); }
}
