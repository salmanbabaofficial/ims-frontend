import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faFileExport,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import {
  AddEditStudentComponent,
  StudentFormValue,
} from './add-edit-student/add-edit-student.component';

interface StudentRow {
  id: number;
  initial: string;
  name: string;
  feeStatus: 'paid' | 'pending' | 'defaulter';

  admissionNo: string;
  rollNo: string;
  fullName: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  religion: string;
  nationality: string;
  cnic: string;
  bForm: string;
  category: string;

  className: string;
  section: string;
  admissionDate: string;
  previousSchool: string;
  house: string;
  feeConcession: number | null;

  fatherName: string;
  fatherCnic: string;
  fatherOccupation: string;
  fatherPhone: string;
  fatherEmail: string;

  motherName: string;
  motherCnic: string;
  motherOccupation: string;
  motherPhone: string;

  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;

  phone: string;
  email: string;
  address: string;
  permanentAddress: string;
  city: string;
  country: string;
  postalCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;

  medicalConditions: string;
  allergies: string;
  transportRoute: string;
  hostelRoom: string;
  siblingInfo: string;

  notes: string;
  status: 'active' | 'inactive';
}

type FormMode = 'add' | 'edit' | 'view';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-active-students',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective, AddEditStudentComponent],
  templateUrl: './active-students.component.html',
  styleUrl: './active-students.component.css',
})
export class ActiveStudentsComponent {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrash = faTrash;
  readonly faFileExport = faFileExport;

  readonly searchTerm = signal('');
  readonly selectedClass = signal<string>('all');
  readonly selectedSection = signal<string>('all');
  readonly selectedStatus = signal<string>('all');
  readonly mode = signal<'list' | 'form'>('list');
  readonly formMode = signal<FormMode>('add');
  readonly editing = signal<Partial<StudentFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly deleteTarget = signal<StudentRow | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly classOptions = [
    'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  ];
  readonly sectionOptions = ['A', 'B', 'C'];

  readonly students = signal<StudentRow[]>([
    this.makeRow({ id: 1, admissionNo: 'ADM-0001', rollNo: '01', name: 'Ali Hassan', initial: 'A', fatherName: 'Hassan Khan', className: 'Class 1', section: 'A', phone: '0300-1111111', feeStatus: 'paid', status: 'active' }),
    this.makeRow({ id: 2, admissionNo: 'ADM-0002', rollNo: '02', name: 'Fatima Noor', initial: 'F', fatherName: 'Noor Ahmed', className: 'Class 1', section: 'A', phone: '0301-2222222', feeStatus: 'pending', status: 'active' }),
    this.makeRow({ id: 3, admissionNo: 'ADM-0003', rollNo: '05', name: 'Ahmad Raza', initial: 'A', fatherName: 'Raza Hussain', className: 'Class 2', section: 'B', phone: '0302-3333333', feeStatus: 'paid', status: 'active' }),
    this.makeRow({ id: 4, admissionNo: 'ADM-0004', rollNo: '12', name: 'Zainab Bibi', initial: 'Z', fatherName: 'Mohammad Ashraf', className: 'Class 5', section: 'A', phone: '0303-4444444', feeStatus: 'defaulter', status: 'active' }),
    this.makeRow({ id: 5, admissionNo: 'ADM-0005', rollNo: '08', name: 'Hamza Iqbal', initial: 'H', fatherName: 'Iqbal Hussain', className: 'Class 9', section: 'B', phone: '0304-5555555', feeStatus: 'pending', status: 'active' }),
    this.makeRow({ id: 6, admissionNo: 'ADM-0006', rollNo: '03', name: 'Maryam Aslam', initial: 'M', fatherName: 'Aslam Pervaiz', className: 'Class 3', section: 'A', phone: '0305-6666666', feeStatus: 'paid', status: 'active' }),
  ]);

  readonly filteredStudents = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const cls = this.selectedClass();
    const sec = this.selectedSection();
    const status = this.selectedStatus();
    return this.students().filter((s) => {
      if (cls !== 'all' && s.className !== cls) return false;
      if (sec !== 'all' && s.section !== sec) return false;
      if (status !== 'all' && s.status !== status) return false;
      if (!term) return true;
      return (
        s.name.toLowerCase().includes(term) ||
        s.admissionNo.toLowerCase().includes(term) ||
        s.rollNo.toLowerCase().includes(term) ||
        s.fatherName.toLowerCase().includes(term) ||
        s.phone.toLowerCase().includes(term)
      );
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredStudents().length / this.pageSize)),
  );

  readonly pagedStudents = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredStudents().slice(start, start + this.pageSize);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  openAdd(): void {
    this.editing.set(null);
    this.formMode.set('add');
    this.mode.set('form');
  }

  openEdit(row: StudentRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('edit');
    this.mode.set('form');
  }

  openView(row: StudentRow): void {
    this.editing.set(this.rowToFormValue(row));
    this.formMode.set('view');
    this.mode.set('form');
  }

  backToList(): void {
    this.mode.set('list');
    this.editing.set(null);
  }

  onSave(value: StudentFormValue): void {
    const current = this.students();

    if (this.formMode() === 'edit' && value.id != null) {
      this.students.set(
        current.map((s) => (s.id === value.id ? this.mergeRow(s, value) : s)),
      );
    } else {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((s) => s.id)) + 1;
      const newRow: StudentRow = this.mergeRow(
        { id: nextId, feeStatus: 'pending' } as StudentRow,
        value,
      );
      this.students.set([...current, newRow]);
    }

    this.backToList();
  }

  askDelete(row: StudentRow): void {
    this.deleteTarget.set(row);
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  confirmDelete(): void {
    const target = this.deleteTarget();
    if (!target) return;
    this.students.set(this.students().filter((s) => s.id !== target.id));
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

  onClassFilterChange(value: string): void {
    this.selectedClass.set(value);
    this.currentPage.set(1);
  }

  onSectionFilterChange(value: string): void {
    this.selectedSection.set(value);
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

  feeLabel(s: StudentRow['feeStatus']): string {
    if (s === 'paid') return 'Paid';
    if (s === 'pending') return 'Pending';
    return 'Defaulter';
  }

  private makeRow(seed: Partial<StudentRow> & { id: number; admissionNo: string; rollNo: string; name: string; initial: string; fatherName: string; className: string; section: string; phone: string; feeStatus: 'paid' | 'pending' | 'defaulter'; status: 'active' | 'inactive' }): StudentRow {
    return {
      id: seed.id,
      initial: seed.initial,
      name: seed.name,
      feeStatus: seed.feeStatus,
      admissionNo: seed.admissionNo,
      rollNo: seed.rollNo,
      fullName: seed.name,
      gender: '',
      dob: '',
      bloodGroup: '',
      religion: '',
      nationality: 'Pakistani',
      cnic: '',
      bForm: '',
      category: 'General',
      className: seed.className,
      section: seed.section,
      admissionDate: '',
      previousSchool: '',
      house: '',
      feeConcession: null,
      fatherName: seed.fatherName,
      fatherCnic: '',
      fatherOccupation: '',
      fatherPhone: seed.phone,
      fatherEmail: '',
      motherName: '',
      motherCnic: '',
      motherOccupation: '',
      motherPhone: '',
      guardianName: '',
      guardianRelation: '',
      guardianPhone: '',
      phone: seed.phone,
      email: '',
      address: '',
      permanentAddress: '',
      city: '',
      country: 'Pakistan',
      postalCode: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      medicalConditions: '',
      allergies: '',
      transportRoute: '',
      hostelRoom: '',
      siblingInfo: '',
      notes: '',
      status: seed.status,
    };
  }

  private rowToFormValue(row: StudentRow): StudentFormValue {
    return {
      id: row.id,
      admissionNo: row.admissionNo,
      rollNo: row.rollNo,
      fullName: row.fullName,
      gender: row.gender,
      dob: row.dob,
      bloodGroup: row.bloodGroup,
      religion: row.religion,
      nationality: row.nationality,
      cnic: row.cnic,
      bForm: row.bForm,
      category: row.category,
      className: row.className,
      section: row.section,
      admissionDate: row.admissionDate,
      previousSchool: row.previousSchool,
      house: row.house,
      feeConcession: row.feeConcession,
      fatherName: row.fatherName,
      fatherCnic: row.fatherCnic,
      fatherOccupation: row.fatherOccupation,
      fatherPhone: row.fatherPhone,
      fatherEmail: row.fatherEmail,
      motherName: row.motherName,
      motherCnic: row.motherCnic,
      motherOccupation: row.motherOccupation,
      motherPhone: row.motherPhone,
      guardianName: row.guardianName,
      guardianRelation: row.guardianRelation,
      guardianPhone: row.guardianPhone,
      phone: row.phone,
      email: row.email,
      address: row.address,
      permanentAddress: row.permanentAddress,
      city: row.city,
      country: row.country,
      postalCode: row.postalCode,
      emergencyContactName: row.emergencyContactName,
      emergencyContactPhone: row.emergencyContactPhone,
      medicalConditions: row.medicalConditions,
      allergies: row.allergies,
      transportRoute: row.transportRoute,
      hostelRoom: row.hostelRoom,
      siblingInfo: row.siblingInfo,
      notes: row.notes,
      status: row.status,
    };
  }

  private mergeRow(existing: StudentRow, value: StudentFormValue): StudentRow {
    const fullName = value.fullName?.trim() || existing.fullName;
    const initial = fullName ? fullName.charAt(0).toUpperCase() : existing.initial || '?';
    return {
      ...existing,
      admissionNo: value.admissionNo,
      rollNo: value.rollNo,
      fullName,
      name: fullName,
      initial,
      gender: value.gender,
      dob: value.dob,
      bloodGroup: value.bloodGroup,
      religion: value.religion,
      nationality: value.nationality,
      cnic: value.cnic,
      bForm: value.bForm,
      category: value.category,
      className: value.className,
      section: value.section,
      admissionDate: value.admissionDate,
      previousSchool: value.previousSchool,
      house: value.house,
      feeConcession: value.feeConcession,
      fatherName: value.fatherName,
      fatherCnic: value.fatherCnic,
      fatherOccupation: value.fatherOccupation,
      fatherPhone: value.fatherPhone,
      fatherEmail: value.fatherEmail,
      motherName: value.motherName,
      motherCnic: value.motherCnic,
      motherOccupation: value.motherOccupation,
      motherPhone: value.motherPhone,
      guardianName: value.guardianName,
      guardianRelation: value.guardianRelation,
      guardianPhone: value.guardianPhone,
      phone: value.phone,
      email: value.email,
      address: value.address,
      permanentAddress: value.permanentAddress,
      city: value.city,
      country: value.country,
      postalCode: value.postalCode,
      emergencyContactName: value.emergencyContactName,
      emergencyContactPhone: value.emergencyContactPhone,
      medicalConditions: value.medicalConditions,
      allergies: value.allergies,
      transportRoute: value.transportRoute,
      hostelRoom: value.hostelRoom,
      siblingInfo: value.siblingInfo,
      notes: value.notes,
      status: value.status,
    };
  }
}
