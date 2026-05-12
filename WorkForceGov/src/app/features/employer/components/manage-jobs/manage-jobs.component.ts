import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';
import { JobOpening } from '../../../../core/models/index';
@Component({ selector: 'app-manage-jobs', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './manage-jobs.component.html' })
export class ManageJobsComponent implements OnInit {
  svc = inject(EmployerService); jobs: JobOpening[] = []; msg = ''; loading = true;
  ngOnInit() { this.load(); }
  load() { this.svc.getJobs().subscribe({ next: j => { this.jobs = j; this.loading = false; }, error: () => this.loading = false }); }
  close(id: number) { if (!confirm('Close this job posting?')) return; this.svc.closeJob(id).subscribe({ next: () => { this.msg = 'Job closed.'; this.load(); }, error: () => {} }); }
}
