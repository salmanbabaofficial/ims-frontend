import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditFeeTypeComponent,
  FeeTypeFormValue,
} from './add-edit-fee-type/add-edit-fee-type.component';

interface FeeTypeRow {
  id: number;
  name: string;
  code: string;
  frequency: 'monthly' | 'one-time' | 'yearly' | 'quarterly';
  defaultAmount: number;
  applicableTo: string;
  account: string;
  isMandatory: boolean;
  isRefundable: boolean;
  description: string;
  status: 'active' | 'inactive';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-fee-types',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditFeeTypeComponent],
  templateUrl: './fee-types.component.html',
  styleUrl: './fee-types.component.css',
})
export class FeeTypesComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  readonly searchTerm = signal('');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<Partial<FeeTypeFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<FeeTypeRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly rows = signal<FeeTypeRow[]>([
    { id: 1, name: 'Tuition Fee', code: 'TUITION', frequency: 'monthly', defaultAmount: 5000, applicableTo: 'All Classes', account: 'Tuition Account', isMandatory: true, isRefundable: false, description: '', status: 'active' },
    { id: 2, name: 'Admission Fee', code: 'ADM', frequency: 'one-time', defaultAmount: 10000, applicableTo: 'New Admissions', account: 'Tuition Account', isMandatory: true, isRefundable: false, description: '', status: 'active' },
    { id: 3, name: 'Exam Fee', code: 'EXAM', frequency: 'quarterly', defaultAmount: 1500, applicableTo: 'All Classes', account: 'Examination Account', isMandatory: true, isRefundable: false, description: '', status: 'active' },
    { id: 4, name: 'Library Fee', code: 'LIB', frequency: 'yearly', defaultAmount: 1000, applicableTo: 'All Classes', account: 'Library Account', isMandatory: true, isRefundable: false, description: '', status: 'active' },
    { id: 5, name: 'Computer Lab Fee', code: 'LAB', frequency: 'monthly', defaultAmount: 800, applicableTo: 'Class 4 onwards', account: 'Activity Account', isMandatory: true, isRefundable: false, description: '', status: 'active' },
    { id: 6, name: 'Transport Fee', code: 'TRANS', frequency: 'monthly', defaultAmount: 2500, applicableTo: 'Optional', account: 'Transport Account', isMandatory: false, isRefundable: false, description: '', status: 'inactive' },
  ]);

  readonly filteredRows = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.rows();
    return this.rows().filter((r) =>
      r.name.toLowerCase().includes(term) ||
      r.code.toLowerCase().includes(term) ||
      r.applicableTo.toLowerCase().includes(term) ||
      r.frequency.toLowerCase().includes(term),
    );
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filteredRows().length / this.pageSize)));
  readonly pagedRows = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredRows().slice(start, start + this.pageSize);
  });
  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: FeeTypeRow): void {
    this.editing.set({ ...row });
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: FeeTypeRow): void {
    this.editing.set({ ...row });
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: FeeTypeFormValue): void {
    const current = this.rows();
    const merged = this.mergeRow(value);

    if (this.formMode() === 'edit' && value.id != null) {
      this.rows.set(current.map((r) => (r.id === value.id ? { ...r, ...merged } : r)));
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((r) => r.id)) + 1;
      this.rows.set([...current, { ...merged, id: nextId }]);
    }
    this.backToList();
  }

  askDelete(row: FeeTypeRow): void { this.deleteTarget.set(row); }
  cancelDelete(): void { this.deleteTarget.set(null); }

  confirmDelete(): void {
    const target = this.deleteTarget();
    if (!target) return;
    this.rows.set(this.rows().filter((r) => r.id !== target.id));
    this.deleteTarget.set(null);
    if (this.currentPage() > this.totalPages()) this.currentPage.set(this.totalPages());
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }
  prevPage(): void { this.goToPage(this.currentPage() - 1); }
  nextPage(): void { this.goToPage(this.currentPage() + 1); }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }

  private mergeRow(value: FeeTypeFormValue): FeeTypeRow {
    return {
      id: value.id ?? 0,
      name: value.name,
      code: value.code,
      frequency: value.frequency,
      defaultAmount: value.defaultAmount ?? 0,
      applicableTo: value.applicableTo,
      account: value.account,
      isMandatory: value.isMandatory,
      isRefundable: value.isRefundable,
      description: value.description,
      status: value.status,
    };
  }
}
