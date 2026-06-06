import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface ClassFormValue {
  id?: number;
  name: string;
  code: string;
  level: string;
  displayOrder: number | null;
  capacity: number | null;
  classTeacher: string;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-add-edit-class',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-class.component.html',
  styleUrl: './add-edit-class.component.css',
})
export class AddEditClassComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;

  readonly editing = input<Partial<ClassFormValue> | null>(null);
  readonly cancelled = output<void>();
  readonly saved = output<ClassFormValue>();

  readonly levels = ['Pre-Primary', 'Primary', 'Middle', 'Secondary', 'Higher Secondary'];
  readonly teachers = ['—', 'Ms. Ayesha Tariq', 'Mr. Khalid Rasheed', 'Ms. Sara Iqbal', 'Mr. Bilal Ahmad'];

  model: ClassFormValue = {
    name: '',
    code: '',
    level: '',
    displayOrder: null,
    capacity: null,
    classTeacher: '',
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
