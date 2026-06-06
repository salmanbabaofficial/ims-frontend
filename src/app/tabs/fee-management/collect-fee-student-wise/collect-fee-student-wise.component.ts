import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPrint, faReceipt } from '@fortawesome/free-solid-svg-icons';

interface OutstandingChallan {
  id: number;
  challanNo: string;
  month: string;
  dueDate: string;
  amount: number;
  status: 'unpaid' | 'partial' | 'paid';
  selected: boolean;
}

@Component({
  selector: 'app-collect-fee-student-wise',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './collect-fee-student-wise.component.html',
  styleUrl: './collect-fee-student-wise.component.css',
})
export class CollectFeeStudentWiseComponent {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faReceipt = faReceipt;
  readonly faPrint = faPrint;

  studentSearch = '';
  selectedStudent: { id: string; name: string; className: string; fatherName: string; phone: string } | null = {
    id: 'ADM-0001',
    name: 'Ali Hassan',
    className: 'Class 1 - A',
    fatherName: 'Hassan Khan',
    phone: '0300-1111111',
  };

  paymentMethod = 'cash';
  paymentDate = '2026-06-06';
  paidAmount = 0;
  receivedBy = 'Admin';
  remarks = '';

  readonly challans = signal<OutstandingChallan[]>([
    { id: 1, challanNo: 'CH-1001', month: 'Apr 2026', dueDate: '15 Apr 2026', amount: 5000, status: 'unpaid', selected: true },
    { id: 2, challanNo: 'CH-1002', month: 'May 2026', dueDate: '15 May 2026', amount: 5000, status: 'partial', selected: true },
    { id: 3, challanNo: 'CH-1003', month: 'Jun 2026', dueDate: '15 Jun 2026', amount: 5000, status: 'unpaid', selected: false },
  ]);

  toggleOne(id: number, value: boolean): void {
    this.challans.update((arr) => arr.map((c) => (c.id === id ? { ...c, selected: value } : c)));
  }

  get totalDue(): number {
    return this.challans()
      .filter((c) => c.selected)
      .reduce((sum, c) => sum + c.amount, 0);
  }

  get remaining(): number {
    return this.totalDue - (this.paidAmount || 0);
  }
}
