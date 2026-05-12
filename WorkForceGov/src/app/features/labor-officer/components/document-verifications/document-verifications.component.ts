import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaborOfficerService } from '../../../../core/services/labor-officer.service';
import { CitizenDocument, EmployerDocument } from '../../../../core/models/index';
@Component({ selector: 'app-doc-verifications', standalone: true, imports: [CommonModule], templateUrl: './document-verifications.component.html' })
export class DocumentVerificationsComponent implements OnInit {
  svc = inject(LaborOfficerService); citizenDocs: CitizenDocument[] = []; employerDocs: EmployerDocument[] = [];
  msg = ''; activeTab = 'citizen'; loading = true;
  ngOnInit() { this.load(); }
  load() {
    this.svc.getCitizenDocs().subscribe({ next: d => { this.citizenDocs = d; this.loading = false; }, error: () => this.loading = false });
    this.svc.getEmployerDocs().subscribe({ next: d => this.employerDocs = d, error: () => {} });
  }
  verifyCitizen(id: number) { this.svc.verifyCitizenDoc(id).subscribe({ next: () => { this.msg = 'Verified!'; this.load(); }, error: () => {} }); }
  rejectCitizen(id: number) { this.svc.rejectCitizenDoc(id, 'Does not meet verification requirements.').subscribe({ next: () => { this.msg = 'Rejected.'; this.load(); }, error: () => {} }); }
  verifyEmployer(id: number) { this.svc.verifyEmployerDoc(id).subscribe({ next: () => { this.msg = 'Approved!'; this.load(); }, error: () => {} }); }
  rejectEmployer(id: number) { this.svc.rejectEmployerDoc(id, 'Document insufficient.').subscribe({ next: () => { this.msg = 'Rejected.'; this.load(); }, error: () => {} }); }
}
