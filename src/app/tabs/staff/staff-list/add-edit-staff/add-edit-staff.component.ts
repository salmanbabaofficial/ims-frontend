import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons';

export interface StaffFormValue {
  id?: number;

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

@Component({
  selector: 'app-add-edit-staff',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-staff.component.html',
  styleUrl: './add-edit-staff.component.css',
})
export class AddEditStaffComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;
  readonly faCamera = faCamera;

  readonly editing = input<Partial<StaffFormValue> | null>(null);
  readonly cancelled = output<void>();
  readonly saved = output<StaffFormValue>();

  readonly departments = ['Academic', 'Administration', 'Accounts', 'Library', 'Sports', 'Maintenance', 'Transport', 'Hostel', 'IT'];
  readonly designations = ['Principal', 'Vice Principal', 'Senior Teacher', 'Teacher', 'Accountant', 'Librarian', 'PE Coach', 'Clerk', 'Helper', 'Driver', 'Guard'];
  readonly subjects = ['English', 'Urdu', 'Mathematics', 'Science', 'Islamiat', 'Pak Studies', 'Computer Science', 'Physics', 'Chemistry', 'Biology', 'Other'];
  readonly maritalOptions = ['Single', 'Married', 'Divorced', 'Widowed'];
  readonly bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  readonly religions = ['Islam', 'Christianity', 'Hinduism', 'Sikhism', 'Other'];
  readonly nationalities = ['Pakistani', 'Indian', 'Bangladeshi', 'Afghan', 'Other'];

  model: StaffFormValue = {
    staffId: '',
    fullName: '',
    fatherName: '',
    gender: '',
    dob: '',
    maritalStatus: '',
    bloodGroup: '',
    religion: '',
    nationality: 'Pakistani',
    cnic: '',

    designation: '',
    department: '',
    subjectSpecialization: '',
    joiningDate: '',
    leavingDate: '',
    experienceYears: null,
    previousEmployer: '',
    qualification: '',
    basicSalary: null,

    phone: '',
    email: '',
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
    status: 'active',
  };

  ngOnInit(): void {
    const current = this.editing();
    if (current) {
      this.model = { ...this.model, ...current };
    }
  }

  get isEdit(): boolean {
    return !!this.editing();
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onSave(): void {
    this.saved.emit({ ...this.model });
  }
}
