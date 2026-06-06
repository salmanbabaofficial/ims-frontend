import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons';

export interface StudentFormValue {
  id?: number;

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

@Component({
  selector: 'app-add-edit-student',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-student.component.html',
  styleUrl: './add-edit-student.component.css',
})
export class AddEditStudentComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;
  readonly faCamera = faCamera;

  readonly editing = input<Partial<StudentFormValue> | null>(null);
  readonly showBackBar = input<boolean>(true);
  readonly cancelled = output<void>();
  readonly saved = output<StudentFormValue>();

  readonly classes = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  readonly sections = ['A', 'B', 'C'];
  readonly bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  readonly religions = ['Islam', 'Christianity', 'Hinduism', 'Sikhism', 'Other'];
  readonly nationalities = ['Pakistani', 'Indian', 'Bangladeshi', 'Afghan', 'Other'];
  readonly categories = ['General', 'Special', 'Scholarship', 'Other'];
  readonly houses = ['Red', 'Blue', 'Green', 'Yellow'];
  readonly relations = ['Father', 'Mother', 'Uncle', 'Aunt', 'Grandfather', 'Grandmother', 'Brother', 'Sister', 'Other'];
  readonly transportRoutes = ['—', 'Route 1', 'Route 2', 'Route 3', 'Route 4'];

  model: StudentFormValue = {
    admissionNo: '',
    rollNo: '',
    fullName: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    religion: '',
    nationality: 'Pakistani',
    cnic: '',
    bForm: '',
    category: 'General',

    className: '',
    section: '',
    admissionDate: '',
    previousSchool: '',
    house: '',
    feeConcession: null,

    fatherName: '',
    fatherCnic: '',
    fatherOccupation: '',
    fatherPhone: '',
    fatherEmail: '',

    motherName: '',
    motherCnic: '',
    motherOccupation: '',
    motherPhone: '',

    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',

    phone: '',
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
