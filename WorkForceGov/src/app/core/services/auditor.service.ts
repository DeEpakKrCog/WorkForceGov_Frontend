import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Audit, AuditorDashboard, ComplianceRecord, EmploymentProgram, Notification, Report } from '../models/index';

@Injectable({ providedIn: 'root' })
export class AuditorService {
  private http = inject(HttpClient);
  private base = environment.apis.govAuditor; // Expected to be your base URL (e.g., https://localhost:7006/api)

  // ═══════════════════════════════════════════════════════════════════
  //  DASHBOARD & MONITORING
  // ═══════════════════════════════════════════════════════════════════

  getDashboard(): Observable<AuditorDashboard> { 
    return this.http.get<AuditorDashboard>(`${this.base}/auditor/dashboard`); 
  }

  getCompliance(): Observable<ComplianceRecord[]> { 
    return this.http.get<ComplianceRecord[]>(`${this.base}/auditor/compliance`); 
  }

  getPrograms(): Observable<EmploymentProgram[]> { 
    return this.http.get<EmploymentProgram[]>(`${this.base}/auditor/programs`); 
  }

  getAlerts(): Observable<Notification[]> { 
    return this.http.get<Notification[]>(`${this.base}/auditor/notifications`); // Matches controller [HttpGet("notifications")]
  }

  // ═══════════════════════════════════════════════════════════════════
  //  AUDIT MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════

  getAudits(): Observable<Audit[]> { 
    return this.http.get<Audit[]>(`${this.base}/auditor/audits`); 
  }

  /**
   * Matches backend: [HttpPost("audits")] 
   * Expects 'scope' via Query string and 'findings' via JSON string Body
   */
  createAudit(auditData: { scope: string; findings: string }): Observable<Audit> { 
    const params = { scope: auditData.scope || '' };
    const body = auditData.findings || '';
    
    return this.http.post<Audit>(`${this.base}/auditor/audits`, JSON.stringify(body), {
      params,
      headers: { 'Content-Type': 'application/json' }
    }); 
  }

  // ═══════════════════════════════════════════════════════════════════
  //  REPORTS MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════

  getReports(): Observable<Report[]> { 
    return this.http.get<Report[]>(`${this.base}/auditor/reports`); 
  }

  /**
   * Matches backend: [HttpPost("reports")]
   * Expects 'reportName' and 'reportType' via Query string, and content via JSON string Body
   */
  generateReport(reportData: { reportName: string; reportType: string; content: string }): Observable<Report> {
    const params = {
      reportName: reportData.reportName,
      reportType: reportData.reportType
    };
    const body = reportData.content || '';

    return this.http.post<Report>(`${this.base}/auditor/reports`, JSON.stringify(body), {
      params,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}