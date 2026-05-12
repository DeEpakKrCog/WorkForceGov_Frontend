import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramManagerService } from '../../../../core/services/program-manager.service';
import { Training } from '../../../../core/models/index';
@Component({ selector: 'app-training-management', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './training-management.component.html' })
export class TrainingManagementComponent implements OnInit {
  svc = inject(ProgramManagerService); trainings: Training[] = []; loading = true;
  ngOnInit() { this.svc.getTrainings().subscribe({ next: t => { this.trainings = t; this.loading = false; }, error: () => this.loading = false }); }
}
