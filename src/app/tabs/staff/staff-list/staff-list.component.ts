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
  AddEditStaffComponent,
  StaffFormValue,
} from './add-edit-staff/add-edit-staff.component';

interface StaffRow {
  id: number;
  initial: string;
  name: string;

  staffId: string;
  fullName: string;
  fatherName: string;
  gender: string;
  dob: string;
  maritalStatus: string;
  bloodGroup: string;
  religion: string;
  nationality: string;
  cnic: string;

  designation: string;
  department: string;
  subjectSpecialization: string;
  joiningDate: string;
  leavingDate: string;
  experienceYears: number | null;
  previousEmployer: string;
  qualification: string;
  basicSalary: number | null;

  phone: string;
  email: string;
  address: string;
  city: string;
  emergencyContactName: string;
  emergencyContactPhone: string;

  bankName: string;
  bankAccountNo: string;
  bankBranch: string;
  iban: string;
  taxNumber: string;
  eobiNumber: string;

  username: string;
  notes: string;
  status: 'active' | 'inactive';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

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

  readonly searchTerm = signal('');
  readonly selectedDepartment = signal<string>('all');
  readonly selectedStatus = signal<string>('all');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<Partial<StaffFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<StaffRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly departments = ['Academic', 'Administration', 'Accounts', 'Library', 'Sports', 'Maintenance'];

  readonly staff = signal<StaffRow[]>([
    this.makeRow({ id: 1, staffId: 'STF-0001', name: 'Ayesha Khan', initial: 'A', designation: 'Principal', department: 'Administration', phone: '0300-1234567', email: 'ayesha@inst.edu', joiningDate: '01 Jan 2020', status: 'active' }),
    this.makeRow({ id: 2, staffId: 'STF-0002', name: 'Bilal Ahmed', initial: 'B', designation: 'Vice Principal', department: 'Administration', phone: '0301-2345678', email: 'bilal@inst.edu', joiningDate: '15 Mar 2020', status: 'active' }),
    this.makeRow({ id: 3, staffId: 'STF-0003', name: 'Sara Iqbal', initial: 'S', designation: 'Senior Teacher', department: 'Academic', phone: '0302-3456789', email: 'sara@inst.edu', joiningDate: '01 Aug 2021', status: 'active' }),
    this.makeRow({ id: 4, staffId: 'STF-0004', name: 'Hamza Raza', initial: 'H', designation: 'Accountant', department: 'Accounts', phone: '0303-4567890', email: 'hamza@inst.edu', joiningDate: '05 Feb 2022', status: 'active' }),
    this.makeRow({ id: 5, staffId: 'STF-0005', name: 'Maryam Tariq', initial: 'M', designation: 'Librarian', department: 'Library', phone: '0304-5678901', email: 'maryam@inst.edu', joiningDate: '20 May 2022', status: 'active' }),
    this.makeRow({ id: 6, staffId: 'STF-0006', name: 'Usman Saeed', initial: 'U', designation: 'PE Coach', department: 'Sports', phone: '0305-6789012', email: 'usman@inst.edu', joiningDate: '11 Sep 2023', status: 'inactive' }),
  ]);

  readonly filteredStaff = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const dept = this.selectedDepartment();
    const status = this.selectedStatus();
    return this.staff().filter((s) => {
      if (dept !== 'all' && s.department !== dept) return false;
      if (status !== 'all' && s.status !== status) return false;
      if (!term) return true;
      return (
        s.name.toLowerCase().includes(term) ||
        s.staffId.toLowerCase().includes(term) ||
        s.designation.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.phone.toLowerCase().includes(term)
      );
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredStaff().length / this.pageSize)),
  );

  readonly pagedStaff = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredStaff().slice(start, start + this.pageSize);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: StaffRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: StaffRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: StaffFormValue): void {
    const current = this.staff();

    if (this.formMode() === 'edit' && value.id != null) {
      this.staff.set(
        current.map((s) => (s.id === value.id ? this.mergeRow(s, value) : s)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((s) => s.id)) + 1;
      const newRow: StaffRow = this.mergeRow({ id: nextId } as StaffRow, value);
      this.staff.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: StaffRow): void {
    this.deleteTarget.set(row);
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  confirmDelete(): void {
    const target = this.deleteTarget();
    if (!target) return;
    this.staff.set(this.staff().filter((s) => s.id !== target.id));
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

  onDepartmentFilterChange(value: string): void {
    this.selectedDepartment.set(value);
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

  private makeRow(seed: Partial<StaffRow> & { id: number; staffId: string; name: string; initial: string; designation: string; department: string; phone: string; email: string; joiningDate: string; status: 'active' | 'inactive' }): StaffRow {
    return {
      id: seed.id,
      initial: seed.initial,
      name: seed.name,
      staffId: seed.staffId,
      fullName: seed.name,
      fatherName: '',
      gender: '',
      dob: '',
      maritalStatus: '',
      bloodGroup: '',
      religion: '',
      nationality: 'Pakistani',
      cnic: '',
      designation: seed.designation,
      department: seed.department,
      subjectSpecialization: '',
      joiningDate: seed.joiningDate,
      leavingDate: '',
      experienceYears: null,
      previousEmployer: '',
      qualification: '',
      basicSalary: null,
      phone: seed.phone,
      email: seed.email,
      address: '',
      city: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      bankName: '',
      bankAccountNo: '',
      bankBranch: '',
      iban: '',
      taxNumber: '',
      eobiNumber: '',
      username: '',
      notes: '',
      status: seed.status,
    };
  }

  private rowToFormValue(row: StaffRow): StaffFormValue {
    return {
      id: row.id,
      staffId: row.staffId,
      fullName: row.fullName,
      fatherName: row.fatherName,
      gender: row.gender,
      dob: row.dob,
      maritalStatus: row.maritalStatus,
      bloodGroup: row.bloodGroup,
      religion: row.religion,
      nationality: row.nationality,
      cnic: row.cnic,
      designation: row.designation,
      department: row.department,
      subjectSpecialization: row.subjectSpecialization,
      joiningDate: row.joiningDate,
      leavingDate: row.leavingDate,
      experienceYears: row.experienceYears,
      previousEmployer: row.previousEmployer,
      qualification: row.qualification,
      basicSalary: row.basicSalary,
      phone: row.phone,
      email: row.email,
      address: row.address,
      city: row.city,
      emergencyContactName: row.emergencyContactName,
      emergencyContactPhone: row.emergencyContactPhone,
      bankName: row.bankName,
      bankAccountNo: row.bankAccountNo,
      bankBranch: row.bankBranch,
      iban: row.iban,
      taxNumber: row.taxNumber,
      eobiNumber: row.eobiNumber,
      username: row.username,
      notes: row.notes,
      status: row.status,
    };
  }

  private mergeRow(existing: StaffRow, value: StaffFormValue): StaffRow {
    const fullName = value.fullName?.trim() || existing.fullName;
    const initial = fullName ? fullName.charAt(0).toUpperCase() : existing.initial || '?';
    return {
      ...existing,
      staffId: value.staffId,
      fullName,
      name: fullName,
      initial,
      fatherName: value.fatherName,
      gender: value.gender,
      dob: value.dob,
      maritalStatus: value.maritalStatus,
      bloodGroup: value.bloodGroup,
      religion: value.religion,
      nationality: value.nationality,
      cnic: value.cnic,
      designation: value.designation,
      department: value.department,
      subjectSpecialization: value.subjectSpecialization,
      joiningDate: value.joiningDate,
      leavingDate: value.leavingDate,
      experienceYears: value.experienceYears,
      previousEmployer: value.previousEmployer,
      qualification: value.qualification,
      basicSalary: value.basicSalary,
      phone: value.phone,
      email: value.email,
      address: value.address,
      city: value.city,
      emergencyContactName: value.emergencyContactName,
      emergencyContactPhone: value.emergencyContactPhone,
      bankName: value.bankName,
      bankAccountNo: value.bankAccountNo,
      bankBranch: value.bankBranch,
      iban: value.iban,
      taxNumber: value.taxNumber,
      eobiNumber: value.eobiNumber,
      username: value.username,
      notes: value.notes,
      status: value.status,
    };
  }
}
