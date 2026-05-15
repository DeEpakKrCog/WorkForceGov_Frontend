import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { EmploymentProgram } from '../../../../core/models/index';

@Component({
  selector: 'app-program-management',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ],
  templateUrl: './program-management.component.html'
})
export class ProgramManagementComponent implements OnInit {
  private svc = inject(ProgramManagerService);

  programs: EmploymentProgram[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.loading = true;
    this.svc.getPrograms().subscribe({
      next: (p) => {
        this.programs = p;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // 🚨 NEW: Delete logic with confirmation
  deleteProgram(id: number, name: string): void {
    if (confirm(`Are you sure you want to delete the program "${name}"? This action cannot be undone.`)) {
      this.svc.deleteProgram(id).subscribe({
        next: () => {
          // Remove the deleted program from the local array instantly
          this.programs = this.programs.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Failed to delete the program. Make sure there are no active trainings or benefits tied to it.');
        }
      });
    }
  }
}