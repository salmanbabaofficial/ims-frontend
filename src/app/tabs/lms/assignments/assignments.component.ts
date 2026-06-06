import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCalendarDay,
  faDownload,
  faEdit,
  faFileExport,
  faMagnifyingGlass,
  faPaperPlane,
  faPaperclip,
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
  status: 'active' | 'expired';
}

@Component({
  selector: 'app-assignments',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditAssignmentComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
})
export class AssignmentsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEdit = faEdit;
  readonly faTrash = faTrash;
  readonly faExport = faFileExport;
  readonly faDownload = faDownload;
  readonly faPaperclip = faPaperclip;
  readonly faCalendarDay = faCalendarDay;
  readonly faSend = faPaperPlane;

  searchTerm = '';
  selectedClass = 'all';
  selectedSubject = 'all';

  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<AssignmentFormValue | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  readonly subjectOptions = ['English', 'Urdu', 'Mathematics', 'Science', 'Islamiat'];

  readonly assignments: AssignmentRow[] = [
    { id: 1, title: 'Tense Worksheet', subject: 'English', className: 'Class 5', section: 'A', assignedOn: '01 Jun 2026', dueOn: '08 Jun 2026', totalMarks: 25, attachments: 1, status: 'active' },
    { id: 2, title: 'Algebra Practice Sheet', subject: 'Mathematics', className: 'Class 4', section: 'B', assignedOn: '28 May 2026', dueOn: '04 Jun 2026', totalMarks: 30, attachments: 2, status: 'expired' },
    { id: 3, title: 'Plants & Animals Project', subject: 'Science', className: 'Class 3', section: 'A', assignedOn: '03 Jun 2026', dueOn: '10 Jun 2026', totalMarks: 20, attachments: 3, status: 'active' },
    { id: 4, title: 'Surah Al-Fatiha Memorization', subject: 'Islamiat', className: 'Class 2', section: 'A', assignedOn: '02 Jun 2026', dueOn: '09 Jun 2026', totalMarks: 15, attachments: 0, status: 'active' },
    { id: 5, title: 'Story Writing', subject: 'Urdu', className: 'Class 5', section: 'B', assignedOn: '25 May 2026', dueOn: '01 Jun 2026', totalMarks: 30, attachments: 1, status: 'expired' },
  ];

  openAdd(): void {
    this.editing.set(null);
    this.mode.set('form');
  }

  openEdit(row: AssignmentRow): void {
    this.editing.set({
      id: row.id,
      title: row.title,
      subject: row.subject,
      className: row.className,
      section: row.section,
      assignedOn: row.assignedOn,
      dueOn: row.dueOn,
      totalMarks: row.totalMarks,
      description: '',
    });
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  toggleSearch(): void {
    this.searchOpen.update((v) => !v);
    if (this.searchOpen()) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }

  closeSearch(): void {
    if (!this.searchTerm) this.searchOpen.set(false);
  }
}
