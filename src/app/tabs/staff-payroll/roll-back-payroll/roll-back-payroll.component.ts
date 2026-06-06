import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faRotateLeft, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

interface PayrollBatch {
  id: number;
  month: string;
  generatedOn: string;
  staffCount: number;
  totalAmount: number;
  status: 'paid' | 'generated';
}

@Component({
  selector: 'app-roll-back-payroll',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './roll-back-payroll.component.html',
  styleUrl: './roll-back-payroll.component.css',
})
export class RollBackPayrollComponent {
  readonly faRotateLeft = faRotateLeft;
  readonly faTriangleExclamation = faTriangleExclamation;

  selectedBatch = 1;
  reason = '';

  readonly batches: PayrollBatch[] = [
    { id: 1, month: 'June 2026', generatedOn: '01 Jun 2026', staffCount: 26, totalAmount: 1240000, status: 'generated' },
    { id: 2, month: 'May 2026', generatedOn: '01 May 2026', staffCount: 26, totalAmount: 1208000, status: 'paid' },
    { id: 3, month: 'April 2026', generatedOn: '01 Apr 2026', staffCount: 25, totalAmount: 1180000, status: 'paid' },
  ];
}
