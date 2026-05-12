import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Audit, AuditorDashboard, ComplianceRecord, EmploymentProgram, Notification, Report } from '../models/index';

@Injectable({ providedIn: 'root' })
export class AuditorService {
  private http = inject(HttpClient);
  private base = environment.apis.govAuditor;

  getDashboard()   { return this.http.get<AuditorDashboard>(`${this.base}/governmentauditor/dashboard`); }
  getAudits()      { return this.http.get<Audit[]>(`${this.base}/governmentauditor/audits`); }
  createAudit(d: Partial<Audit>) { return this.http.post<Audit>(`${this.base}/governmentauditor/audits`, d); }
  getReports()     { return this.http.get<Report[]>(`${this.base}/governmentauditor/reports`); }
  getCompliance()  { return this.http.get<ComplianceRecord[]>(`${this.base}/governmentauditor/compliance`); }
  getPrograms()    { return this.http.get<EmploymentProgram[]>(`${this.base}/governmentauditor/programs`); }
  getAlerts()      { return this.http.get<Notification[]>(`${this.base}/governmentauditor/alerts`); }
}
