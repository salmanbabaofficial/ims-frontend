import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface ExamFormValue {
  id?: number;
  name: string;
  group: string;
  className: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

@Component({
  selector: 'app-add-edit-exam',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-exam.component.html',
  styleUrl: './add-edit-exam.component.css',
})
export class AddEditExamComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;

  readonly editing = input<Partial<ExamFormValue> | null>(null);
  readonly viewOnly = input<boolean>(false);
  readonly groupOptions = input<string[]>([]);
  readonly classOptions = input<string[]>([]);
  readonly cancelled = output<void>();
  readonly saved = output<ExamFormValue>();

  model: ExamFormValue = {
    name: '',
    group: '',
    className: '',
    startDate: '',
    endDate: '',
    status: 'upcoming',
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
    if (this.isView) return 'View Exam';
    if (this.isEdit) return 'Edit Exam';
    return 'Add New Exam';
  }

  get pageSubtitle(): string {
    if (this.isView) return 'Read-only view of exam details.';
    if (this.isEdit) return 'Update exam details below.';
    return 'Schedule a new exam for a class within an exam group.';
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onSave(): void {
    this.saved.emit({ ...this.model });
  }
}
