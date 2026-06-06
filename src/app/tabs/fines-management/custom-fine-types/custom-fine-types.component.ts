import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditFineTypeComponent,
  FineTypeFormValue,
} from './add-edit-fine-type/add-edit-fine-type.component';

interface FineTypeRow {
  id: number;
  name: string;
  defaultAmount: number;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-custom-fine-types',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditFineTypeComponent],
  templateUrl: './custom-fine-types.component.html',
  styleUrl: './custom-fine-types.component.css',
})
export class CustomFineTypesComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';
  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<FineTypeFormValue | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly rows: FineTypeRow[] = [
    { id: 1, name: 'Misbehavior', defaultAmount: 500, description: 'Disruptive behavior in class.', status: 'active' },
    { id: 2, name: 'Late Submission', defaultAmount: 200, description: 'Late assignment submission.', status: 'active' },
    { id: 3, name: 'Damaged Property', defaultAmount: 1000, description: 'Damaging school property.', status: 'active' },
    { id: 4, name: 'Uniform Violation', defaultAmount: 100, description: 'Improper uniform.', status: 'inactive' },
  ];

  openAdd(): void {
    this.editing.set(null);
    this.mode.set('form');
  }
  openEdit(row: FineTypeRow): void {
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
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }
}
