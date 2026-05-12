import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { EmploymentProgram } from '../../../../core/models/index';
@Component({ selector: 'app-program-management', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './program-management.component.html' })
export class ProgramManagementComponent implements OnInit {
  svc = inject(ProgramManagerService); programs: EmploymentProgram[] = []; loading = true;
  ngOnInit() { this.svc.getPrograms().subscribe({ next: p => { this.programs = p; this.loading = false; }, error: () => this.loading = false }); }
}
