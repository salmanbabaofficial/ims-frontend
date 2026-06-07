import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faFileExport, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditIncomeComponent,
  IncomeFormValue,
} from './add-edit-income/add-edit-income.component';

interface IncomeRow {
  id: number;
  date: string;
  voucherNo: string;
  referenceNo: string;
  type: string;
  description: string;
  amount: number;
  taxPercent: number | null;
  receivedFrom: string;
  paymentMethod: string;
  bankAccount: string;
  attachmentName: string;
  status: 'received' | 'pending';
  notes: string;
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-custom-income',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditIncomeComponent],
  templateUrl: './custom-income.component.html',
  styleUrl: './custom-income.component.css',
})
export class CustomIncomeComponent {
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
  readonly editing = signal<Partial<IncomeFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<IncomeRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly typeOptions = ['Donations', 'Sponsorships', 'Rental Income', 'Book Sales'];

  readonly rows = signal<IncomeRow[]>([
    { id: 1, date: '04 Jun 2026', voucherNo: 'INC-0102', referenceNo: '', type: 'Donations', description: 'Eid donation drive', amount: 50000, taxPercent: null, receivedFrom: 'Anonymous', paymentMethod: 'Cash', bankAccount: '', attachmentName: '', status: 'received', notes: '' },
    { id: 2, date: '02 Jun 2026', voucherNo: 'INC-0101', referenceNo: '', type: 'Sponsorships', description: 'Sports day sponsor', amount: 75000, taxPercent: null, receivedFrom: 'ABC Corp', paymentMethod: 'Bank Transfer', bankAccount: 'HBL - Main Account', attachmentName: '', status: 'received', notes: '' },
    { id: 3, date: '30 May 2026', voucherNo: 'INC-0100', referenceNo: 'CHQ-220', type: 'Rental Income', description: 'Hall rental for event', amount: 30000, taxPercent: null, receivedFrom: 'XYZ Society', paymentMethod: 'Cheque', bankAccount: 'HBL - Main Account', attachmentName: '', status: 'received', notes: '' },
    { id: 4, date: '25 May 2026', voucherNo: 'INC-0099', referenceNo: '', type: 'Book Sales', description: 'Sale of stationery', amount: 12000, taxPercent: null, receivedFrom: 'Walk-in Customers', paymentMethod: 'Cash', bankAccount: '', attachmentName: '', status: 'received', notes: '' },
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
        r.receivedFrom.toLowerCase().includes(term)
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

  openEdit(row: IncomeRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: IncomeRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: IncomeFormValue): void {
    const current = this.rows();

    if (this.formMode() === 'edit' && value.id != null) {
      this.rows.set(
        current.map((r) => (r.id === value.id ? this.mergeRow(r, value) : r)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((r) => r.id)) + 1;
      const newRow: IncomeRow = this.mergeRow({ id: nextId } as IncomeRow, value);
      this.rows.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: IncomeRow): void {
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

  private rowToFormValue(row: IncomeRow): IncomeFormValue {
    return {
      id: row.id,
      date: row.date,
      voucherNo: row.voucherNo,
      referenceNo: row.referenceNo,
      type: row.type,
      description: row.description,
      amount: row.amount,
      taxPercent: row.taxPercent,
      receivedFrom: row.receivedFrom,
      paymentMethod: row.paymentMethod,
      bankAccount: row.bankAccount,
      attachmentName: row.attachmentName,
      status: row.status,
      notes: row.notes,
    };
  }

  private mergeRow(existing: IncomeRow, value: IncomeFormValue): IncomeRow {
    return {
      ...existing,
      date: value.date,
      voucherNo: value.voucherNo,
      referenceNo: value.referenceNo,
      type: value.type,
      description: value.description,
      amount: value.amount ?? 0,
      taxPercent: value.taxPercent,
      receivedFrom: value.receivedFrom,
      paymentMethod: value.paymentMethod,
      bankAccount: value.bankAccount,
      attachmentName: value.attachmentName,
      status: value.status,
      notes: value.notes,
    };
  }
}
