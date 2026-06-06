import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditFeeTypeComponent,
  FeeTypeFormValue,
} from './add-edit-fee-type/add-edit-fee-type.component';

interface FeeTypeRow {
  id: number;
  name: string;
  frequency: 'monthly' | 'one-time' | 'yearly' | 'quarterly';
  defaultAmount: number;
  applicableTo: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-fee-types',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditFeeTypeComponent],
  templateUrl: './fee-types.component.html',
  styleUrl: './fee-types.component.css',
})
export class FeeTypesComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';

  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<Partial<FeeTypeFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly rows: FeeTypeRow[] = [
    { id: 1, name: 'Tuition Fee', frequency: 'monthly', defaultAmount: 5000, applicableTo: 'All Classes', status: 'active' },
    { id: 2, name: 'Admission Fee', frequency: 'one-time', defaultAmount: 10000, applicableTo: 'New Admissions', status: 'active' },
    { id: 3, name: 'Exam Fee', frequency: 'quarterly', defaultAmount: 1500, applicableTo: 'All Classes', status: 'active' },
    { id: 4, name: 'Library Fee', frequency: 'yearly', defaultAmount: 1000, applicableTo: 'All Classes', status: 'active' },
    { id: 5, name: 'Computer Lab Fee', frequency: 'monthly', defaultAmount: 800, applicableTo: 'Class 4 onwards', status: 'active' },
    { id: 6, name: 'Transport Fee', frequency: 'monthly', defaultAmount: 2500, applicableTo: 'Optional', status: 'inactive' },
  ];

  openAdd(): void {
    this.editing.set(null);
    this.mode.set('form');
  }

  openEdit(row: FeeTypeRow): void {
    this.editing.set({ ...row });
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
