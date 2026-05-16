import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaborOfficerService } from '../../../../core/services/labor-officer.service';
import { CitizenDocument, EmployerDocument } from '../../../../core/models/index';

@Component({
  selector: 'app-doc-verifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-verifications.component.html'
})
export class DocumentVerificationsComponent implements OnInit {
  private svc = inject(LaborOfficerService);

  // State Properties
  citizenDocs: CitizenDocument[] = [];
  employerDocs: EmployerDocument[] = [];
  msg = '';
  activeTab = 'citizen';
  loading = true;

  // Track which documents have been clicked/viewed
  viewedDocs = new Set<number>();

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    
    // Load Citizen Docs
    this.svc.getCitizenDocs().subscribe({
      next: (d) => {
        this.citizenDocs = d;
        this.loading = false;
      },
      error: () => this.loading = false
    });

    // Load Employer Docs
    this.svc.getEmployerDocs().subscribe({
      next: (d) => this.employerDocs = d,
      error: (err) => console.error('Failed to load employer docs', err)
    });
  }

  // Helper to build the correct localhost URL for Citizens (7002)
  getCitizenDocUrl(filePath: string | undefined): string {
    if (!filePath) return '';
    if (filePath.startsWith('http')) return filePath;
    const path = filePath.startsWith('/') ? filePath : `/${filePath}`;
    return `https://localhost:7002${path}`;
  }

  // Helper to build the correct localhost URL for Employers (7003)
  getEmployerDocUrl(fileUrl: string | undefined): string {
    if (!fileUrl) return '';
    if (fileUrl.startsWith('http')) return fileUrl;
    const path = fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`;
    return `https://localhost:7003${path}`; 
  }

  // Mark a document as viewed when the link is clicked
  markAsViewed(id: number): void {
    this.viewedDocs.add(id);
  }

  verifyCitizen(id: number): void {
    this.svc.verifyCitizenDoc(id).subscribe({
      next: () => {
        this.msg = 'Citizen document verified successfully!';
        this.load();
      },
      error: (err) => console.error(err)
    });
  }

  rejectCitizen(id: number): void {
    this.svc.rejectCitizenDoc(id, 'Does not meet verification requirements.').subscribe({
      next: () => {
        this.msg = 'Citizen document rejected.';
        this.load();
      },
      error: (err) => console.error(err)
    });
  }

  verifyEmployer(id: number): void {
    this.svc.verifyEmployerDoc(id).subscribe({
      next: () => {
        this.msg = 'Employer document approved successfully!';
        this.load();
      },
      error: (err) => console.error(err)
    });
  }

  rejectEmployer(id: number): void {
    this.svc.rejectEmployerDoc(id, 'Document insufficient.').subscribe({
      next: () => {
        this.msg = 'Employer document rejected.';
        this.load();
      },
      error: (err) => console.error(err)
    });
  }
}