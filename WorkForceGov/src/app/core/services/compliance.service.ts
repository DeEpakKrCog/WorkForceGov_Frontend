import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Complaint, ComplianceDashboard, ComplianceRecord, Report } from '../models/index';

@Injectable({ providedIn: 'root' })
export class ComplianceService {
  private http = inject(HttpClient);
  private base = environment.apis.complianceOfficer;

  getDashboard()    { return this.http.get<ComplianceDashboard>(`${this.base}/complianceofficer/dashboard`); }
  getEmployers()    { return this.http.get<any[]>(`${this.base}/complianceofficer/employers`); }
  getComplaints()   { return this.http.get<Complaint[]>(`${this.base}/complianceofficer/complaints`); }
  resolveComplaint(id: number, resolution: string) { return this.http.post(`${this.base}/complianceofficer/complaints/${id}/resolve`, { resolution }); }
  getRecords()      { return this.http.get<ComplianceRecord[]>(`${this.base}/complianceofficer/records`); }
  getReports()      { return this.http.get<Report[]>(`${this.base}/complianceofficer/reports`); }
}
