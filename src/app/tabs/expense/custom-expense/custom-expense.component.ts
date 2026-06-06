import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faFileExport, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditExpenseComponent,
  ExpenseFormValue,
} from './add-edit-expense/add-edit-expense.component';

interface ExpenseRow {
  id: number;
  date: string;
  voucherNo: string;
  type: string;
  description: string;
  amount: number;
  paidTo: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-custom-expense',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditExpenseComponent],
  templateUrl: './custom-expense.component.html',
  styleUrl: './custom-expense.component.css',
})
export class CustomExpenseComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;
  readonly faFileExport = faFileExport;

  searchTerm = '';
  selectedType = 'all';

  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<Partial<ExpenseFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly typeOptions = ['Office Supplies', 'Maintenance & Repairs', 'Events & Functions', 'Travel & Conveyance'];

  readonly rows: ExpenseRow[] = [
    { id: 1, date: '04 Jun 2026', voucherNo: 'EXP-0021', type: 'Office Supplies', description: 'Stationery purchase', amount: 4500, paidTo: 'XYZ Stationers', paymentMethod: 'Cash' },
    { id: 2, date: '02 Jun 2026', voucherNo: 'EXP-0020', type: 'Maintenance & Repairs', description: 'Plumbing repair', amount: 8000, paidTo: 'Ahmad Plumbing', paymentMethod: 'Cash' },
    { id: 3, date: '28 May 2026', voucherNo: 'EXP-0019', type: 'Events & Functions', description: 'Sports day refreshments', amount: 15000, paidTo: 'Catering Co.', paymentMethod: 'Bank' },
    { id: 4, date: '24 May 2026', voucherNo: 'EXP-0018', type: 'Office Supplies', description: 'Printer toner', amount: 6500, paidTo: 'Print Hub', paymentMethod: 'Cash' },
  ];

  openAdd(): void { this.editing.set(null); this.mode.set('form'); }
  openEdit(row: ExpenseRow): void {
    this.editing.set({
      id: row.id,
      date: row.date,
      voucherNo: row.voucherNo,
      type: row.type,
      description: row.description,
      amount: row.amount,
      paidTo: row.paidTo,
      paymentMethod: row.paymentMethod,
    });
    this.mode.set('form');
  }
  backToList(): void { this.mode.set('list'); this.editing.set(null); }
  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }

  get total(): number {
    return this.rows.reduce((sum, r) => sum + r.amount, 0);
  }
}
