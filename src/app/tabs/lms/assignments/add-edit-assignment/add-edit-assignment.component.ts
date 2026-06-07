import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPaperclip } from '@fortawesome/free-solid-svg-icons';

export interface AssignmentFormValue {
  id?: number;
  title: string;
  subject: string;
  className: string;
  section: string;
  assignedOn: string;
  dueOn: string;
  totalMarks: number;
  description: string;
}

@Component({
  selector: 'app-add-edit-assignment',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-assignment.component.html',
  styleUrl: './add-edit-assignment.component.css',
})
export class AddEditAssignmentComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;
  readonly faPaperclip = faPaperclip;

  readonly editing = input<AssignmentFormValue | null>(null);
  readonly viewOnly = input<boolean>(false);
  readonly cancelled = output<void>();
  readonly saved = output<AssignmentFormValue>();

  readonly classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  readonly sectionOptions = ['A', 'B', 'C'];
  readonly subjectOptions = ['English', 'Urdu', 'Mathematics', 'Science', 'Islamiat'];

  model: AssignmentFormValue = {
    title: '',
    subject: '',
    className: '',
    section: '',
    assignedOn: '',
    dueOn: '',
    totalMarks: 0,
    description: '',
  };

  ngOnInit(): void {
    const current = this.editing();
    if (current) {
      this.model = { ...current };
    }
  }

  get isEdit(): boolean {
    return !!this.editing() && !this.viewOnly();
  }

  get isView(): boolean {
    return this.viewOnly();
  }

  get pageTitle(): string {
    if (this.isView) return 'View Assignment';
    if (this.isEdit) return 'Edit Assignment';
    return 'Add New Assignment';
  }

  get pageSubtitle(): string {
    if (this.isView) return 'Read-only view of assignment details.';
    if (this.isEdit) return 'Update assignment details below.';
    return 'Create a new assignment for the selected class & subject.';
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onSave(): void {
    this.saved.emit({ ...this.model });
  }
}
