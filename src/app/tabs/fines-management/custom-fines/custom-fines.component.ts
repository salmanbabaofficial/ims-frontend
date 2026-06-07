import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditCustomFineComponent,
  CustomFineFormValue,
} from './add-edit-custom-fine/add-edit-custom-fine.component';

interface CustomFineRow {
  id: number;
  studentName: string;
  initial: string;
  className: string;
  studentId: string;
  referenceNo: string;
  fineType: string;
  amount: number;
  imposedOn: string;
  reason: string;
  issuedBy: string;
  paidDate: string;
  paymentMethod: string;
  status: 'paid' | 'unpaid';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-custom-fines',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditCustomFineComponent],
  templateUrl: './custom-fines.component.html',
  styleUrl: './custom-fines.component.css',
})
export class CustomFinesComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  readonly searchTerm = signal('');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<Partial<CustomFineFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<CustomFineRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly rows = signal<CustomFineRow[]>([
    { id: 1, studentName: 'Ali Hassan', initial: 'A', className: 'Class 1 - A', studentId: 'ADM-0001', referenceNo: 'FINE-0001', fineType: 'Misbehavior', amount: 500, imposedOn: '02 Jun 2026', reason: 'Disruptive behavior in class.', issuedBy: 'Class Teacher', paidDate: '', paymentMethod: '', status: 'unpaid' },
    { id: 2, studentName: 'Hamza Iqbal', initial: 'H', className: 'Class 9 - B', studentId: 'ADM-0002', referenceNo: 'FINE-0002', fineType: 'Late Submission', amount: 200, imposedOn: '01 Jun 2026', reason: 'Assignment not submitted on time.', issuedBy: 'Coordinator', paidDate: '03 Jun 2026', paymentMethod: 'Cash', status: 'paid' },
    { id: 3, studentName: 'Maryam Aslam', initial: 'M', className: 'Class 3 - A', studentId: 'ADM-0003', referenceNo: 'FINE-0003', fineType: 'Damaged Property', amount: 1000, imposedOn: '28 May 2026', reason: 'Broke a classroom chair.', issuedBy: 'Principal', paidDate: '', paymentMethod: '', status: 'unpaid' },
  ]);

  readonly filteredRows = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.rows();
    }
    return this.rows().filter((r) =>
      r.studentName.toLowerCase().includes(term) ||
      r.className.toLowerCase().includes(term) ||
      r.fineType.toLowerCase().includes(term) ||
      r.referenceNo.toLowerCase().includes(term),
    );
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

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: CustomFineRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: CustomFineRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: CustomFineFormValue): void {
    const current = this.rows();

    if (this.formMode() === 'edit' && value.id != null) {
      this.rows.set(
        current.map((r) => (r.id === value.id ? this.mergeRow(r, value) : r)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((r) => r.id)) + 1;
      const student = this.lookupStudent(value.studentId);
      const newRow: CustomFineRow = this.mergeRow(
        {
          id: nextId,
          studentName: student.name,
          initial: student.name.charAt(0).toUpperCase() || '?',
          className: '',
        } as CustomFineRow,
        value,
      );
      this.rows.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: CustomFineRow): void {
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

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }

  private rowToFormValue(row: CustomFineRow): CustomFineFormValue {
    return {
      id: row.id,
      referenceNo: row.referenceNo,
      studentId: row.studentId,
      fineType: row.fineType,
      amount: row.amount,
      imposedOn: row.imposedOn,
      reason: row.reason,
      issuedBy: row.issuedBy,
      paidDate: row.paidDate,
      paymentMethod: row.paymentMethod,
      status: row.status,
    };
  }

  private mergeRow(existing: CustomFineRow, value: CustomFineFormValue): CustomFineRow {
    return {
      ...existing,
      referenceNo: value.referenceNo,
      studentId: value.studentId,
      fineType: value.fineType,
      amount: value.amount ?? 0,
      imposedOn: value.imposedOn,
      reason: value.reason,
      issuedBy: value.issuedBy,
      paidDate: value.paidDate,
      paymentMethod: value.paymentMethod,
      status: value.status,
    };
  }

  private lookupStudent(studentId: string): { id: string; name: string } {
    const directory: Record<string, string> = {
      'ADM-0001': 'Ali Hassan',
      'ADM-0002': 'Fatima Noor',
      'ADM-0003': 'Ahmad Raza',
    };
    return { id: studentId, name: directory[studentId] ?? studentId };
  }
}
