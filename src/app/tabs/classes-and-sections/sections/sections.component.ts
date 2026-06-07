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
import { AddEditSectionComponent, SectionFormValue } from './add-edit-section/add-edit-section.component';

interface SectionRow {
  id: number;
  name: string;
  className: string;
  capacity: number;
  enrolled: number;
  classTeacher: string;
  roomNumber: string;
  description: string;
  status: 'active' | 'inactive';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-sections',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditSectionComponent],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css',
})
export class SectionsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  readonly searchTerm = signal('');
  readonly selectedClass = signal<string>('all');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<Partial<SectionFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<SectionRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly classOptions = [
    'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  ];

  readonly teacherOptions = [
    '—', 'Ms. Ayesha Tariq', 'Mr. Khalid Rasheed', 'Ms. Sara Iqbal', 'Mr. Bilal Ahmad',
  ];

  readonly sections = signal<SectionRow[]>([
    { id: 1, name: 'A', className: 'Class 1', capacity: 35, enrolled: 0, classTeacher: 'Mr. Bilal Ahmad', roomNumber: 'R-101', description: '', status: 'active' },
    { id: 2, name: 'B', className: 'Class 1', capacity: 35, enrolled: 0, classTeacher: '—', roomNumber: 'R-102', description: '', status: 'active' },
    { id: 3, name: 'A', className: 'Class 2', capacity: 35, enrolled: 0, classTeacher: 'Mr. Khalid Rasheed', roomNumber: 'R-201', description: '', status: 'active' },
    { id: 4, name: 'B', className: 'Class 2', capacity: 35, enrolled: 0, classTeacher: '—', roomNumber: 'R-202', description: '', status: 'active' },
    { id: 5, name: 'A', className: 'Class 5', capacity: 40, enrolled: 0, classTeacher: '—', roomNumber: 'R-301', description: '', status: 'active' },
    { id: 6, name: 'B', className: 'Class 5', capacity: 40, enrolled: 0, classTeacher: '—', roomNumber: 'R-302', description: '', status: 'active' },
    { id: 7, name: 'A', className: 'Class 9', capacity: 45, enrolled: 0, classTeacher: '—', roomNumber: 'R-401', description: '', status: 'active' },
    { id: 8, name: 'B', className: 'Class 9', capacity: 45, enrolled: 0, classTeacher: '—', roomNumber: 'R-402', description: '', status: 'inactive' },
  ]);

  readonly filteredSections = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const cls = this.selectedClass();
    return this.sections().filter((s) => {
      const matchesClass = cls === 'all' || s.className === cls;
      if (!matchesClass) {
        return false;
      }
      if (!term) {
        return true;
      }
      return (
        s.name.toLowerCase().includes(term) ||
        s.className.toLowerCase().includes(term) ||
        s.classTeacher.toLowerCase().includes(term) ||
        s.roomNumber.toLowerCase().includes(term)
      );
    });
  });

  readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.filteredSections().length / this.pageSize));
  });

  readonly pagedSections = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredSections().slice(start, start + this.pageSize);
  });

  readonly pageNumbers = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: SectionRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: SectionRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: SectionFormValue): void {
    const current = this.sections();

    if (this.formMode() === 'edit' && value.id != null) {
      this.sections.set(
        current.map((s) => (s.id === value.id ? this.mergeRow(s, value) : s)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((s) => s.id)) + 1;
      const newRow: SectionRow = this.mergeRow(
        { id: nextId, enrolled: 0 } as SectionRow,
        value,
      );
      this.sections.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: SectionRow): void {
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
    this.sections.set(this.sections().filter((s) => s.id !== target.id));
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

  private rowToFormValue(row: SectionRow): SectionFormValue {
    return {
      id: row.id,
      className: row.className,
      name: row.name,
      capacity: row.capacity,
      classTeacher: row.classTeacher,
      roomNumber: row.roomNumber,
      description: row.description,
      status: row.status,
    };
  }

  private mergeRow(existing: SectionRow, value: SectionFormValue): SectionRow {
    return {
      ...existing,
      className: value.className,
      name: value.name,
      capacity: value.capacity ?? existing.capacity ?? 0,
      classTeacher: value.classTeacher,
      roomNumber: value.roomNumber,
      description: value.description,
      status: value.status,
    };
  }
}
