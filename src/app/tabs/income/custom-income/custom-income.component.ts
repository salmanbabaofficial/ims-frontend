import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faFileExport, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditIncomeComponent,
  IncomeFormValue,
} from './add-edit-income/add-edit-income.component';

interface IncomeRow {
  id: number;
  date: string;
  voucherNo: string;
  type: string;
  description: string;
  amount: number;
  receivedFrom: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-custom-income',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditIncomeComponent],
  templateUrl: './custom-income.component.html',
  styleUrl: './custom-income.component.css',
})
export class CustomIncomeComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;
  readonly faFileExport = faFileExport;

  searchTerm = '';
  selectedType = 'all';

  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<Partial<IncomeFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly typeOptions = ['Donations', 'Sponsorships', 'Rental Income', 'Book Sales'];

  readonly rows: IncomeRow[] = [
    { id: 1, date: '04 Jun 2026', voucherNo: 'INC-0102', type: 'Donations', description: 'Eid donation drive', amount: 50000, receivedFrom: 'Anonymous', paymentMethod: 'Cash' },
    { id: 2, date: '02 Jun 2026', voucherNo: 'INC-0101', type: 'Sponsorships', description: 'Sports day sponsor', amount: 75000, receivedFrom: 'ABC Corp', paymentMethod: 'Bank' },
    { id: 3, date: '30 May 2026', voucherNo: 'INC-0100', type: 'Rental Income', description: 'Hall rental for event', amount: 30000, receivedFrom: 'XYZ Society', paymentMethod: 'Cheque' },
    { id: 4, date: '25 May 2026', voucherNo: 'INC-0099', type: 'Book Sales', description: 'Sale of stationery', amount: 12000, receivedFrom: 'Walk-in Customers', paymentMethod: 'Cash' },
  ];

  openAdd(): void { this.editing.set(null); this.mode.set('form'); }
  openEdit(row: IncomeRow): void {
    this.editing.set({
      id: row.id,
      date: row.date,
      voucherNo: row.voucherNo,
      type: row.type,
      description: row.description,
      amount: row.amount,
      receivedFrom: row.receivedFrom,
      paymentMethod: row.paymentMethod,
    });
    this.mode.set('form');
  }
  backToList(): void { this.mode.set('list'); this.editing.set(null); }
  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }

  get total(): number {
    return this.rows.reduce((sum, r) => sum + r.amount, 0);
  }
}
