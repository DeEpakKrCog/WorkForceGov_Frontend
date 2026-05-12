import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitizenService } from '../../../../core/services/citizen.service';
import { CitizenDocument } from '../../../../core/models/index';

@Component({
  selector: 'app-citizen-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documents.component.html'
})
export class CitizenDocumentsComponent implements OnInit {
  private svc = inject(CitizenService);

  // State Properties
  docs: CitizenDocument[] = [];
  docTypes = ['Identity', 'Qualification', 'Resume', 'Certificate', 'Other'];
  docType = 'Identity';
  
  // UI States
  uploading = false;
  loading = true;
  msg = '';

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.svc.getDocuments().subscribe({
      next: (data) => {
        this.docs = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', this.docType);

    this.uploading = true;
    this.svc.uploadDocument(formData).subscribe({
      next: () => {
        this.uploading = false;
        this.msg = 'Document uploaded successfully!';
        this.load();
        input.value = ''; // Reset file input
      },
      error: () => {
        this.uploading = false;
        this.msg = 'Upload failed. Please try again.';
      }
    });
  }

  statusBadge(status: string): string {
    switch (status) {
      case 'Verified':
        return 'bs-success';
      case 'Rejected':
        return 'bs-danger';
      default:
        return 'bs-warning';
    }
  }
}