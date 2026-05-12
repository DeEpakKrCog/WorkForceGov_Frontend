import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Benefit, EmploymentProgram, ProgramManagerDashboard, Report, Resource, Training } from '../models/index';

@Injectable({ providedIn: 'root' })
export class ProgramManagerService {
  private http = inject(HttpClient);
  private base = environment.apis.programManager;

  getDashboard()     { return this.http.get<ProgramManagerDashboard>(`${this.base}/programmanager/dashboard`); }
  getPrograms()      { return this.http.get<EmploymentProgram[]>(`${this.base}/programmanager/programs`); }
  getProgram(id: number) { return this.http.get<EmploymentProgram>(`${this.base}/programmanager/programs/${id}`); }
  createProgram(d: Partial<EmploymentProgram>) { return this.http.post<EmploymentProgram>(`${this.base}/programmanager/programs`, d); }
  updateProgram(id: number, d: Partial<EmploymentProgram>) { return this.http.put<EmploymentProgram>(`${this.base}/programmanager/programs/${id}`, d); }
  getTrainings()     { return this.http.get<Training[]>(`${this.base}/programmanager/trainings`); }
  getTraining(id: number) { return this.http.get<Training>(`${this.base}/programmanager/trainings/${id}`); }
  createTraining(d: Partial<Training>) { return this.http.post<Training>(`${this.base}/programmanager/trainings`, d); }
  updateTraining(id: number, d: Partial<Training>) { return this.http.put<Training>(`${this.base}/programmanager/trainings/${id}`, d); }
  getBenefits()      { return this.http.get<Benefit[]>(`${this.base}/programmanager/benefits`); }
  approveBenefit(id: number, amount: number) { return this.http.post(`${this.base}/programmanager/benefits/${id}/approve`, { amount }); }
  rejectBenefit(id: number)  { return this.http.post(`${this.base}/programmanager/benefits/${id}/reject`, {}); }
  assignBenefit(citizenId: number, programId: number, benefitType: string, amount: number, description: string) {
    return this.http.post<Benefit>(`${this.base}/programmanager/benefits/assign`, { citizenId, programId, benefitType, amount, description });
  }
  getResources()     { return this.http.get<Resource[]>(`${this.base}/programmanager/resources`); }
  getReports()       { return this.http.get<Report[]>(`${this.base}/programmanager/reports`); }
  generateReport(name: string, type: string) { return this.http.post<Report>(`${this.base}/programmanager/reports`, { reportName: name, reportType: type }); }
}
