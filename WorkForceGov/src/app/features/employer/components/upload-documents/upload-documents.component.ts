import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployerService } from '../../../../core/services/employer.service';
import { EmployerDocument } from '../../../../core/models/index';
@Component({ selector: 'app-upload-documents', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './upload-documents.component.html' })
export class UploadDocumentsComponent implements OnInit {
  svc = inject(EmployerService); docs: EmployerDocument[] = []; docType = 'Business License';
  uploading = false; msg = ''; loading = true;
  docTypes = ['Business License','PAN Card','GST Certificate','Trade License','Company Registration','Other'];
  ngOnInit() { this.load(); }
  load() { this.svc.getDocuments().subscribe({ next: d => { this.docs = d; this.loading = false; }, error: () => this.loading = false }); }
  onFile(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]; if (!file) return;
    const fd = new FormData(); fd.append('file', file); fd.append('docType', this.docType);
    this.uploading = true;
    this.svc.uploadDocument(fd).subscribe({ next: () => { this.uploading = false; this.msg = 'Document uploaded!'; this.load(); }, error: () => { this.uploading = false; this.msg = 'Upload failed.'; } });
  }
  statusBadge(s: string) { return s==='Verified'?'bs-success':s==='Rejected'?'bs-danger':'bs-warning'; }
}
