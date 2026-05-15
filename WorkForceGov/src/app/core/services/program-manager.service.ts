import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  Benefit,
  EmploymentProgram,
  ProgramManagerDashboard,
  Report,
  Resource,
  Training
} from '../models/index';

@Injectable({ providedIn: 'root' })
export class ProgramManagerService {
  private http = inject(HttpClient);
  private base = environment.apis.programManager;

  // ══════════════ DASHBOARD ══════════════
  getDashboard() {
    return this.http.get<ProgramManagerDashboard>(`${this.base}/program-manager/dashboard`);
  }

  // ══════════════ PROGRAMS ══════════════
  getPrograms() {
    return this.http.get<EmploymentProgram[]>(`${this.base}/program-manager/programs`);
  }

  getProgram(id: number) {
    return this.http.get<EmploymentProgram>(`${this.base}/program-manager/programs/${id}`);
  }

  createProgram(d: Partial<EmploymentProgram>) {
    return this.http.post<EmploymentProgram>(`${this.base}/program-manager/programs`, d);
  }

  updateProgram(id: number, d: Partial<EmploymentProgram>) {
    return this.http.put<EmploymentProgram>(`${this.base}/program-manager/programs/${id}`, d);
  }

  // 🚨 NEW: Added Delete Method
  deleteProgram(id: number) {
    return this.http.delete(`${this.base}/program-manager/programs/${id}`);
  }

  // ══════════════ TRAININGS ══════════════
  getTrainings() {
    return this.http.get<Training[]>(`${this.base}/program-manager/trainings`);
  }

  getTraining(id: number) {
    return this.http.get<Training>(`${this.base}/program-manager/trainings/${id}`);
  }

  createTraining(d: Partial<Training>) {
    return this.http.post<Training>(`${this.base}/program-manager/trainings`, d);
  }

  updateTraining(id: number, d: Partial<Training>) {
    return this.http.put<Training>(`${this.base}/program-manager/trainings/${id}`, d);
  }
  // Add this under your other training methods
  deleteTraining(id: number) {
    return this.http.delete(`${this.base}/program-manager/trainings/${id}`);
  }

  // ══════════════ BENEFITS ══════════════

  getBenefits() {
    return this.http.get<Benefit[]>(`${this.base}/program-manager/benefits`);
  }

  // Swagger expects PUT and amount as a query parameter
  approveBenefit(id: number, amount: number) {
    return this.http.put(`${this.base}/program-manager/benefits/${id}/approve?amount=${amount}`, {});
  }

  // Swagger expects PUT and the reason as a raw JSON string body
  rejectBenefit(id: number, reason: string) {
    return this.http.put(`${this.base}/program-manager/benefits/${id}/reject`, JSON.stringify(reason), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  assignBenefit(
    citizenId: number,
    programId: number,
    benefitType: string,
    amount: number,
    description: string
  ) {
    const payload = { citizenId, programId, benefitType, amount, description };
    return this.http.post<Benefit>(`${this.base}/program-manager/benefits/assign`, payload);
  }

  // ══════════════ RESOURCES & REPORTS ══════════════
  getResources() {
    return this.http.get<Resource[]>(`${this.base}/program-manager/resources`);
  }
}