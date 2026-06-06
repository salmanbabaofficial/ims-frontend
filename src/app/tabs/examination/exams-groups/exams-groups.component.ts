import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

interface ExamGroup {
  id: number;
  name: string;
  description: string;
  examCount: number;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-exams-groups',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective],
  templateUrl: './exams-groups.component.html',
  styleUrl: './exams-groups.component.css',
})
export class ExamsGroupsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';
  showForm = signal(false);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  newGroup = { name: '', description: '', status: 'active' as 'active' | 'inactive' };

  readonly rows: ExamGroup[] = [
    { id: 1, name: 'First Term 2026', description: 'Mid-year examinations.', examCount: 6, status: 'active' },
    { id: 2, name: 'Second Term 2026', description: 'End-of-year examinations.', examCount: 6, status: 'active' },
    { id: 3, name: 'Monthly Tests', description: 'Monthly progress evaluations.', examCount: 12, status: 'active' },
    { id: 4, name: 'Final 2025', description: 'Annual final exams.', examCount: 6, status: 'inactive' },
  ];

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }
}
