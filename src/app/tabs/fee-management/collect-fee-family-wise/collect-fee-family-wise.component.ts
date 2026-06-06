import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPrint, faReceipt, faUsers } from '@fortawesome/free-solid-svg-icons';

interface FamilyChallan {
  id: number;
  studentName: string;
  initial: string;
  className: string;
  challanNo: string;
  amount: number;
  dueDate: string;
  selected: boolean;
}

@Component({
  selector: 'app-collect-fee-family-wise',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './collect-fee-family-wise.component.html',
  styleUrl: './collect-fee-family-wise.component.css',
})
export class CollectFeeFamilyWiseComponent {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faReceipt = faReceipt;
  readonly faPrint = faPrint;
  readonly faUsers = faUsers;

  familySearch = '';
  familyName = 'Hassan Khan Family';
  familyPhone = '0300-1111111';
  familyId = 'FAM-001';

  paymentMethod = 'cash';
  paymentDate = '2026-06-06';
  paidAmount = 0;
  remarks = '';

  readonly challans = signal<FamilyChallan[]>([
    { id: 1, studentName: 'Ali Hassan', initial: 'A', className: 'Class 1 - A', challanNo: 'CH-1001', amount: 5000, dueDate: '15 May 2026', selected: true },
    { id: 2, studentName: 'Ahmed Hassan', initial: 'A', className: 'Class 3 - B', challanNo: 'CH-1015', amount: 6000, dueDate: '15 May 2026', selected: true },
    { id: 3, studentName: 'Sara Hassan', initial: 'S', className: 'Class 5 - A', challanNo: 'CH-1029', amount: 7000, dueDate: '15 May 2026', selected: false },
  ]);

  toggleOne(id: number, value: boolean): void {
    this.challans.update((arr) => arr.map((c) => (c.id === id ? { ...c, selected: value } : c)));
  }

  get totalDue(): number {
    return this.challans().filter((c) => c.selected).reduce((sum, c) => sum + c.amount, 0);
  }

  get remaining(): number {
    return this.totalDue - (this.paidAmount || 0);
  }
}
