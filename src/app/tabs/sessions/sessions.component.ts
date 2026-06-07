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
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';
import {
  AddEditSessionComponent,
  SessionFormValue,
} from './add-edit-session/add-edit-session.component';

interface SessionRow {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  classes: number;
  students: number;
  status: 'active' | 'inactive';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-sessions',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditSessionComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  readonly searchTerm = signal('');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<SessionFormValue | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<SessionRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly sessions = signal<SessionRow[]>([
    { id: 1, name: '2023 - 2024', startDate: '01 Apr 2023', endDate: '31 Mar 2024', isCurrent: false, classes: 12, students: 240, status: 'inactive' },
    { id: 2, name: '2024 - 2025', startDate: '01 Apr 2024', endDate: '31 Mar 2025', isCurrent: false, classes: 12, students: 286, status: 'inactive' },
    { id: 3, name: '2025 - 2026', startDate: '01 Apr 2025', endDate: '31 Mar 2026', isCurrent: true, classes: 12, students: 312, status: 'active' },
    { id: 4, name: '2026 - 2027', startDate: '01 Apr 2026', endDate: '31 Mar 2027', isCurrent: false, classes: 0, students: 0, status: 'inactive' },
  ]);

  readonly filteredSessions = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.sessions();
    }
    return this.sessions().filter((s) =>
      s.name.toLowerCase().includes(term) ||
      s.startDate.toLowerCase().includes(term) ||
      s.endDate.toLowerCase().includes(term),
    );
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredSessions().length / this.pageSize)),
  );

  readonly pagedSessions = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredSessions().slice(start, start + this.pageSize);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: SessionRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: SessionRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: SessionFormValue): void {
    const current = this.sessions();

    if (this.formMode() === 'edit' && value.id != null) {
      this.sessions.set(
        current.map((s) => (s.id === value.id ? this.mergeRow(s, value) : s)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((s) => s.id)) + 1;
      const newRow: SessionRow = this.mergeRow(
        { id: nextId, classes: 0, students: 0 } as SessionRow,
        value,
      );
      this.sessions.set([...current, newRow]);
    }

    if (value.isCurrent) {
      this.sessions.set(
        this.sessions().map((s) => ({
          ...s,
          isCurrent: s.id === (value.id ?? Math.max(...this.sessions().map((x) => x.id))),
        })),
      );
    }

    this.backToList();
  }

  askDelete(row: SessionRow): void {
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
    this.sessions.set(this.sessions().filter((s) => s.id !== target.id));
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

  private rowToFormValue(row: SessionRow): SessionFormValue {
    return {
      id: row.id,
      name: row.name,
      startDate: row.startDate,
      endDate: row.endDate,
      isCurrent: row.isCurrent,
      status: row.status,
    };
  }

  private mergeRow(existing: SessionRow, value: SessionFormValue): SessionRow {
    return {
      ...existing,
      name: value.name,
      startDate: value.startDate,
      endDate: value.endDate,
      isCurrent: value.isCurrent,
      status: value.status,
    };
  }
}
