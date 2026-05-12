import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { Resource } from '../../../../core/models/index';
@Component({ selector: 'app-resource-management', standalone: true, imports: [CommonModule], templateUrl: './resource-management.component.html' })
export class ResourceManagementComponent implements OnInit {
  svc = inject(ProgramManagerService); resources: Resource[] = []; loading = true;
  ngOnInit() { this.svc.getResources().subscribe({ next: r => { this.resources = r; this.loading = false; }, error: () => this.loading = false }); }
  get totalQty() { return this.resources.reduce((s, r) => s + r.quantity, 0); }
}
