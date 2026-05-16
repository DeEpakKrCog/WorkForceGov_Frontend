import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditorService } from '../../../../core/services/auditor.service';
import { EmploymentProgram } from '../../../../core/models/index';

@Component({
  selector: 'app-ga-workforce-programs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workforce-programs.component.html'
})
export class GAWorkforceProgramsComponent implements OnInit {
  svc = inject(AuditorService);
  
  programs: EmploymentProgram[] = [];
  loading = true;

  ngOnInit(): void {
    this.svc.getPrograms().subscribe({
      next: (p) => {
        this.programs = p;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load programs', err);
        this.loading = false;
      }
    });
  }
}