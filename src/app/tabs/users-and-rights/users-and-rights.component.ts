import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faKey,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';
import { AddEditUserComponent, UserFormValue, UserRoleValue } from './add-edit-user/add-edit-user.component';

interface UserRow {
  id: number;
  name: string;
  initial: string;
  email: string;
  phone: string;
  username: string;
  role: UserRoleValue;
  lastLogin: string;
  status: 'active' | 'inactive';
}

interface Permission {
  id: string;
  label: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
}

@Component({
  selector: 'app-users-and-rights',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditUserComponent],
  templateUrl: './users-and-rights.component.html',
  styleUrl: './users-and-rights.component.css',
})
export class UsersAndRightsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEdit = faPenToSquare;
  readonly faTrash = faTrash;
  readonly faKey = faKey;
  readonly faShield = faUserShield;

  searchTerm = '';
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly activeTab = signal<'users' | 'rights'>('users');
  readonly selectedRole = signal<UserRoleValue>('Admin');

  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<UserFormValue | null>(null);

  readonly users: UserRow[] = [
    { id: 1, name: 'Salman Khan', initial: 'S', email: 'salman@ims.edu', phone: '0300-1112233', username: 'salman', role: 'Admin', lastLogin: '06 Jun 2026 09:14 AM', status: 'active' },
    { id: 2, name: 'Mr. Khalid Rasheed', initial: 'K', email: 'khalid@ims.edu', phone: '0301-2223344', username: 'khalid', role: 'Teacher', lastLogin: '06 Jun 2026 08:42 AM', status: 'active' },
    { id: 3, name: 'Ms. Ayesha Tariq', initial: 'A', email: 'ayesha@ims.edu', phone: '0302-3334455', username: 'ayesha', role: 'Teacher', lastLogin: '05 Jun 2026 04:18 PM', status: 'active' },
    { id: 4, name: 'Nasir Mahmood', initial: 'N', email: 'nasir@ims.edu', phone: '0303-4445566', username: 'nasir', role: 'Accountant', lastLogin: '05 Jun 2026 03:21 PM', status: 'active' },
    { id: 5, name: 'Hassan Ali', initial: 'H', email: 'hassan.parent@gmail.com', phone: '0304-5556677', username: 'hassan', role: 'Parent', lastLogin: '03 Jun 2026 11:50 AM', status: 'active' },
    { id: 6, name: 'Fatima Noor', initial: 'F', email: 'fatima.student@ims.edu', phone: '0305-6667788', username: 'fatima', role: 'Student', lastLogin: 'Never', status: 'inactive' },
  ];

  readonly permissions: Permission[] = [
    { id: 'dashboard', label: 'Dashboard', view: true, add: false, edit: false, delete: false },
    { id: 'students', label: 'Students', view: true, add: true, edit: true, delete: true },
    { id: 'staff', label: 'Staff', view: true, add: true, edit: true, delete: true },
    { id: 'fee', label: 'Fee Management', view: true, add: true, edit: true, delete: false },
    { id: 'expense', label: 'Expense', view: true, add: true, edit: true, delete: false },
    { id: 'income', label: 'Income', view: true, add: true, edit: true, delete: false },
    { id: 'payroll', label: 'Staff Payroll', view: true, add: true, edit: true, delete: false },
    { id: 'examination', label: 'Examination', view: true, add: true, edit: true, delete: false },
    { id: 'lms', label: 'LMS', view: true, add: true, edit: true, delete: false },
    { id: 'reports', label: 'Reports', view: true, add: false, edit: false, delete: false },
    { id: 'settings', label: 'Settings', view: true, add: true, edit: true, delete: true },
  ];

  openAdd(): void {
    this.editing.set(null);
    this.mode.set('form');
  }

  openEdit(row: UserRow): void {
    this.editing.set({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      username: row.username,
      role: row.role,
      password: '',
      confirmPassword: '',
      status: row.status,
      sendCredentials: false,
      notes: '',
    });
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  toggleSearch(): void {
    this.searchOpen.update((v) => !v);
    if (this.searchOpen()) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }
}
