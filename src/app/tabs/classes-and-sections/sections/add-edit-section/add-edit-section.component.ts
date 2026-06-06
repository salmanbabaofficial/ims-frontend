import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface SectionFormValue {
  id?: number;
  className: string;
  name: string;
  capacity: number | null;
  classTeacher: string;
  roomNumber: string;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-add-edit-section',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-section.component.html',
  styleUrl: './add-edit-section.component.css',
})
export class AddEditSectionComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;

  readonly editing = input<Partial<SectionFormValue> | null>(null);
  readonly classOptions = input<string[]>([]);
  readonly teacherOptions = input<string[]>([]);
  readonly cancelled = output<void>();
  readonly saved = output<SectionFormValue>();

  model: SectionFormValue = {
    className: '',
    name: '',
    capacity: null,
    classTeacher: '',
    roomNumber: '',
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
    return !!this.editing();
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onSave(): void {
    this.saved.emit({ ...this.model });
  }
}
