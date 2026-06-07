import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface ExamGroupFormValue {
  id?: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-add-edit-exam-group',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-exam-group.component.html',
  styleUrl: './add-edit-exam-group.component.css',
})
export class AddEditExamGroupComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;

  readonly editing = input<Partial<ExamGroupFormValue> | null>(null);
  readonly viewOnly = input<boolean>(false);
  readonly cancelled = output<void>();
  readonly saved = output<ExamGroupFormValue>();

  model: ExamGroupFormValue = {
    name: '',
    description: '',
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
    if (this.isView) return 'View Exam Group';
    if (this.isEdit) return 'Edit Exam Group';
    return 'Add New Exam Group';
  }

  get pageSubtitle(): string {
    if (this.isView) return 'Read-only view of exam group details.';
    if (this.isEdit) return 'Update exam group details below.';
    return 'Group related exams together (terms, finals, monthly tests).';
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onSave(): void {
    this.saved.emit({ ...this.model });
  }
}
