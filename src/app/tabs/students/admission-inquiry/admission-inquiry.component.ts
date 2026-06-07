import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
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
  inquiryNo: string;
  inquiryDate: string;

  studentName: string;
  studentDob: string;
  gender: string;
  classFor: string;
  currentlyStudying: string;
  previousSchool: string;

  parentName: string;
  relation: string;
  phone: string;
  alternatePhone: string;
  email: string;
  occupation: string;

  address: string;
  city: string;

  source: string;
  sourceDetails: string;
  assignedTo: string;
  followUpDate: string;

  notes: string;
  status: 'new' | 'contacted' | 'visited' | 'admitted' | 'rejected';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

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

  readonly searchTerm = signal('');
  readonly selectedStatus = signal<string>('all');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<Partial<InquiryFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<InquiryRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly inquiries = signal<InquiryRow[]>([
    this.makeRow({ id: 1, studentName: 'Ahmed Ali', parentName: 'Ali Hassan', phone: '0300-1111111', classFor: 'Class 1', source: 'Walk-in', inquiryDate: '05 Jun 2026', status: 'new' }),
    this.makeRow({ id: 2, studentName: 'Sara Khan', parentName: 'Khan Mohammad', phone: '0301-2222222', classFor: 'Nursery', source: 'Website', inquiryDate: '04 Jun 2026', status: 'contacted' }),
    this.makeRow({ id: 3, studentName: 'Bilal Sheikh', parentName: 'Sheikh Asif', phone: '0302-3333333', classFor: 'Class 5', source: 'Referral', inquiryDate: '02 Jun 2026', status: 'admitted' }),
    this.makeRow({ id: 4, studentName: 'Fatima Noor', parentName: 'Noor Hussain', phone: '0303-4444444', classFor: 'Class 3', source: 'Phone Call', inquiryDate: '30 May 2026', status: 'rejected' }),
  ]);

  readonly filteredInquiries = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.selectedStatus();
    return this.inquiries().filter((q) => {
      if (status !== 'all' && q.status !== status) return false;
      if (!term) return true;
      return (
        q.studentName.toLowerCase().includes(term) ||
        q.parentName.toLowerCase().includes(term) ||
        q.phone.toLowerCase().includes(term) ||
        q.classFor.toLowerCase().includes(term)
      );
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredInquiries().length / this.pageSize)),
  );

  readonly pagedInquiries = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredInquiries().slice(start, start + this.pageSize);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: InquiryRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: InquiryRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: InquiryFormValue): void {
    const current = this.inquiries();

    if (this.formMode() === 'edit' && value.id != null) {
      this.inquiries.set(
        current.map((q) => (q.id === value.id ? this.mergeRow(q, value) : q)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((q) => q.id)) + 1;
      const newRow: InquiryRow = this.mergeRow({ id: nextId } as InquiryRow, value);
      this.inquiries.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: InquiryRow): void {
    this.deleteTarget.set(row);
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  confirmDelete(): void {
    const target = this.deleteTarget();
    if (!target) return;
    this.inquiries.set(this.inquiries().filter((q) => q.id !== target.id));
    this.deleteTarget.set(null);
    if (this.currentPage() > this.totalPages()) {
      this.currentPage.set(this.totalPages());
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  prevPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  onStatusFilterChange(value: string): void {
    this.selectedStatus.set(value);
    this.currentPage.set(1);
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

  private makeRow(seed: Partial<InquiryRow> & { id: number; studentName: string; parentName: string; phone: string; classFor: string; source: string; inquiryDate: string; status: InquiryRow['status'] }): InquiryRow {
    return {
      id: seed.id,
      inquiryNo: '',
      inquiryDate: seed.inquiryDate,
      studentName: seed.studentName,
      studentDob: '',
      gender: '',
      classFor: seed.classFor,
      currentlyStudying: '',
      previousSchool: '',
      parentName: seed.parentName,
      relation: '',
      phone: seed.phone,
      alternatePhone: '',
      email: '',
      occupation: '',
      address: '',
      city: '',
      source: seed.source,
      sourceDetails: '',
      assignedTo: '',
      followUpDate: '',
      notes: '',
      status: seed.status,
    };
  }

  private rowToFormValue(row: InquiryRow): InquiryFormValue {
    return {
      id: row.id,
      inquiryNo: row.inquiryNo,
      inquiryDate: row.inquiryDate,
      studentName: row.studentName,
      studentDob: row.studentDob,
      gender: row.gender,
      classFor: row.classFor,
      currentlyStudying: row.currentlyStudying,
      previousSchool: row.previousSchool,
      parentName: row.parentName,
      relation: row.relation,
      phone: row.phone,
      alternatePhone: row.alternatePhone,
      email: row.email,
      occupation: row.occupation,
      address: row.address,
      city: row.city,
      source: row.source,
      sourceDetails: row.sourceDetails,
      assignedTo: row.assignedTo,
      followUpDate: row.followUpDate,
      notes: row.notes,
      status: row.status,
    };
  }

  private mergeRow(existing: InquiryRow, value: InquiryFormValue): InquiryRow {
    return {
      ...existing,
      inquiryNo: value.inquiryNo,
      inquiryDate: value.inquiryDate,
      studentName: value.studentName,
      studentDob: value.studentDob,
      gender: value.gender,
      classFor: value.classFor,
      currentlyStudying: value.currentlyStudying,
      previousSchool: value.previousSchool,
      parentName: value.parentName,
      relation: value.relation,
      phone: value.phone,
      alternatePhone: value.alternatePhone,
      email: value.email,
      occupation: value.occupation,
      address: value.address,
      city: value.city,
      source: value.source,
      sourceDetails: value.sourceDetails,
      assignedTo: value.assignedTo,
      followUpDate: value.followUpDate,
      notes: value.notes,
      status: value.status,
    };
  }
}
