import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditExpenseTypeComponent,
  ExpenseTypeFormValue,
} from './add-edit-expense-type/add-edit-expense-type.component';

interface ExpenseTypeRow {
  id: number;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-custom-expense-types',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditExpenseTypeComponent],
  templateUrl: './custom-expense-types.component.html',
  styleUrl: './custom-expense-types.component.css',
})
export class CustomExpenseTypesComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';
  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<ExpenseTypeFormValue | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly rows: ExpenseTypeRow[] = [
    { id: 1, name: 'Office Supplies', category: 'Administrative', description: 'Stationery and office consumables.', status: 'active' },
    { id: 2, name: 'Maintenance & Repairs', category: 'Facilities', description: 'Building & equipment upkeep.', status: 'active' },
    { id: 3, name: 'Events & Functions', category: 'Activities', description: 'Sports day, annual day etc.', status: 'active' },
    { id: 4, name: 'Travel & Conveyance', category: 'Operations', description: 'Travel expenses for staff.', status: 'inactive' },
  ];

  openAdd(): void { this.editing.set(null); this.mode.set('form'); }
  openEdit(row: ExpenseTypeRow): void { this.editing.set({ ...row }); this.mode.set('form'); }
  backToList(): void { this.mode.set('list'); this.editing.set(null); }
  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }
}
