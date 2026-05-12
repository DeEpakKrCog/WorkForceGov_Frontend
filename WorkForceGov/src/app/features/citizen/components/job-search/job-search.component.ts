import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CitizenService } from '../../../../core/services/citizen.service';
import { JobOpening } from '../../../../core/models/index';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-search.component.html',
  styles: [`
    .job-description {
      font-size: .82rem;
      color: #475569;
      flex: 1;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  `]
})
export class JobSearchComponent implements OnInit {
  private svc = inject(CitizenService);
  private fb = inject(FormBuilder);

  // State
  jobs: JobOpening[] = [];
  loading = true;
  applying: number | null = null;
  msg = '';
  errMsg = '';

  // Search Form
  form = this.fb.group({
    keyword: [''],
    location: [''],
    category: ['']
  });

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    const { keyword, location, category } = this.form.value;
    this.loading = true;

    this.svc.searchJobs(keyword ?? '', location ?? '', category ?? '').subscribe({
      next: (res: any) => {
        // Handle both direct array or wrapped response
        this.jobs = res.jobs || res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errMsg = 'Failed to load job listings.';
      }
    });
  }

  apply(id: number): void {
    this.applying = id;
    this.msg = '';
    this.errMsg = '';

    this.svc.applyJob(id).subscribe({
      next: () => {
        this.applying = null;
        this.msg = 'Application submitted successfully!';
      },
      error: (err) => {
        this.applying = null;
        this.errMsg = err?.error?.message ?? 'Could not apply. Already applied or job closed.';
      }
    });
  }
}