import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitizenService } from '../../../../core/services/citizen.service';
import { Benefit, EmploymentProgram } from '../../../../core/models/index';

@Component({
  selector: 'app-citizen-benefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './benefits.component.html'
})
export class CitizenBenefitsComponent implements OnInit {
  private svc = inject(CitizenService);

  benefits: Benefit[] = [];
  programs: EmploymentProgram[] = [];
  appliedIds = new Set<number>();
  msg = '';
  loading = true;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    // Load Active Benefits
    this.svc.getBenefits().subscribe({
      next: (res: any) => {
        // Unpack if the API wraps the array in an object to avoid NG02200
        this.benefits = Array.isArray(res) ? res : (res.benefits || res.data || []);
        this.loading = false;
      },
      error: () => (this.loading = false)
    });

    /**
     * Load Available Programs
     * Explicitly typing 'res' fixes the TS7006 "implicit any" error.
     */
    this.svc.getPrograms().subscribe({
      next: (res: any) => {
        this.programs = Array.isArray(res) ? res : (res.programs || res.data || []);
      },
      error: (err) => console.error('Failed to load programs:', err)
    });
  }

  apply(id: number) {
    this.svc.applyBenefit(id).subscribe({
      next: () => {
        this.msg = 'Application submitted!';
        this.appliedIds.add(id);
      },
      error: (e) => {
        this.msg = e?.error?.message ?? 'Error applying.';
      }
    });
  }

  statusBadge(s: string) {
    const status = s?.toLowerCase();
    if (status === 'active') return 'bs-success';
    if (status === 'pending') return 'bs-warning';
    if (status === 'rejected') return 'bs-danger';
    return 'bs-secondary';
  }
}