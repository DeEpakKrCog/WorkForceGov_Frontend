import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployerService } from '../../../../core/services/employer.service';
import { EmployerDocument } from '../../../../core/models/index';

@Component({
  selector: 'app-upload-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-documents.component.html'
})
export class UploadDocumentsComponent implements OnInit {
  private svc = inject(EmployerService);

  docs: EmployerDocument[] = [];
  docType = 'Business License';
  docTypes = [
    'Business License', 'PAN Card', 'GST Certificate', 
    'Trade License', 'Company Registration', 'Other'
  ];
  
  uploading = false;
  loading = true;
  msg = '';
  err = ''; // Added error tracking

  // NEW: Store the file here when selected, but don't upload yet
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.svc.getDocuments().subscribe({
      next: (d) => {
        this.docs = d;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load documents:', err);
        this.loading = false;
      }
    });
  }

  // NEW: Just record which file the user picked
  onFileSelected(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.err = ''; // Clear any previous errors
    } else {
      this.selectedFile = null;
    }
  }

  // NEW: Triggered ONLY when the "Upload" button is clicked
  upload(): void {
    if (!this.selectedFile) {
      this.err = 'Please select a file first.';
      return;
    }

    const fd = new FormData();
    fd.append('file', this.selectedFile);
    
    // CRITICAL FIX: The C# controller expects 'documentType', not 'docType'
    fd.append('documentType', this.docType);

    this.uploading = true;
    this.msg = '';
    this.err = '';

    this.svc.uploadDocument(fd).subscribe({
      next: () => {
        this.uploading = false;
        this.msg = 'Document uploaded successfully!';
        this.selectedFile = null; // Clear the selected file after success
        this.load(); // Refresh the table
      },
      error: (err) => {
        this.uploading = false;
        this.err = err.error?.message || 'Upload failed. Please try again.';
        console.error('Upload error:', err);
      }
    });
  }

  statusBadge(s: string): string {
    const statusMap: Record<string, string> = {
      'Verified': 'bs-success',
      'Rejected': 'bs-danger'
    };
    return statusMap[s] || 'bs-warning';
  }
}