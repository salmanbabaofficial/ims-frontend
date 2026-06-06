import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

interface BulkChallanRow {
  id: number;
  challanNo: string;
  studentName: string;
  initial: string;
  className: string;
  amount: number;
  generatedOn: string;
  selected: boolean;
}

@Component({
  selector: 'app-revert-bulk-challans',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './revert-bulk-challans.component.html',
  styleUrl: './revert-bulk-challans.component.css',
})
export class RevertBulkChallansComponent {
  readonly faRotateLeft = faRotateLeft;

  generatedDate = '2026-06-01';
  selectedClass = 'all';
  revertReason = '';

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3'];

  readonly rows = signal<BulkChallanRow[]>([
    { id: 1, challanNo: 'CH-1100', studentName: 'Ali Hassan', initial: 'A', className: 'Class 1 - A', amount: 5000, generatedOn: '01 Jun 2026', selected: true },
    { id: 2, challanNo: 'CH-1101', studentName: 'Fatima Noor', initial: 'F', className: 'Class 1 - A', amount: 5000, generatedOn: '01 Jun 2026', selected: true },
    { id: 3, challanNo: 'CH-1102', studentName: 'Ahmad Raza', initial: 'A', className: 'Class 2 - B', amount: 5000, generatedOn: '01 Jun 2026', selected: true },
    { id: 4, challanNo: 'CH-1103', studentName: 'Zainab Bibi', initial: 'Z', className: 'Class 5 - A', amount: 5000, generatedOn: '01 Jun 2026', selected: false },
  ]);

  toggleAll(value: boolean): void {
    this.rows.update((arr) => arr.map((r) => ({ ...r, selected: value })));
  }

  toggleOne(id: number, value: boolean): void {
    this.rows.update((arr) => arr.map((r) => (r.id === id ? { ...r, selected: value } : r)));
  }

  selectedCount(): number {
    return this.rows().filter((r) => r.selected).length;
  }
}
