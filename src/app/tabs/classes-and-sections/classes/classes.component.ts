import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { AddEditClassComponent, ClassFormValue } from './add-edit-class/add-edit-class.component';

interface ClassRow {
  id: number;
  name: string;
  code: string;
  level: string;
  displayOrder: number;
  capacity: number | null;
  classTeacher: string;
  description: string;
  sectionsCount: number;
  studentsCount: number;
  status: 'active' | 'inactive';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-classes',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditClassComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
})
export class ClassesComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;
  readonly faXmark = faXmark;

  readonly searchTerm = signal('');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<Partial<ClassFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<ClassRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly classes = signal<ClassRow[]>([
    { id: 1, name: 'Nursery', code: 'NUR', level: 'Pre-Primary', displayOrder: 1, capacity: 30, classTeacher: 'Ms. Ayesha Tariq', description: '', sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 2, name: 'KG', code: 'KG', level: 'Pre-Primary', displayOrder: 2, capacity: 30, classTeacher: 'Ms. Sara Iqbal', description: '', sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 3, name: 'Class 1', code: 'CL1', level: 'Primary', displayOrder: 3, capacity: 90, classTeacher: 'Mr. Bilal Ahmad', description: '', sectionsCount: 3, studentsCount: 0, status: 'active' },
    { id: 4, name: 'Class 2', code: 'CL2', level: 'Primary', displayOrder: 4, capacity: 90, classTeacher: 'Mr. Khalid Rasheed', description: '', sectionsCount: 3, studentsCount: 0, status: 'active' },
    { id: 5, name: 'Class 3', code: 'CL3', level: 'Primary', displayOrder: 5, capacity: 60, classTeacher: '—', description: '', sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 6, name: 'Class 4', code: 'CL4', level: 'Primary', displayOrder: 6, capacity: 60, classTeacher: '—', description: '', sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 7, name: 'Class 5', code: 'CL5', level: 'Middle', displayOrder: 7, capacity: 70, classTeacher: '—', description: '', sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 8, name: 'Class 6', code: 'CL6', level: 'Middle', displayOrder: 8, capacity: 70, classTeacher: '—', description: '', sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 9, name: 'Class 7', code: 'CL7', level: 'Middle', displayOrder: 9, capacity: 70, classTeacher: '—', description: '', sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 10, name: 'Class 8', code: 'CL8', level: 'Middle', displayOrder: 10, capacity: 70, classTeacher: '—', description: '', sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 11, name: 'Class 9', code: 'CL9', level: 'Secondary', displayOrder: 11, capacity: 80, classTeacher: '—', description: '', sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 12, name: 'Class 10', code: 'CL10', level: 'Secondary', displayOrder: 12, capacity: 80, classTeacher: '—', description: '', sectionsCount: 2, studentsCount: 0, status: 'active' },
  ]);

  readonly filteredClasses = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.classes();
    }
    return this.classes().filter((c) =>
      c.name.toLowerCase().includes(term) ||
      c.code.toLowerCase().includes(term) ||
      c.level.toLowerCase().includes(term),
    );
  });

  readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.filteredClasses().length / this.pageSize));
  });

  readonly pagedClasses = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredClasses().slice(start, start + this.pageSize);
  });

  readonly pageNumbers = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: ClassRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: ClassRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: ClassFormValue): void {
    const current = this.classes();

    if (this.formMode() === 'edit' && value.id != null) {
      const updated = current.map((c) =>
        c.id === value.id ? this.mergeRow(c, value) : c,
      );
      this.classes.set(updated);
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((c) => c.id)) + 1;
      const newRow: ClassRow = this.mergeRow(
        { id: nextId, sectionsCount: 0, studentsCount: 0 } as ClassRow,
        value,
      );
      this.classes.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: ClassRow): void {
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
    this.classes.set(this.classes().filter((c) => c.id !== target.id));
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

  private rowToFormValue(row: ClassRow): ClassFormValue {
    return {
      id: row.id,
      name: row.name,
      code: row.code,
      level: row.level,
      displayOrder: row.displayOrder,
      capacity: row.capacity,
      classTeacher: row.classTeacher,
      description: row.description,
      status: row.status,
    };
  }

  private mergeRow(existing: ClassRow, value: ClassFormValue): ClassRow {
    return {
      ...existing,
      name: value.name,
      code: value.code,
      level: value.level,
      displayOrder: value.displayOrder ?? existing.displayOrder ?? 0,
      capacity: value.capacity,
      classTeacher: value.classTeacher,
      description: value.description,
      status: value.status,
    };
  }
}
