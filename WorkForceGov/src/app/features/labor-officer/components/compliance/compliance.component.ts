import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🚨 REQUIRED for form inputs
import { LaborOfficerService } from '../../../../core/services/labor-officer.service';
import { ComplianceRecord } from '../../../../core/models/index';

@Component({
  selector: 'app-lo-compliance',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🚨 Added FormsModule here
  templateUrl: './compliance.component.html'
})
export class LOComplianceComponent implements OnInit {
  private svc = inject(LaborOfficerService);

  // State Properties
  records: ComplianceRecord[] = [];
  loading = true;
  showForm = false; // Toggles the new record form
  msg = '';

  // Data model for the new form
  newRecord: Partial<ComplianceRecord> = {
    entityId: null as any,
    type: 'Employer',
    result: 'Compliant',
    notes: ''
  };

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.loading = true;
    this.svc.getCompliance().subscribe({
      next: (r) => {
        this.records = r;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load compliance records', err);
        this.loading = false;
      }
    });
  }

  saveRecord(): void {
    if (!this.newRecord.entityId) {
      this.msg = 'Please enter an Entity ID.';
      return;
    }

    this.svc.createComplianceRecord(this.newRecord).subscribe({
      next: () => {
        this.msg = 'Compliance record saved successfully!';
        this.showForm = false; // Hide form
        this.newRecord = { entityId: null as any, type: 'Employer', result: 'Compliant', notes: '' }; // Reset form
        this.loadRecords(); // Refresh table
      },
      error: (err) => {
        console.error('Failed to save record', err);
        this.msg = 'Error saving compliance record.';
      }
    });
  }

  resultBadge(result: string): string {
    switch (result) {
      case 'Compliant':
        return 'bs-success';
      case 'Non-Compliant':
        return 'bs-danger';
      case 'Under Review':
      default:
        return 'bs-warning';
    }
  }
}