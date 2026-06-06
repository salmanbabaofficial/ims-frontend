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
import { AddEditClassComponent, ClassFormValue } from './add-edit-class/add-edit-class.component';

interface ClassRow {
  id: number;
  name: string;
  level: string;
  displayOrder: number;
  sectionsCount: number;
  studentsCount: number;
  status: 'active' | 'inactive';
}

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

  searchTerm = '';

  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<Partial<ClassFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly classes: ClassRow[] = [
    { id: 1, name: 'Nursery', level: 'Pre-Primary', displayOrder: 1, sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 2, name: 'KG', level: 'Pre-Primary', displayOrder: 2, sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 3, name: 'Class 1', level: 'Primary', displayOrder: 3, sectionsCount: 3, studentsCount: 0, status: 'active' },
    { id: 4, name: 'Class 2', level: 'Primary', displayOrder: 4, sectionsCount: 3, studentsCount: 0, status: 'active' },
    { id: 5, name: 'Class 3', level: 'Primary', displayOrder: 5, sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 6, name: 'Class 4', level: 'Primary', displayOrder: 6, sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 7, name: 'Class 5', level: 'Middle', displayOrder: 7, sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 8, name: 'Class 6', level: 'Middle', displayOrder: 8, sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 9, name: 'Class 7', level: 'Middle', displayOrder: 9, sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 10, name: 'Class 8', level: 'Middle', displayOrder: 10, sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 11, name: 'Class 9', level: 'Secondary', displayOrder: 11, sectionsCount: 2, studentsCount: 0, status: 'active' },
    { id: 12, name: 'Class 10', level: 'Secondary', displayOrder: 12, sectionsCount: 2, studentsCount: 0, status: 'active' },
  ];

  openAdd(): void {
    this.editing.set(null);
    this.mode.set('form');
  }

  openEdit(row: ClassRow): void {
    this.editing.set({
      id: row.id,
      name: row.name,
      level: row.level,
      displayOrder: row.displayOrder,
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
