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
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';
import {
  AddEditSessionComponent,
  SessionFormValue,
} from './add-edit-session/add-edit-session.component';

interface SessionRow {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  classes: number;
  students: number;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-sessions',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditSessionComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';

  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<SessionFormValue | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly sessions: SessionRow[] = [
    { id: 1, name: '2023 - 2024', startDate: '01 Apr 2023', endDate: '31 Mar 2024', isCurrent: false, classes: 12, students: 240, status: 'inactive' },
    { id: 2, name: '2024 - 2025', startDate: '01 Apr 2024', endDate: '31 Mar 2025', isCurrent: false, classes: 12, students: 286, status: 'inactive' },
    { id: 3, name: '2025 - 2026', startDate: '01 Apr 2025', endDate: '31 Mar 2026', isCurrent: true, classes: 12, students: 312, status: 'active' },
    { id: 4, name: '2026 - 2027', startDate: '01 Apr 2026', endDate: '31 Mar 2027', isCurrent: false, classes: 0, students: 0, status: 'inactive' },
  ];

  openAdd(): void {
    this.editing.set(null);
    this.mode.set('form');
  }

  openEdit(row: SessionRow): void {
    this.editing.set({
      id: row.id,
      name: row.name,
      startDate: row.startDate,
      endDate: row.endDate,
      isCurrent: row.isCurrent,
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
