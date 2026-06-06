import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface IncomeTypeFormValue {
  id?: number;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-add-edit-income-type',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-income-type.component.html',
  styleUrl: './add-edit-income-type.component.css',
})
export class AddEditIncomeTypeComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;
  readonly editing = input<IncomeTypeFormValue | null>(null);
  readonly cancelled = output<void>();
  readonly saved = output<IncomeTypeFormValue>();

  readonly categories = ['Internal', 'External', 'Other'];

  model: IncomeTypeFormValue = { name: '', category: '', description: '', status: 'active' };

  ngOnInit(): void {
    const current = this.editing();
    if (current) this.model = { ...current };
  }
  get isEdit(): boolean { return !!this.editing(); }
  onCancel(): void { this.cancelled.emit(); }
  onSave(): void { this.saved.emit({ ...this.model }); }
}
