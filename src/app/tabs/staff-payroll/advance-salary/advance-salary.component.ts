import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

interface AdvanceRow {
  id: number;
  date: string;
  staffName: string;
  initial: string;
  designation: string;
  amount: number;
  installments: number;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-advance-salary',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective],
  templateUrl: './advance-salary.component.html',
  styleUrl: './advance-salary.component.css',
})
export class AdvanceSalaryComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';
  showForm = signal(false);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  newAdvance = { staffId: '', amount: null as number | null, installments: 1, reason: '' };

  readonly staffList = [
    { id: 'STF-0001', name: 'Ayesha Khan' },
    { id: 'STF-0002', name: 'Bilal Ahmed' },
    { id: 'STF-0003', name: 'Sara Iqbal' },
  ];

  readonly rows: AdvanceRow[] = [
    { id: 1, date: '04 Jun 2026', staffName: 'Sara Iqbal', initial: 'S', designation: 'Senior Teacher', amount: 25000, installments: 5, status: 'approved' },
    { id: 2, date: '01 Jun 2026', staffName: 'Hamza Raza', initial: 'H', designation: 'Accountant', amount: 15000, installments: 3, status: 'pending' },
    { id: 3, date: '20 May 2026', staffName: 'Usman Saeed', initial: 'U', designation: 'PE Coach', amount: 10000, installments: 2, status: 'rejected' },
  ];

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }

  statusBadge(s: AdvanceRow['status']): string {
    if (s === 'approved') return 'active';
    if (s === 'rejected') return 'inactive';
    return 'pending';
  }
}
