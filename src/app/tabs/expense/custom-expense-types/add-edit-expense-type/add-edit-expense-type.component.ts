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
  readonly viewOnly = input<boolean>(false);
  readonly cancelled = output<void>();
  readonly saved = output<ExpenseTypeFormValue>();

  readonly categories = ['Administrative', 'Facilities', 'Activities', 'Operations', 'Salaries', 'Other'];

  model: ExpenseTypeFormValue = { name: '', category: '', description: '', status: 'active' };

  ngOnInit(): void {
    const current = this.editing();
    if (current) this.model = { ...current };
  }

  get isEdit(): boolean { return !!this.editing() && !this.viewOnly(); }
  get isView(): boolean { return this.viewOnly(); }

  get pageTitle(): string {
    if (this.isView) return 'View Expense Type';
    if (this.isEdit) return 'Edit Expense Type';
    return 'Add Expense Type';
  }

  get pageSubtitle(): string {
    if (this.isView) return 'Read-only view of expense type details.';
    if (this.isEdit) return 'Update the expense category details below.';
    return 'Define a new category for expenses.';
  }

  onCancel(): void { this.cancelled.emit(); }
  onSave(): void { this.saved.emit({ ...this.model }); }
}
