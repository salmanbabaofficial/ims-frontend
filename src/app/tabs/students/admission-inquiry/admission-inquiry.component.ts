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
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditInquiryComponent,
  InquiryFormValue,
} from './add-edit-inquiry/add-edit-inquiry.component';

interface InquiryRow {
  id: number;
  studentName: string;
  parentName: string;
  phone: string;
  classFor: string;
  source: string;
  inquiryDate: string;
  status: 'new' | 'contacted' | 'admitted' | 'rejected';
}

@Component({
  selector: 'app-admission-inquiry',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditInquiryComponent],
  templateUrl: './admission-inquiry.component.html',
  styleUrl: './admission-inquiry.component.css',
})
export class AdmissionInquiryComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';
  selectedStatus = 'all';

  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<Partial<InquiryFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly inquiries: InquiryRow[] = [
    { id: 1, studentName: 'Ahmed Ali', parentName: 'Ali Hassan', phone: '0300-1111111', classFor: 'Class 1', source: 'Walk-in', inquiryDate: '05 Jun 2026', status: 'new' },
    { id: 2, studentName: 'Sara Khan', parentName: 'Khan Mohammad', phone: '0301-2222222', classFor: 'Nursery', source: 'Website', inquiryDate: '04 Jun 2026', status: 'contacted' },
    { id: 3, studentName: 'Bilal Sheikh', parentName: 'Sheikh Asif', phone: '0302-3333333', classFor: 'Class 5', source: 'Referral', inquiryDate: '02 Jun 2026', status: 'admitted' },
    { id: 4, studentName: 'Fatima Noor', parentName: 'Noor Hussain', phone: '0303-4444444', classFor: 'Class 3', source: 'Phone Call', inquiryDate: '30 May 2026', status: 'rejected' },
  ];

  openAdd(): void {
    this.editing.set(null);
    this.mode.set('form');
  }

  openEdit(row: InquiryRow): void {
    this.editing.set({
      id: row.id,
      studentName: row.studentName,
      parentName: row.parentName,
      phone: row.phone,
      email: '',
      classFor: row.classFor,
      source: row.source,
      inquiryDate: row.inquiryDate,
      notes: '',
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

  statusBadge(s: InquiryRow['status']): string {
    if (s === 'admitted') return 'active';
    if (s === 'rejected') return 'inactive';
    return 'pending';
  }
}
