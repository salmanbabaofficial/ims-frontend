import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

interface ExamRow {
  id: number;
  name: string;
  group: string;
  className: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

@Component({
  selector: 'app-exams-list',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective],
  templateUrl: './exams-list.component.html',
  styleUrl: './exams-list.component.css',
})
export class ExamsListComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';
  showForm = signal(false);
  selectedGroup = 'all';
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  newExam = { name: '', group: '', className: '', startDate: '', endDate: '' };

  readonly groupOptions = ['First Term 2026', 'Second Term 2026', 'Monthly Tests'];
  readonly classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  readonly rows: ExamRow[] = [
    { id: 1, name: 'First Term — Class 1', group: 'First Term 2026', className: 'Class 1', startDate: '10 Jun 2026', endDate: '20 Jun 2026', status: 'upcoming' },
    { id: 2, name: 'First Term — Class 2', group: 'First Term 2026', className: 'Class 2', startDate: '10 Jun 2026', endDate: '20 Jun 2026', status: 'upcoming' },
    { id: 3, name: 'May Test — Class 5', group: 'Monthly Tests', className: 'Class 5', startDate: '25 May 2026', endDate: '28 May 2026', status: 'completed' },
  ];

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }

  statusBadge(s: ExamRow['status']): string {
    if (s === 'completed') return 'active';
    if (s === 'ongoing') return 'pending';
    return 'inactive';
  }
}
