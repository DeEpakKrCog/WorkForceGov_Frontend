import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface PublicJob {
  id: number;
  jobTitle: string;
  employerName?: string;
  employer?: { companyName: string };
  location: string;
  description: string;
  salaryMin: number;
  salaryMax: number;
  jobCategory?: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  private http = inject(HttpClient);

  /**
   * Fetch public job listings. This endpoint may return 404 if:
   * - The citizen API is not running
   * - The endpoint requires authentication
   * In all error cases, we fall back to static sample data silently.
   */
  getRecentJobs(): Observable<PublicJob[]> {
    return this.http
      .get<PublicJob[]>(`${environment.apis.citizen}/citizen/jobs`)
      .pipe(
        map(jobs => (jobs ?? []).slice(0, 6)),
        catchError(() => of(this._fallbackJobs()))   // ← never throws in UI
      );
  }

  private _fallbackJobs(): PublicJob[] {
    return [
      { id:1, jobTitle:'Software Engineer',     employerName:'TechCorp',    location:'New York, NY',  description:'Build citizen-facing web services using modern stack.',        salaryMin:80000,  salaryMax:120000, status:'Open', jobCategory:'Technology'  },
      { id:2, jobTitle:'Public Health Analyst', employerName:'HealthDept',  location:'Chicago, IL',   description:'Analyse public health trends and produce policy reports.',      salaryMin:60000,  salaryMax:85000,  status:'Open', jobCategory:'Healthcare'  },
      { id:3, jobTitle:'Data Scientist',        employerName:'GovAnalytics',location:'Remote',        description:'Apply machine learning to workforce and employment datasets.',   salaryMin:90000,  salaryMax:130000, status:'Open', jobCategory:'Technology'  },
      { id:4, jobTitle:'Social Worker',         employerName:'CityServices', location:'Los Angeles',  description:'Support citizens through employment and benefit programmes.',    salaryMin:50000,  salaryMax:70000,  status:'Open', jobCategory:'Social Work' },
      { id:5, jobTitle:'Environmental Officer', employerName:'EnvAgency',   location:'Seattle, WA',   description:'Monitor environmental compliance across government projects.',   salaryMin:65000,  salaryMax:90000,  status:'Open', jobCategory:'Environment' },
      { id:6, jobTitle:'Financial Auditor',     employerName:'FinanceGov',  location:'Washington DC', description:'Conduct internal audits on government employment programmes.',   salaryMin:75000,  salaryMax:105000, status:'Open', jobCategory:'Finance'     },
    ];
  }
}
