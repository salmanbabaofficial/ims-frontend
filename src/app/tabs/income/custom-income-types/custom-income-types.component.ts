import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditIncomeTypeComponent,
  IncomeTypeFormValue,
} from './add-edit-income-type/add-edit-income-type.component';

interface IncomeTypeRow {
  id: number;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-custom-income-types',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditIncomeTypeComponent],
  templateUrl: './custom-income-types.component.html',
  styleUrl: './custom-income-types.component.css',
})
export class CustomIncomeTypesComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';
  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<IncomeTypeFormValue | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly rows: IncomeTypeRow[] = [
    { id: 1, name: 'Donations', category: 'External', description: 'Charitable donations from individuals.', status: 'active' },
    { id: 2, name: 'Sponsorships', category: 'External', description: 'Corporate sponsorships for events.', status: 'active' },
    { id: 3, name: 'Rental Income', category: 'Other', description: 'Hall and ground rental income.', status: 'active' },
    { id: 4, name: 'Book Sales', category: 'Internal', description: 'Sale of books and uniforms.', status: 'inactive' },
  ];

  openAdd(): void { this.editing.set(null); this.mode.set('form'); }
  openEdit(row: IncomeTypeRow): void { this.editing.set({ ...row }); this.mode.set('form'); }
  backToList(): void { this.mode.set('list'); this.editing.set(null); }
  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }
}
