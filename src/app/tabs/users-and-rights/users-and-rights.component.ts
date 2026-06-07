import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faEye,
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
  password: string;
  confirmPassword: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  sendCredentials: boolean;
  notes: string;
}

interface Permission {
  id: string;
  label: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-users-and-rights',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditUserComponent],
  templateUrl: './users-and-rights.component.html',
  styleUrl: './users-and-rights.component.css',
})
export class UsersAndRightsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faEdit = faPenToSquare;
  readonly faTrash = faTrash;
  readonly faKey = faKey;
  readonly faShield = faUserShield;

  readonly searchTerm = signal('');
  readonly selectedRole = signal<string>('all');
  readonly selectedStatus = signal<string>('all');
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly activeTab = signal<'users' | 'rights'>('users');
  readonly rightsRole = signal<UserRoleValue>('Admin');

  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<UserFormValue | null>(null);
  readonly deleteTarget = signal<UserRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly roleOptions: UserRoleValue[] = ['Admin', 'Teacher', 'Accountant', 'Parent', 'Student'];

  readonly users = signal<UserRow[]>([
    this.makeRow({ id: 1, name: 'Salman Khan', initial: 'S', email: 'salman@ims.edu', phone: '0300-1112233', username: 'salman', role: 'Admin', lastLogin: '06 Jun 2026 09:14 AM', status: 'active' }),
    this.makeRow({ id: 2, name: 'Mr. Khalid Rasheed', initial: 'K', email: 'khalid@ims.edu', phone: '0301-2223344', username: 'khalid', role: 'Teacher', lastLogin: '06 Jun 2026 08:42 AM', status: 'active' }),
    this.makeRow({ id: 3, name: 'Ms. Ayesha Tariq', initial: 'A', email: 'ayesha@ims.edu', phone: '0302-3334455', username: 'ayesha', role: 'Teacher', lastLogin: '05 Jun 2026 04:18 PM', status: 'active' }),
    this.makeRow({ id: 4, name: 'Nasir Mahmood', initial: 'N', email: 'nasir@ims.edu', phone: '0303-4445566', username: 'nasir', role: 'Accountant', lastLogin: '05 Jun 2026 03:21 PM', status: 'active' }),
    this.makeRow({ id: 5, name: 'Hassan Ali', initial: 'H', email: 'hassan.parent@gmail.com', phone: '0304-5556677', username: 'hassan', role: 'Parent', lastLogin: '03 Jun 2026 11:50 AM', status: 'active' }),
    this.makeRow({ id: 6, name: 'Fatima Noor', initial: 'F', email: 'fatima.student@ims.edu', phone: '0305-6667788', username: 'fatima', role: 'Student', lastLogin: 'Never', status: 'inactive' }),
  ]);

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

  readonly filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const role = this.selectedRole();
    const status = this.selectedStatus();
    return this.users().filter((u) => {
      if (role !== 'all' && u.role !== role) return false;
      if (status !== 'all' && u.status !== status) return false;
      if (!term) return true;
      return (
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.username.toLowerCase().includes(term) ||
        u.phone.toLowerCase().includes(term)
      );
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredUsers().length / this.pageSize)),
  );

  readonly pagedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredUsers().slice(start, start + this.pageSize);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: UserRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: UserRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: UserFormValue): void {
    const current = this.users();

    if (this.formMode() === 'edit' && value.id != null) {
      this.users.set(
        current.map((u) => (u.id === value.id ? this.mergeRow(u, value) : u)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((u) => u.id)) + 1;
      const newRow: UserRow = this.mergeRow(
        { id: nextId, lastLogin: 'Never' } as UserRow,
        value,
      );
      this.users.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: UserRow): void {
    this.deleteTarget.set(row);
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  confirmDelete(): void {
    const target = this.deleteTarget();
    if (!target) return;
    this.users.set(this.users().filter((u) => u.id !== target.id));
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

  onRoleFilterChange(value: string): void {
    this.selectedRole.set(value);
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

  private makeRow(seed: Partial<UserRow> & { id: number; name: string; initial: string; email: string; phone: string; username: string; role: UserRoleValue; lastLogin: string; status: 'active' | 'inactive' }): UserRow {
    return {
      id: seed.id,
      name: seed.name,
      initial: seed.initial,
      email: seed.email,
      phone: seed.phone,
      username: seed.username,
      role: seed.role,
      password: '',
      confirmPassword: '',
      lastLogin: seed.lastLogin,
      status: seed.status,
      sendCredentials: false,
      notes: '',
    };
  }

  private rowToFormValue(row: UserRow): UserFormValue {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      username: row.username,
      role: row.role,
      password: '',
      confirmPassword: '',
      status: row.status,
      sendCredentials: row.sendCredentials,
      notes: row.notes,
    };
  }

  private mergeRow(existing: UserRow, value: UserFormValue): UserRow {
    const name = value.name?.trim() || existing.name;
    const initial = name ? name.charAt(0).toUpperCase() : existing.initial || '?';
    return {
      ...existing,
      name,
      initial,
      email: value.email,
      phone: value.phone,
      username: value.username,
      role: value.role,
      status: value.status,
      sendCredentials: value.sendCredentials,
      notes: value.notes,
    };
  }
}
