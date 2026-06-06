import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

interface DeductionRow {
  id: number;
  date: string;
  staffName: string;
  initial: string;
  reason: string;
  amount: number;
  appliedOn: string;
}

@Component({
  selector: 'app-custom-deduction',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective],
  templateUrl: './custom-deduction.component.html',
  styleUrl: './custom-deduction.component.css',
})
export class CustomDeductionComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';
  showForm = signal(false);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  newDeduction = { staffId: '', reason: '', amount: null as number | null, appliedOn: '' };

  readonly staffList = [
    { id: 'STF-0001', name: 'Ayesha Khan' },
    { id: 'STF-0002', name: 'Bilal Ahmed' },
    { id: 'STF-0003', name: 'Sara Iqbal' },
  ];

  readonly rows: DeductionRow[] = [
    { id: 1, date: '04 Jun 2026', staffName: 'Usman Saeed', initial: 'U', reason: 'Equipment damage', amount: 2000, appliedOn: 'Jun 2026' },
    { id: 2, date: '01 Jun 2026', staffName: 'Hamza Raza', initial: 'H', reason: 'Loan repayment', amount: 5000, appliedOn: 'Jun 2026' },
  ];

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }
}
