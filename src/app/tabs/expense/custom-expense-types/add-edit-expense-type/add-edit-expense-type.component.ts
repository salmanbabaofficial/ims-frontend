import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface ExpenseTypeFormValue {
  id?: number;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-add-edit-expense-type',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-expense-type.component.html',
  styleUrl: './add-edit-expense-type.component.css',
})
export class AddEditExpenseTypeComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;
  readonly editing = input<ExpenseTypeFormValue | null>(null);
  readonly cancelled = output<void>();
  readonly saved = output<ExpenseTypeFormValue>();

  readonly categories = ['Administrative', 'Facilities', 'Activities', 'Operations', 'Salaries', 'Other'];

  model: ExpenseTypeFormValue = { name: '', category: '', description: '', status: 'active' };

  ngOnInit(): void {
    const current = this.editing();
    if (current) this.model = { ...current };
  }
  get isEdit(): boolean { return !!this.editing(); }
  onCancel(): void { this.cancelled.emit(); }
  onSave(): void { this.saved.emit({ ...this.model }); }
}
