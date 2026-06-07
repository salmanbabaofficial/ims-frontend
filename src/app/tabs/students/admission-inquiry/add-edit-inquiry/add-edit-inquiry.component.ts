import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface InquiryFormValue {
  id?: number;
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

@Component({
  selector: 'app-add-edit-inquiry',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-inquiry.component.html',
  styleUrl: './add-edit-inquiry.component.css',
})
export class AddEditInquiryComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;

  readonly editing = input<Partial<InquiryFormValue> | null>(null);
  readonly viewOnly = input<boolean>(false);
  readonly cancelled = output<void>();
  readonly saved = output<InquiryFormValue>();

  readonly classes = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  readonly sources = ['Walk-in', 'Phone Call', 'Website', 'Referral', 'Social Media', 'Newspaper Ad', 'Flyer', 'Other'];
  readonly relations = ['Father', 'Mother', 'Guardian', 'Uncle', 'Aunt', 'Other'];
  readonly assignees = ['Admission Office', 'Principal', 'Vice Principal', 'Coordinator'];

  model: InquiryFormValue = {
    inquiryNo: '',
    inquiryDate: '',
    studentName: '',
    studentDob: '',
    gender: '',
    classFor: '',
    currentlyStudying: '',
    previousSchool: '',
    parentName: '',
    relation: '',
    phone: '',
    alternatePhone: '',
    email: '',
    occupation: '',
    address: '',
    city: '',
    source: '',
    sourceDetails: '',
    assignedTo: '',
    followUpDate: '',
    notes: '',
    status: 'new',
  };

  ngOnInit(): void {
    const current = this.editing();
    if (current) {
      this.model = { ...this.model, ...current };
    }
  }

  get isEdit(): boolean {
    return !!this.editing() && !this.viewOnly();
  }

  get isView(): boolean {
    return this.viewOnly();
  }

  get pageTitle(): string {
    if (this.isView) return 'View Inquiry';
    if (this.isEdit) return 'Edit Inquiry';
    return 'Add New Inquiry';
  }

  get pageSubtitle(): string {
    if (this.isView) return 'Read-only view of inquiry details.';
    if (this.isEdit) return 'Update inquiry details below.';
    return 'Record a new admission inquiry from a prospective parent.';
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onSave(): void {
    this.saved.emit({ ...this.model });
  }
}
