import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
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
  referenceNo: string;
  type: string;
  description: string;
  amount: number;
  taxPercent: number | null;
  paidTo: string;
  paymentMethod: string;
  bankAccount: string;
  attachmentName: string;
  status: 'paid' | 'pending' | 'approved';
  notes: string;
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

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

  readonly searchTerm = signal('');
  readonly selectedType = signal('all');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<Partial<ExpenseFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<ExpenseRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly typeOptions = ['Office Supplies', 'Maintenance & Repairs', 'Events & Functions', 'Travel & Conveyance'];

  readonly rows = signal<ExpenseRow[]>([
    { id: 1, date: '04 Jun 2026', voucherNo: 'EXP-0021', referenceNo: '', type: 'Office Supplies', description: 'Stationery purchase', amount: 4500, taxPercent: null, paidTo: 'XYZ Stationers', paymentMethod: 'Cash', bankAccount: '', attachmentName: '', status: 'paid', notes: '' },
    { id: 2, date: '02 Jun 2026', voucherNo: 'EXP-0020', referenceNo: '', type: 'Maintenance & Repairs', description: 'Plumbing repair', amount: 8000, taxPercent: null, paidTo: 'Ahmad Plumbing', paymentMethod: 'Cash', bankAccount: '', attachmentName: '', status: 'paid', notes: '' },
    { id: 3, date: '28 May 2026', voucherNo: 'EXP-0019', referenceNo: 'CHQ-118', type: 'Events & Functions', description: 'Sports day refreshments', amount: 15000, taxPercent: null, paidTo: 'Catering Co.', paymentMethod: 'Bank Transfer', bankAccount: 'HBL - Main Account', attachmentName: '', status: 'paid', notes: '' },
    { id: 4, date: '24 May 2026', voucherNo: 'EXP-0018', referenceNo: '', type: 'Office Supplies', description: 'Printer toner', amount: 6500, taxPercent: null, paidTo: 'Print Hub', paymentMethod: 'Cash', bankAccount: '', attachmentName: '', status: 'paid', notes: '' },
  ]);

  readonly filteredRows = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const type = this.selectedType();
    return this.rows().filter((r) => {
      if (type !== 'all' && r.type !== type) {
        return false;
      }
      if (!term) {
        return true;
      }
      return (
        r.voucherNo.toLowerCase().includes(term) ||
        r.type.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term) ||
        r.paidTo.toLowerCase().includes(term)
      );
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredRows().length / this.pageSize)),
  );

  readonly pagedRows = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredRows().slice(start, start + this.pageSize);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  readonly total = computed(() =>
    this.filteredRows().reduce((sum, r) => sum + r.amount, 0),
  );

  readonly entriesCount = computed(() => this.filteredRows().length);

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: ExpenseRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: ExpenseRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: ExpenseFormValue): void {
    const current = this.rows();

    if (this.formMode() === 'edit' && value.id != null) {
      this.rows.set(
        current.map((r) => (r.id === value.id ? this.mergeRow(r, value) : r)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((r) => r.id)) + 1;
      const newRow: ExpenseRow = this.mergeRow({ id: nextId } as ExpenseRow, value);
      this.rows.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: ExpenseRow): void {
    this.deleteTarget.set(row);
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  confirmDelete(): void {
    const target = this.deleteTarget();
    if (!target) {
      return;
    }
    this.rows.set(this.rows().filter((r) => r.id !== target.id));
    this.deleteTarget.set(null);

    const total = this.totalPages();
    if (this.currentPage() > total) {
      this.currentPage.set(total);
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage.set(page);
  }

  prevPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  onTypeFilterChange(value: string): void {
    this.selectedType.set(value);
    this.currentPage.set(1);
  }

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }

  private rowToFormValue(row: ExpenseRow): ExpenseFormValue {
    return {
      id: row.id,
      date: row.date,
      voucherNo: row.voucherNo,
      referenceNo: row.referenceNo,
      type: row.type,
      description: row.description,
      amount: row.amount,
      taxPercent: row.taxPercent,
      paidTo: row.paidTo,
      paymentMethod: row.paymentMethod,
      bankAccount: row.bankAccount,
      attachmentName: row.attachmentName,
      status: row.status,
      notes: row.notes,
    };
  }

  private mergeRow(existing: ExpenseRow, value: ExpenseFormValue): ExpenseRow {
    return {
      ...existing,
      date: value.date,
      voucherNo: value.voucherNo,
      referenceNo: value.referenceNo,
      type: value.type,
      description: value.description,
      amount: value.amount ?? 0,
      taxPercent: value.taxPercent,
      paidTo: value.paidTo,
      paymentMethod: value.paymentMethod,
      bankAccount: value.bankAccount,
      attachmentName: value.attachmentName,
      status: value.status,
      notes: value.notes,
    };
  }
}
