import { Component, ElementRef, signal, viewChild } from '@angular/core';
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
  admissionNo: string;
  rollNo: string;
  name: string;
  initial: string;
  fatherName: string;
  className: string;
  section: string;
  phone: string;
  feeStatus: 'paid' | 'pending' | 'defaulter';
  status: 'active' | 'inactive';
}

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

  searchTerm = '';
  selectedClass = 'all';
  selectedSection = 'all';
  selectedStatus = 'all';

  readonly mode = signal<'list' | 'form'>('list');
  readonly editing = signal<Partial<StudentFormValue> | null>(null);
  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly classOptions = [
    'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  ];
  readonly sectionOptions = ['A', 'B', 'C'];

  readonly students: StudentRow[] = [
    { id: 1, admissionNo: 'ADM-0001', rollNo: '01', name: 'Ali Hassan', initial: 'A', fatherName: 'Hassan Khan', className: 'Class 1', section: 'A', phone: '0300-1111111', feeStatus: 'paid', status: 'active' },
    { id: 2, admissionNo: 'ADM-0002', rollNo: '02', name: 'Fatima Noor', initial: 'F', fatherName: 'Noor Ahmed', className: 'Class 1', section: 'A', phone: '0301-2222222', feeStatus: 'pending', status: 'active' },
    { id: 3, admissionNo: 'ADM-0003', rollNo: '05', name: 'Ahmad Raza', initial: 'A', fatherName: 'Raza Hussain', className: 'Class 2', section: 'B', phone: '0302-3333333', feeStatus: 'paid', status: 'active' },
    { id: 4, admissionNo: 'ADM-0004', rollNo: '12', name: 'Zainab Bibi', initial: 'Z', fatherName: 'Mohammad Ashraf', className: 'Class 5', section: 'A', phone: '0303-4444444', feeStatus: 'defaulter', status: 'active' },
    { id: 5, admissionNo: 'ADM-0005', rollNo: '08', name: 'Hamza Iqbal', initial: 'H', fatherName: 'Iqbal Hussain', className: 'Class 9', section: 'B', phone: '0304-5555555', feeStatus: 'pending', status: 'active' },
    { id: 6, admissionNo: 'ADM-0006', rollNo: '03', name: 'Maryam Aslam', initial: 'M', fatherName: 'Aslam Pervaiz', className: 'Class 3', section: 'A', phone: '0305-6666666', feeStatus: 'paid', status: 'active' },
  ];

  openAdd(): void {
    this.editing.set(null);
    this.mode.set('form');
  }

  openEdit(row: StudentRow): void {
    this.editing.set({
      id: row.id,
      admissionNo: row.admissionNo,
      rollNo: row.rollNo,
      fullName: row.name,
      fatherName: row.fatherName,
      motherName: '',
      gender: '',
      dob: '',
      bloodGroup: '',
      religion: '',
      className: row.className,
      section: row.section,
      admissionDate: '',
      previousSchool: '',
      phone: row.phone,
      email: '',
      address: '',
      fatherOccupation: '',
      fatherPhone: '',
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

  feeLabel(s: StudentRow['feeStatus']): string {
    if (s === 'paid') return 'Paid';
    if (s === 'pending') return 'Pending';
    return 'Defaulter';
  }
}
