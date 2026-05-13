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
  selectedFile: File | null = null; // FIXED: Added selectedFile state
  
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

  // FIXED: Only stores the file, doesn't upload immediately
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  // FIXED: Dedicated method for the upload button
  onUpload(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('documentType', this.docType);

    this.uploading = true;
    this.svc.uploadDocument(formData).subscribe({
      next: () => {
        this.uploading = false;
        this.msg = 'Document uploaded successfully!';
        this.selectedFile = null; // Reset file selection
        this.load();
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