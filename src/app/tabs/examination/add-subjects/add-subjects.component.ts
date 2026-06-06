import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

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

@Component({
  selector: 'app-add-subjects',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective],
  templateUrl: './add-subjects.component.html',
  styleUrl: './add-subjects.component.css',
})
export class AddSubjectsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';
  showForm = signal(false);
  selectedClass = 'all';

  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  newSubject = { code: '', name: '', className: '', totalMarks: 100, passingMarks: 40, isOptional: false };

  readonly classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  readonly rows: SubjectRow[] = [
    { id: 1, code: 'ENG-01', name: 'English', className: 'Class 1', totalMarks: 100, passingMarks: 40, isOptional: false, status: 'active' },
    { id: 2, code: 'URD-01', name: 'Urdu', className: 'Class 1', totalMarks: 100, passingMarks: 40, isOptional: false, status: 'active' },
    { id: 3, code: 'MATH-01', name: 'Mathematics', className: 'Class 1', totalMarks: 100, passingMarks: 40, isOptional: false, status: 'active' },
    { id: 4, code: 'SCI-01', name: 'Science', className: 'Class 1', totalMarks: 100, passingMarks: 40, isOptional: false, status: 'active' },
    { id: 5, code: 'ISL-01', name: 'Islamiat', className: 'Class 1', totalMarks: 50, passingMarks: 20, isOptional: false, status: 'active' },
    { id: 6, code: 'ART-01', name: 'Art & Craft', className: 'Class 1', totalMarks: 50, passingMarks: 20, isOptional: true, status: 'active' },
  ];

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }
}
