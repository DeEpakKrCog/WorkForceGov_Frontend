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

  docs: CitizenDocument[] = [];
  docTypes = ['Identity', 'Qualification', 'Resume', 'Certificate', 'Other'];
  docType = 'Identity';
  selectedFile: File | null = null;
  
  uploading = false;
  loading = true;
  msg = '';
  err = '';

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
        this.err = 'Failed to load documents.';
      }
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
    this.err = ''; 
    this.msg = '';
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.err = 'Please select a file first.';
      return;
    }

    // Keys here must match the [FromForm] DocumentUploadRequest properties in C#
    const formData = new FormData();
    formData.append('File', this.selectedFile); 
    formData.append('DocumentType', this.docType);

    this.uploading = true;
    this.msg = '';
    this.err = '';

    this.svc.uploadDocument(formData).subscribe({
      next: () => {
        this.uploading = false;
        this.msg = 'Document uploaded successfully!';
        this.selectedFile = null;
        this.load(); 
      },
      error: (error) => {
        this.uploading = false;
        this.err = error.error?.message || 'Upload failed. Ensure the file is not too large.';
      }
    });
  }

  statusBadge(status: string): string {
    switch (status) {
      case 'Verified': return 'bg-success';
      case 'Rejected': return 'bg-danger';
      default: return 'bg-warning text-dark';
    }
  }
}