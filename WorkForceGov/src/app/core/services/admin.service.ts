import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AdminDashboard, CreateUserRequest, Report, SystemLog, User } from '../models/index';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);
  private base = environment.apis.admin;

  getDashboard()          { return this.http.get<AdminDashboard>(`${this.base}/admin/dashboard`); }
  getUsers()              { return this.http.get<User[]>(`${this.base}/admin/users`); }
  getUserById(id: number) { return this.http.get<User>(`${this.base}/admin/users/${id}`); }
  createUser(d: CreateUserRequest) { return this.http.post<User>(`${this.base}/admin/users`, d); }
  updateUser(id: number, d: Partial<User & { password?: string }>) { return this.http.put<User>(`${this.base}/admin/users/${id}`, d); }
  deleteUser(id: number)  { return this.http.delete(`${this.base}/admin/users/${id}`); }
  getReports()            { return this.http.get<Report[]>(`${this.base}/admin/reports`); }
  generateReport(name: string, type: string) { return this.http.post<Report>(`${this.base}/admin/reports`, { reportName: name, reportType: type }); }
  getLogs()               { return this.http.get<SystemLog[]>(`${this.base}/admin/system-logs`); }
}
