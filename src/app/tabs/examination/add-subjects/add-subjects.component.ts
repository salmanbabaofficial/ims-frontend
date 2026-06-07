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
  AddEditSubjectComponent,
  SubjectFormValue,
} from './add-edit-subject/add-edit-subject.component';

interface SubjectRow {
  id: number;
  code: string;
  name: string;
  className: string;
  totalMarks: number;
  passingMarks: number;
  isOptional: boolean;
  status: 'active' | 'inactive';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-add-subjects',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditSubjectComponent],
  templateUrl: './add-subjects.component.html',
  styleUrl: './add-subjects.component.css',
})
export class AddSubjectsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  readonly searchTerm = signal('');
  readonly selectedClass = signal<string>('all');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<Partial<SubjectFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<SubjectRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly classOptions = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  ];

  readonly rows = signal<SubjectRow[]>([
    { id: 1, code: 'ENG-01', name: 'English', className: 'Class 1', totalMarks: 100, passingMarks: 40, isOptional: false, status: 'active' },
    { id: 2, code: 'URD-01', name: 'Urdu', className: 'Class 1', totalMarks: 100, passingMarks: 40, isOptional: false, status: 'active' },
    { id: 3, code: 'MATH-01', name: 'Mathematics', className: 'Class 1', totalMarks: 100, passingMarks: 40, isOptional: false, status: 'active' },
    { id: 4, code: 'SCI-01', name: 'Science', className: 'Class 1', totalMarks: 100, passingMarks: 40, isOptional: false, status: 'active' },
    { id: 5, code: 'ISL-01', name: 'Islamiat', className: 'Class 1', totalMarks: 50, passingMarks: 20, isOptional: false, status: 'active' },
    { id: 6, code: 'ART-01', name: 'Art & Craft', className: 'Class 1', totalMarks: 50, passingMarks: 20, isOptional: true, status: 'active' },
  ]);

  readonly filteredRows = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const cls = this.selectedClass();
    return this.rows().filter((r) => {
      const matchesClass = cls === 'all' || r.className === cls;
      if (!matchesClass) {
        return false;
      }
      if (!term) {
        return true;
      }
      return (
        r.code.toLowerCase().includes(term) ||
        r.name.toLowerCase().includes(term) ||
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

  openEdit(row: SubjectRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: SubjectRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: SubjectFormValue): void {
    const current = this.rows();

    if (this.formMode() === 'edit' && value.id != null) {
      this.rows.set(
        current.map((r) => (r.id === value.id ? this.mergeRow(r, value) : r)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((r) => r.id)) + 1;
      const newRow: SubjectRow = this.mergeRow({ id: nextId } as SubjectRow, value);
      this.rows.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: SubjectRow): void {
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

  onClassFilterChange(value: string): void {
    this.selectedClass.set(value);
    this.currentPage.set(1);
  }

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }

  private rowToFormValue(row: SubjectRow): SubjectFormValue {
    return {
      id: row.id,
      code: row.code,
      name: row.name,
      className: row.className,
      totalMarks: row.totalMarks,
      passingMarks: row.passingMarks,
      isOptional: row.isOptional,
      status: row.status,
    };
  }

  private mergeRow(existing: SubjectRow, value: SubjectFormValue): SubjectRow {
    return {
      ...existing,
      code: value.code,
      name: value.name,
      className: value.className,
      totalMarks: value.totalMarks ?? existing.totalMarks ?? 0,
      passingMarks: value.passingMarks ?? existing.passingMarks ?? 0,
      isOptional: value.isOptional,
      status: value.status,
    };
  }
}
