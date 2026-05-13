import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  Application, Benefit, Citizen, CitizenDocument, 
  CitizenDashboard, EmploymentProgram, JobOpening, 
  Notification, Training, TrainingEnrollment 
} from '../models/index';

@Injectable({ providedIn: 'root' })
export class CitizenService {
  private http = inject(HttpClient);
  private base = environment.apis.citizen; 

  getDashboard(): Observable<CitizenDashboard> {
    return this.http.get<CitizenDashboard>(`${this.base}/citizen/dashboard`);
  }

  getProfile(): Observable<Citizen> {
    return this.http.get<Citizen>(`${this.base}/citizen/profile`);
  }

  updateProfile(data: Partial<Citizen>): Observable<any> {
    return this.http.put(`${this.base}/citizen/profile`, data);
  }

  searchJobs(keyword = '', location = '', category = ''): Observable<any> {
    let params = new HttpParams();
    if (keyword) params = params.set('keyword', keyword);
    if (location) params = params.set('location', location);
    if (category) params = params.set('category', category);
    return this.http.get<any>(`${this.base}/citizen/jobs/search`, { params });
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.base}/citizen/applications`);
  }

  applyJob(jobId: number, coverLetter: string = ''): Observable<any> {
    return this.http.post(`${this.base}/citizen/jobs/${jobId}/apply`, JSON.stringify(coverLetter), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  withdrawApplication(id: number): Observable<any> {
    return this.http.delete(`${this.base}/citizen/applications/${id}`);
  }

  // FIXED: Pointing to /programs instead of /benefits
  getPrograms(): Observable<EmploymentProgram[]> {
    return this.http.get<EmploymentProgram[]>(`${this.base}/citizen/programs`);
  }

  getBenefits(): Observable<Benefit[]> {
    return this.http.get<Benefit[]>(`${this.base}/citizen/benefits`);
  }

  applyBenefit(programId: number): Observable<any> {
    return this.http.post(`${this.base}/citizen/benefits/apply/${programId}`, {});
  }

  getDocuments(): Observable<CitizenDocument[]> {
    return this.http.get<CitizenDocument[]>(`${this.base}/citizen/documents`);
  }

  uploadDocument(formData: FormData): Observable<CitizenDocument> {
    return this.http.post<CitizenDocument>(`${this.base}/citizen/documents/upload`, formData);
  }

  getTrainingsData(): Observable<any> {
    return this.http.get<any>(`${this.base}/citizen/trainings`);
  }

  enroll(id: number): Observable<any> {
    return this.http.post(`${this.base}/citizen/enroll/${id}`, {});
  }

  unenroll(id: number): Observable<any> {
    return this.http.post(`${this.base}/citizen/unenroll/${id}`, {});
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.base}/citizen/notifications`);
  }
}