import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';
import { Application } from '../../../../core/models/index';
@Component({ selector: 'app-application-details', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './application-details.component.html' })
export class ApplicationDetailsComponent implements OnInit {
  svc = inject(EmployerService); route = inject(ActivatedRoute); router = inject(Router);
  app: Application | null = null; msg = signal(''); err = signal(''); id = 0; loading = true;
  ngOnInit() { this.id = Number(this.route.snapshot.paramMap.get('id')); this.reload(); }
  reload() { this.svc.getApplication(this.id).subscribe({ next: a => { this.app = a; this.loading = false; }, error: () => this.loading = false }); }
  update(status: string, notes: string) {
    this.svc.updateApplication(this.id, status, notes).subscribe({ next: () => { this.msg.set(`Application ${status.toLowerCase()}!`); this.reload(); }, error: e => this.err.set(e?.error?.message ?? 'Error.') });
  }
  statusBadge(s: string) { return s==='Approved'?'bs-success':s==='Rejected'?'bs-danger':s==='Shortlisted'?'bs-info':'bs-warning'; }
}
