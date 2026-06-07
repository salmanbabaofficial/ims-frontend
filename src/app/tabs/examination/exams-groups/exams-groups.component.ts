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
  AddEditExamGroupComponent,
  ExamGroupFormValue,
} from './add-edit-exam-group/add-edit-exam-group.component';

interface ExamGroupRow {
  id: number;
  name: string;
  description: string;
  examCount: number;
  status: 'active' | 'inactive';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-exams-groups',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditExamGroupComponent],
  templateUrl: './exams-groups.component.html',
  styleUrl: './exams-groups.component.css',
})
export class ExamsGroupsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  readonly searchTerm = signal('');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<Partial<ExamGroupFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<ExamGroupRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly rows = signal<ExamGroupRow[]>([
    { id: 1, name: 'First Term 2026', description: 'Mid-year examinations.', examCount: 6, status: 'active' },
    { id: 2, name: 'Second Term 2026', description: 'End-of-year examinations.', examCount: 6, status: 'active' },
    { id: 3, name: 'Monthly Tests', description: 'Monthly progress evaluations.', examCount: 12, status: 'active' },
    { id: 4, name: 'Final 2025', description: 'Annual final exams.', examCount: 6, status: 'inactive' },
  ]);

  readonly filteredRows = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.rows();
    }
    return this.rows().filter((r) =>
      r.name.toLowerCase().includes(term) ||
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

  openEdit(row: ExamGroupRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: ExamGroupRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: ExamGroupFormValue): void {
    const current = this.rows();

    if (this.formMode() === 'edit' && value.id != null) {
      this.rows.set(
        current.map((r) => (r.id === value.id ? this.mergeRow(r, value) : r)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((r) => r.id)) + 1;
      const newRow: ExamGroupRow = this.mergeRow(
        { id: nextId, examCount: 0 } as ExamGroupRow,
        value,
      );
      this.rows.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: ExamGroupRow): void {
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

  private rowToFormValue(row: ExamGroupRow): ExamGroupFormValue {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      status: row.status,
    };
  }

  private mergeRow(existing: ExamGroupRow, value: ExamGroupFormValue): ExamGroupRow {
    return {
      ...existing,
      name: value.name,
      description: value.description,
      status: value.status,
    };
  }
}
