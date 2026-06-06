import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faPrint, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ChallanItem {
  id: number;
  feeType: string;
  amount: number;
  discount: number;
}

@Component({
  selector: 'app-create-single-challan',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './create-single-challan.component.html',
  styleUrl: './create-single-challan.component.css',
})
export class CreateSingleChallanComponent {
  readonly faPlus = faPlus;
  readonly faTrash = faTrash;
  readonly faSave = faSave;
  readonly faPrint = faPrint;

  challanNo = 'CH-1042';
  studentSearch = '';
  selectedStudentId = '';
  issueDate = '2026-06-06';
  dueDate = '2026-06-15';
  remarks = '';

  readonly feeTypes = ['Tuition Fee', 'Admission Fee', 'Exam Fee', 'Library Fee', 'Computer Lab Fee', 'Transport Fee'];

  readonly students = [
    { id: 'ADM-0001', name: 'Ali Hassan', className: 'Class 1 - A', fatherName: 'Hassan Khan' },
    { id: 'ADM-0002', name: 'Fatima Noor', className: 'Class 1 - A', fatherName: 'Noor Ahmed' },
    { id: 'ADM-0003', name: 'Ahmad Raza', className: 'Class 2 - B', fatherName: 'Raza Hussain' },
  ];

  readonly items = signal<ChallanItem[]>([
    { id: 1, feeType: 'Tuition Fee', amount: 5000, discount: 0 },
    { id: 2, feeType: 'Exam Fee', amount: 1500, discount: 0 },
  ]);

  addItem(): void {
    const nextId = Math.max(0, ...this.items().map((i) => i.id)) + 1;
    this.items.update((arr) => [...arr, { id: nextId, feeType: '', amount: 0, discount: 0 }]);
  }

  removeItem(id: number): void {
    this.items.update((arr) => arr.filter((i) => i.id !== id));
  }

  get subtotal(): number {
    return this.items().reduce((sum, i) => sum + (i.amount || 0), 0);
  }

  get discountTotal(): number {
    return this.items().reduce((sum, i) => sum + (i.discount || 0), 0);
  }

  get netAmount(): number {
    return this.subtotal - this.discountTotal;
  }
}
