import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Application, Audit, CitizenDocument, ComplianceRecord, EmployerDocument, LaborOfficerDashboard, Report } from '../models/index';

@Injectable({ providedIn: 'root' })
export class LaborOfficerService {
  private http = inject(HttpClient);
  private base = environment.apis.laborOfficer;

  // 🚨 FIX 1: Changed "laborofficer" to "labor-officer" to match C# backend

  getDashboard() { 
    return this.http.get<LaborOfficerDashboard>(`${this.base}/labor-officer/dashboard`); 
  }
  
  // 🚨 FIX 2: Added "/pending" to match C# controller
  getCitizenDocs() { 
    return this.http.get<CitizenDocument[]>(`${this.base}/labor-officer/documents/citizen/pending`); 
  }
  
  getEmployerDocs() { 
    return this.http.get<EmployerDocument[]>(`${this.base}/labor-officer/documents/employer/pending`); 
  }
  
  // 🚨 FIX 3: Changed POST to PUT for all actions
  verifyCitizenDoc(id: number) { 
    return this.http.put(`${this.base}/labor-officer/documents/citizen/${id}/verify`, {}); 
  }
  
  // 🚨 FIX 4: Format string properly for C# [FromBody] string binding
  rejectCitizenDoc(id: number, reason: string) { 
    return this.http.put(`${this.base}/labor-officer/documents/citizen/${id}/reject`, JSON.stringify(reason), {
      headers: { 'Content-Type': 'application/json' }
    }); 
  }
  
  verifyEmployerDoc(id: number) { 
    return this.http.put(`${this.base}/labor-officer/documents/employer/${id}/verify`, {}); 
  }
  
  rejectEmployerDoc(id: number, reason: string) { 
    return this.http.put(`${this.base}/labor-officer/documents/employer/${id}/reject`, JSON.stringify(reason), {
      headers: { 'Content-Type': 'application/json' }
    }); 
  }
  
  getApplications() { 
    return this.http.get<Application[]>(`${this.base}/labor-officer/applications`); 
  }
  
  approveApplication(id: number) { 
    return this.http.put(`${this.base}/labor-officer/applications/${id}/approve`, {}); 
  }
  
  rejectApplication(id: number, notes: string) { 
    return this.http.put(`${this.base}/labor-officer/applications/${id}/reject`, JSON.stringify(notes), {
      headers: { 'Content-Type': 'application/json' }
    }); 
  }
  
  getAudits() { 
    return this.http.get<Audit[]>(`${this.base}/labor-officer/audits`); 
  }
  
  getCompliance() { 
    return this.http.get<ComplianceRecord[]>(`${this.base}/labor-officer/compliance`); 
  }
  
  getReports() { 
    return this.http.get<Report[]>(`${this.base}/labor-officer/reports`); 
  }
  
  generateReport(name: string, type: string) { 
    return this.http.post<Report>(`${this.base}/labor-officer/reports`, { reportName: name, reportType: type }); 
  }

  // 🚨 ADD THIS to labor-officer.service.ts
  createComplianceRecord(record: Partial<ComplianceRecord>) {
    return this.http.post(`${this.base}/labor-officer/compliance`, record);
  }
}