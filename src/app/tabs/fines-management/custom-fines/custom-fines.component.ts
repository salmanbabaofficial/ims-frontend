import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditCustomFineComponent,
  CustomFineFormValue,
} from './add-edit-custom-fine/add-edit-custom-fine.component';

interface CustomFineRow {
  id: number;
  studentName: string;
  initial: string;
  className: string;
  fineType: string;
  amount: number;
  imposedOn: string;
  status: 'paid' | 'unpaid';
}

@Component({
  selector: 'app-custom-fines',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditCustomFineComponent],
  templateUrl: './custom-fines.component.html',
  styleUrl: './custom-fines.component.css',
})
export class CustomFinesComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';
  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<Partial<CustomFineFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly rows: CustomFineRow[] = [
    { id: 1, studentName: 'Ali Hassan', initial: 'A', className: 'Class 1 - A', fineType: 'Misbehavior', amount: 500, imposedOn: '02 Jun 2026', status: 'unpaid' },
    { id: 2, studentName: 'Hamza Iqbal', initial: 'H', className: 'Class 9 - B', fineType: 'Late Submission', amount: 200, imposedOn: '01 Jun 2026', status: 'paid' },
    { id: 3, studentName: 'Maryam Aslam', initial: 'M', className: 'Class 3 - A', fineType: 'Damaged Property', amount: 1000, imposedOn: '28 May 2026', status: 'unpaid' },
  ];

  openAdd(): void { this.editing.set(null); this.mode.set('form'); }
  openEdit(row: CustomFineRow): void {
    this.editing.set({
      id: row.id,
      studentId: '',
      fineType: row.fineType,
      amount: row.amount,
      imposedOn: row.imposedOn,
      reason: '',
      status: row.status,
    });
    this.mode.set('form');
  }
  backToList(): void { this.mode.set('list'); this.editing.set(null); }
  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
  }
}
