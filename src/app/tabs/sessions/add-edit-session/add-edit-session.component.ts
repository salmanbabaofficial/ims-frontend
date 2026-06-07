import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface SessionFormValue {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-add-edit-session',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-session.component.html',
  styleUrl: './add-edit-session.component.css',
})
export class AddEditSessionComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;

  readonly editing = input<SessionFormValue | null>(null);
  readonly viewOnly = input<boolean>(false);
  readonly cancelled = output<void>();
  readonly saved = output<SessionFormValue>();

  model: SessionFormValue = {
    name: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    status: 'active',
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
    if (this.isView) return 'View Session';
    if (this.isEdit) return 'Edit Session';
    return 'Add New Session';
  }

  get pageSubtitle(): string {
    if (this.isView) return 'Read-only view of session details.';
    if (this.isEdit) return 'Update session details below.';
    return 'Define a new academic session with start and end dates.';
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onSave(): void {
    this.saved.emit({ ...this.model });
  }
}
