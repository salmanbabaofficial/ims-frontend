import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface SubjectFormValue {
  id?: number;
  code: string;
  name: string;
  className: string;
  totalMarks: number | null;
  passingMarks: number | null;
  isOptional: boolean;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-add-edit-subject',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-subject.component.html',
  styleUrl: './add-edit-subject.component.css',
})
export class AddEditSubjectComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;

  readonly editing = input<Partial<SubjectFormValue> | null>(null);
  readonly viewOnly = input<boolean>(false);
  readonly classOptions = input<string[]>([]);
  readonly cancelled = output<void>();
  readonly saved = output<SubjectFormValue>();

  model: SubjectFormValue = {
    code: '',
    name: '',
    className: '',
    totalMarks: 100,
    passingMarks: 40,
    isOptional: false,
    status: 'active',
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
    if (this.isView) return 'View Subject';
    if (this.isEdit) return 'Edit Subject';
    return 'Add New Subject';
  }

  get pageSubtitle(): string {
    if (this.isView) return 'Read-only view of subject details.';
    if (this.isEdit) return 'Update subject details below.';
    return 'Define a subject taught for a specific class.';
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onSave(): void {
    this.saved.emit({ ...this.model });
  }
}
