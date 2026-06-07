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
import { AddEditExamComponent, ExamFormValue } from './add-edit-exam/add-edit-exam.component';

interface ExamRow {
  id: number;
  name: string;
  group: string;
  className: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-exams-list',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditExamComponent],
  templateUrl: './exams-list.component.html',
  styleUrl: './exams-list.component.css',
})
export class ExamsListComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  readonly searchTerm = signal('');
  readonly selectedGroup = signal<string>('all');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<Partial<ExamFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<ExamRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly groupOptions = ['First Term 2026', 'Second Term 2026', 'Monthly Tests'];
  readonly classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  readonly rows = signal<ExamRow[]>([
    { id: 1, name: 'First Term — Class 1', group: 'First Term 2026', className: 'Class 1', startDate: '10 Jun 2026', endDate: '20 Jun 2026', status: 'upcoming' },
    { id: 2, name: 'First Term — Class 2', group: 'First Term 2026', className: 'Class 2', startDate: '10 Jun 2026', endDate: '20 Jun 2026', status: 'upcoming' },
    { id: 3, name: 'May Test — Class 5', group: 'Monthly Tests', className: 'Class 5', startDate: '25 May 2026', endDate: '28 May 2026', status: 'completed' },
  ]);

  readonly filteredRows = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const group = this.selectedGroup();
    return this.rows().filter((r) => {
      const matchesGroup = group === 'all' || r.group === group;
      if (!matchesGroup) {
        return false;
      }
      if (!term) {
        return true;
      }
      return (
        r.name.toLowerCase().includes(term) ||
        r.group.toLowerCase().includes(term) ||
        r.className.toLowerCase().includes(term)
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

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: ExamRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: ExamRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: ExamFormValue): void {
    const current = this.rows();

    if (this.formMode() === 'edit' && value.id != null) {
      this.rows.set(
        current.map((r) => (r.id === value.id ? this.mergeRow(r, value) : r)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((r) => r.id)) + 1;
      const newRow: ExamRow = this.mergeRow({ id: nextId } as ExamRow, value);
      this.rows.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: ExamRow): void {
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

  onGroupFilterChange(value: string): void {
    this.selectedGroup.set(value);
    this.currentPage.set(1);
  }

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }

  statusBadge(s: ExamRow['status']): 'active' | 'pending' | 'inactive' {
    if (s === 'completed') return 'active';
    if (s === 'ongoing') return 'pending';
    return 'inactive';
  }

  private rowToFormValue(row: ExamRow): ExamFormValue {
    return {
      id: row.id,
      name: row.name,
      group: row.group,
      className: row.className,
      startDate: row.startDate,
      endDate: row.endDate,
      status: row.status,
    };
  }

  private mergeRow(existing: ExamRow, value: ExamFormValue): ExamRow {
    return {
      ...existing,
      name: value.name,
      group: value.group,
      className: value.className,
      startDate: value.startDate,
      endDate: value.endDate,
      status: value.status,
    };
  }
}
