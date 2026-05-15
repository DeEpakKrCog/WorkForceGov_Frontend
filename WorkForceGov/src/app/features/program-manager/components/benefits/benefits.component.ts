import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 🚨 REQUIRED FOR ngModel
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { Benefit } from '../../../../core/models/index';

@Component({
  selector: 'app-pm-benefits',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // 🚨 Added FormsModule
  templateUrl: './benefits.component.html'
})
export class PMBenefitsComponent implements OnInit {
  private svc = inject(ProgramManagerService);
  
  benefits: Benefit[] = [];
  pendingAmounts: { [benefitId: number]: number } = {}; // 🚨 Stores the amounts typed in the inputs
  msg = '';
  loading = true;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.svc.getBenefits().subscribe({
      next: (b) => {
        this.benefits = b;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // Helper for the top badge
  get pendingCount(): number {
    return this.benefits.filter(b => b.status === 'Pending').length;
  }

  // Helper for the avatar initials
  getInitials(name?: string): string {
    if (!name) return '—';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }

  approve(id: number): void {
    const amt = this.pendingAmounts[id]; // Get amount from dictionary
    if (!amt || amt <= 0) return;
    
    this.svc.approveBenefit(id, Number(amt)).subscribe({
      next: () => {
        this.msg = 'Benefit approved!';
        delete this.pendingAmounts[id]; // Clean up dictionary
        this.load();
      },
      error: () => {
        this.msg = 'Error approving benefit.';
      }
    });
  }

  reject(id: number): void {
    const reason = prompt('Enter the reason for rejection:');
    if (!reason) return;
    
    this.svc.rejectBenefit(id, reason).subscribe({
      next: () => {
        this.msg = 'Benefit rejected.';
        this.load();
      },
      error: () => {
        this.msg = 'Error rejecting benefit.';
      }
    });
  }

  statusBadge(s: string): string {
    switch (s) {
      case 'Active':
      case 'Paid':
        return 'bg-success text-white';
      case 'Pending':
        return 'bg-warning text-dark';
      case 'Rejected':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  }
}