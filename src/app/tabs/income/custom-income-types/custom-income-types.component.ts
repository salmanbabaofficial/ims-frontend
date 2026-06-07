import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditIncomeTypeComponent,
  IncomeTypeFormValue,
} from './add-edit-income-type/add-edit-income-type.component';

interface IncomeTypeRow {
  id: number;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'inactive';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-custom-income-types',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditIncomeTypeComponent],
  templateUrl: './custom-income-types.component.html',
  styleUrl: './custom-income-types.component.css',
})
export class CustomIncomeTypesComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  readonly searchTerm = signal('');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<IncomeTypeFormValue | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<IncomeTypeRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly rows = signal<IncomeTypeRow[]>([
    { id: 1, name: 'Donations', category: 'External', description: 'Charitable donations from individuals.', status: 'active' },
    { id: 2, name: 'Sponsorships', category: 'External', description: 'Corporate sponsorships for events.', status: 'active' },
    { id: 3, name: 'Rental Income', category: 'Other', description: 'Hall and ground rental income.', status: 'active' },
    { id: 4, name: 'Book Sales', category: 'Internal', description: 'Sale of books and uniforms.', status: 'inactive' },
  ]);

  readonly filteredRows = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.rows();
    }
    return this.rows().filter((r) =>
      r.name.toLowerCase().includes(term) ||
      r.category.toLowerCase().includes(term) ||
      r.description.toLowerCase().includes(term),
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

  openEdit(row: IncomeTypeRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: IncomeTypeRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: IncomeTypeFormValue): void {
    const current = this.rows();

    if (this.formMode() === 'edit' && value.id != null) {
      this.rows.set(
        current.map((r) => (r.id === value.id ? this.mergeRow(r, value) : r)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((r) => r.id)) + 1;
      const newRow: IncomeTypeRow = this.mergeRow({ id: nextId } as IncomeTypeRow, value);
      this.rows.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: IncomeTypeRow): void {
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

  private rowToFormValue(row: IncomeTypeRow): IncomeTypeFormValue {
    return {
      id: row.id,
      name: row.name,
      category: row.category,
      description: row.description,
      status: row.status,
    };
  }

  private mergeRow(existing: IncomeTypeRow, value: IncomeTypeFormValue): IncomeTypeRow {
    return {
      ...existing,
      name: value.name,
      category: value.category,
      description: value.description,
      status: value.status,
    };
  }
}
