import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Application, Audit, CitizenDocument, ComplianceRecord, EmployerDocument, LaborOfficerDashboard, Report } from '../models/index';

@Injectable({ providedIn: 'root' })
export class LaborOfficerService {
  private http = inject(HttpClient);
  private base = environment.apis.laborOfficer;

  getDashboard() { return this.http.get<LaborOfficerDashboard>(`${this.base}/laborofficer/dashboard`); }
  getCitizenDocs()  { return this.http.get<CitizenDocument[]>(`${this.base}/laborofficer/documents/citizen`); }
  getEmployerDocs() { return this.http.get<EmployerDocument[]>(`${this.base}/laborofficer/documents/employer`); }
  verifyCitizenDoc(id: number)  { return this.http.post(`${this.base}/laborofficer/documents/citizen/${id}/verify`, {}); }
  rejectCitizenDoc(id: number, reason: string) { return this.http.post(`${this.base}/laborofficer/documents/citizen/${id}/reject`, { reason }); }
  verifyEmployerDoc(id: number) { return this.http.post(`${this.base}/laborofficer/documents/employer/${id}/verify`, {}); }
  rejectEmployerDoc(id: number, reason: string) { return this.http.post(`${this.base}/laborofficer/documents/employer/${id}/reject`, { reason }); }
  getApplications() { return this.http.get<Application[]>(`${this.base}/laborofficer/applications`); }
  approveApplication(id: number) { return this.http.post(`${this.base}/laborofficer/applications/${id}/approve`, {}); }
  rejectApplication(id: number, notes: string) { return this.http.post(`${this.base}/laborofficer/applications/${id}/reject`, { notes }); }
  getAudits()     { return this.http.get<Audit[]>(`${this.base}/laborofficer/audits`); }
  getCompliance() { return this.http.get<ComplianceRecord[]>(`${this.base}/laborofficer/compliance`); }
  getReports()    { return this.http.get<Report[]>(`${this.base}/laborofficer/reports`); }
  generateReport(name: string, type: string) { return this.http.post<Report>(`${this.base}/laborofficer/reports`, { reportName: name, reportType: type }); }
}
