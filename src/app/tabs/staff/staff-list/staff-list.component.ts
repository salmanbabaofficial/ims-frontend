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
  AddEditStaffComponent,
  StaffFormValue,
} from './add-edit-staff/add-edit-staff.component';

interface StaffRow {
  id: number;
  staffId: string;
  name: string;
  initial: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  joiningDate: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-staff-list',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditStaffComponent],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.css',
})
export class StaffListComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;

  searchTerm = '';
  selectedDepartment = 'all';
  selectedStatus = 'all';

  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<Partial<StaffFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly departments = ['Academic', 'Administration', 'Accounts', 'Library', 'Sports', 'Maintenance'];

  readonly staff: StaffRow[] = [
    { id: 1, staffId: 'STF-0001', name: 'Ayesha Khan', initial: 'A', designation: 'Principal', department: 'Administration', phone: '0300-1234567', email: 'ayesha@inst.edu', joiningDate: '01 Jan 2020', status: 'active' },
    { id: 2, staffId: 'STF-0002', name: 'Bilal Ahmed', initial: 'B', designation: 'Vice Principal', department: 'Administration', phone: '0301-2345678', email: 'bilal@inst.edu', joiningDate: '15 Mar 2020', status: 'active' },
    { id: 3, staffId: 'STF-0003', name: 'Sara Iqbal', initial: 'S', designation: 'Senior Teacher', department: 'Academic', phone: '0302-3456789', email: 'sara@inst.edu', joiningDate: '01 Aug 2021', status: 'active' },
    { id: 4, staffId: 'STF-0004', name: 'Hamza Raza', initial: 'H', designation: 'Accountant', department: 'Accounts', phone: '0303-4567890', email: 'hamza@inst.edu', joiningDate: '05 Feb 2022', status: 'active' },
    { id: 5, staffId: 'STF-0005', name: 'Maryam Tariq', initial: 'M', designation: 'Librarian', department: 'Library', phone: '0304-5678901', email: 'maryam@inst.edu', joiningDate: '20 May 2022', status: 'active' },
    { id: 6, staffId: 'STF-0006', name: 'Usman Saeed', initial: 'U', designation: 'PE Coach', department: 'Sports', phone: '0305-6789012', email: 'usman@inst.edu', joiningDate: '11 Sep 2023', status: 'inactive' },
  ];

  openAdd(): void {
    this.editing.set(null);
    this.mode.set('form');
  }

  openEdit(row: StaffRow): void {
    this.editing.set({
      id: row.id,
      staffId: row.staffId,
      fullName: row.name,
      designation: row.designation,
      department: row.department,
      phone: row.phone,
      email: row.email,
      joiningDate: row.joiningDate,
      gender: '',
      dob: '',
      cnic: '',
      address: '',
      qualification: '',
      basicSalary: null,
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
}
