import { Component, ElementRef, signal, viewChild } from '@angular/core';
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
  status: 'active' | 'inactive';
}

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

  searchTerm = '';
  selectedClass = 'all';

  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<Partial<SectionFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly classOptions = [
    'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  ];

  readonly teacherOptions = ['—'];

  readonly sections: SectionRow[] = [
    { id: 1, name: 'A', className: 'Class 1', capacity: 35, enrolled: 0, classTeacher: '—', status: 'active' },
    { id: 2, name: 'B', className: 'Class 1', capacity: 35, enrolled: 0, classTeacher: '—', status: 'active' },
    { id: 3, name: 'A', className: 'Class 2', capacity: 35, enrolled: 0, classTeacher: '—', status: 'active' },
    { id: 4, name: 'B', className: 'Class 2', capacity: 35, enrolled: 0, classTeacher: '—', status: 'active' },
    { id: 5, name: 'A', className: 'Class 5', capacity: 40, enrolled: 0, classTeacher: '—', status: 'active' },
    { id: 6, name: 'B', className: 'Class 5', capacity: 40, enrolled: 0, classTeacher: '—', status: 'active' },
    { id: 7, name: 'A', className: 'Class 9', capacity: 45, enrolled: 0, classTeacher: '—', status: 'active' },
    { id: 8, name: 'B', className: 'Class 9', capacity: 45, enrolled: 0, classTeacher: '—', status: 'inactive' },
  ];

  openAdd(): void {
    this.editing.set(null);
    this.mode.set('form');
  }

  openEdit(row: SectionRow): void {
    this.editing.set({
      id: row.id,
      className: row.className,
      name: row.name,
      capacity: row.capacity,
      classTeacher: row.classTeacher,
      status: row.status,
    });
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }
}
