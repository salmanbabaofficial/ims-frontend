import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPaperPlane, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

interface BulkFeeItem {
  id: number;
  feeType: string;
  amount: number;
}

@Component({
  selector: 'app-create-bulk-challans',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './create-bulk-challans.component.html',
  styleUrl: './create-bulk-challans.component.css',
})
export class CreateBulkChallansComponent {
  readonly faPlus = faPlus;
  readonly faTrash = faTrash;
  readonly faPaperPlane = faPaperPlane;

  selectedClass = '';
  selectedSection = '';
  issueDate = '2026-06-06';
  dueDate = '2026-06-15';
  applyDiscount = false;

  readonly classOptions = ['All Classes', 'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3'];
  readonly sectionOptions = ['All Sections', 'A', 'B', 'C'];
  readonly feeTypes = ['Tuition Fee', 'Admission Fee', 'Exam Fee', 'Library Fee', 'Computer Lab Fee'];

  readonly items = signal<BulkFeeItem[]>([
    { id: 1, feeType: 'Tuition Fee', amount: 5000 },
  ]);

  addItem(): void {
    const nextId = Math.max(0, ...this.items().map((i) => i.id)) + 1;
    this.items.update((arr) => [...arr, { id: nextId, feeType: '', amount: 0 }]);
  }

  removeItem(id: number): void {
    this.items.update((arr) => arr.filter((i) => i.id !== id));
  }

  get total(): number {
    return this.items().reduce((sum, i) => sum + (i.amount || 0), 0);
  }
}
