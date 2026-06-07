import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCalendarDay,
  faDownload,
  faEye,
  faFileExport,
  faMagnifyingGlass,
  faPaperPlane,
  faPaperclip,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { AddEditAssignmentComponent, AssignmentFormValue } from './add-edit-assignment/add-edit-assignment.component';

export interface AssignmentRow {
  id: number;
  title: string;
  subject: string;
  className: string;
  section: string;
  assignedOn: string;
  dueOn: string;
  totalMarks: number;
  attachments: number;
  description: string;
  status: 'active' | 'expired';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-assignments',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditAssignmentComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
})
export class AssignmentsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faEdit = faPenToSquare;
  readonly faTrash = faTrash;
  readonly faExport = faFileExport;
  readonly faDownload = faDownload;
  readonly faPaperclip = faPaperclip;
  readonly faCalendarDay = faCalendarDay;
  readonly faSend = faPaperPlane;

  readonly searchTerm = signal('');
  readonly selectedClass = signal<string>('all');
  readonly selectedSubject = signal<string>('all');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<AssignmentFormValue | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<AssignmentRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  readonly subjectOptions = ['English', 'Urdu', 'Mathematics', 'Science', 'Islamiat'];

  readonly assignments = signal<AssignmentRow[]>([
    { id: 1, title: 'Tense Worksheet', subject: 'English', className: 'Class 5', section: 'A', assignedOn: '01 Jun 2026', dueOn: '08 Jun 2026', totalMarks: 25, attachments: 1, description: '', status: 'active' },
    { id: 2, title: 'Algebra Practice Sheet', subject: 'Mathematics', className: 'Class 4', section: 'B', assignedOn: '28 May 2026', dueOn: '04 Jun 2026', totalMarks: 30, attachments: 2, description: '', status: 'expired' },
    { id: 3, title: 'Plants & Animals Project', subject: 'Science', className: 'Class 3', section: 'A', assignedOn: '03 Jun 2026', dueOn: '10 Jun 2026', totalMarks: 20, attachments: 3, description: '', status: 'active' },
    { id: 4, title: 'Surah Al-Fatiha Memorization', subject: 'Islamiat', className: 'Class 2', section: 'A', assignedOn: '02 Jun 2026', dueOn: '09 Jun 2026', totalMarks: 15, attachments: 0, description: '', status: 'active' },
    { id: 5, title: 'Story Writing', subject: 'Urdu', className: 'Class 5', section: 'B', assignedOn: '25 May 2026', dueOn: '01 Jun 2026', totalMarks: 30, attachments: 1, description: '', status: 'expired' },
  ]);

  readonly filteredAssignments = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const cls = this.selectedClass();
    const subj = this.selectedSubject();
    return this.assignments().filter((a) => {
      if (cls !== 'all' && a.className !== cls) return false;
      if (subj !== 'all' && a.subject !== subj) return false;
      if (!term) return true;
      return (
        a.title.toLowerCase().includes(term) ||
        a.subject.toLowerCase().includes(term) ||
        a.className.toLowerCase().includes(term)
      );
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredAssignments().length / this.pageSize)),
  );

  readonly pagedAssignments = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredAssignments().slice(start, start + this.pageSize);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: AssignmentRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: AssignmentRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: AssignmentFormValue): void {
    const current = this.assignments();

    if (this.formMode() === 'edit' && value.id != null) {
      this.assignments.set(
        current.map((a) => (a.id === value.id ? this.mergeRow(a, value) : a)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((a) => a.id)) + 1;
      const newRow: AssignmentRow = this.mergeRow(
        { id: nextId, attachments: 0, status: 'active' } as AssignmentRow,
        value,
      );
      this.assignments.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: AssignmentRow): void {
    this.deleteTarget.set(row);
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  confirmDelete(): void {
    const target = this.deleteTarget();
    if (!target) return;
    this.assignments.set(this.assignments().filter((a) => a.id !== target.id));
    this.deleteTarget.set(null);
    if (this.currentPage() > this.totalPages()) {
      this.currentPage.set(this.totalPages());
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
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

  onSubjectFilterChange(value: string): void {
    this.selectedSubject.set(value);
    this.currentPage.set(1);
  }

  toggleSearch(): void {
    this.searchOpen.update((v) => !v);
    if (this.searchOpen()) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }

  closeSearch(): void {
    if (!this.searchTerm()) this.searchOpen.set(false);
  }

  private rowToFormValue(row: AssignmentRow): AssignmentFormValue {
    return {
      id: row.id,
      title: row.title,
      subject: row.subject,
      className: row.className,
      section: row.section,
      assignedOn: row.assignedOn,
      dueOn: row.dueOn,
      totalMarks: row.totalMarks,
      description: row.description,
    };
  }

  private mergeRow(existing: AssignmentRow, value: AssignmentFormValue): AssignmentRow {
    return {
      ...existing,
      title: value.title,
      subject: value.subject,
      className: value.className,
      section: value.section,
      assignedOn: value.assignedOn,
      dueOn: value.dueOn,
      totalMarks: value.totalMarks ?? 0,
      description: value.description,
    };
  }
}
