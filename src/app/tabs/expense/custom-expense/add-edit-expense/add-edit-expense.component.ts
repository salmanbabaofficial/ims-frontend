import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface ExpenseFormValue {
  id?: number;
  date: string;
  voucherNo: string;
  referenceNo: string;
  type: string;
  description: string;
  amount: number | null;
  taxPercent: number | null;
  paidTo: string;
  paymentMethod: string;
  bankAccount: string;
  attachmentName: string;
  status: 'paid' | 'pending' | 'approved';
  notes: string;
}

@Component({
  selector: 'app-add-edit-expense',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-expense.component.html',
  styleUrl: './add-edit-expense.component.css',
})
export class AddEditExpenseComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;
  readonly editing = input<Partial<ExpenseFormValue> | null>(null);
  readonly viewOnly = input<boolean>(false);
  readonly cancelled = output<void>();
  readonly saved = output<ExpenseFormValue>();

  readonly types = ['Office Supplies', 'Maintenance & Repairs', 'Events & Functions', 'Travel & Conveyance', 'Salaries', 'Utilities (Electricity/Gas/Internet)', 'Rent', 'Marketing', 'Other'];
  readonly methods = ['Cash', 'Bank Transfer', 'Cheque', 'Online'];
  readonly bankAccounts = ['HBL - Main Account', 'MCB - Petty Cash', 'Meezan - Operations', 'Cash in Hand'];

  model: ExpenseFormValue = {
    date: '',
    voucherNo: '',
    referenceNo: '',
    type: '',
    description: '',
    amount: null,
    taxPercent: null,
    paidTo: '',
    paymentMethod: 'Cash',
    bankAccount: '',
    attachmentName: '',
    status: 'paid',
    notes: '',
  };

  ngOnInit(): void {
    const current = this.editing();
    if (current) this.model = { ...this.model, ...current };
  }
  get isEdit(): boolean { return !!this.editing() && !this.viewOnly(); }
  get isView(): boolean { return this.viewOnly(); }

  get pageTitle(): string {
    if (this.isView) return 'View Expense';
    if (this.isEdit) return 'Edit Expense';
    return 'Add Expense';
  }

  get pageSubtitle(): string {
    if (this.isView) return 'Read-only view of expense details.';
    if (this.isEdit) return 'Update the expense entry below.';
    return 'Record a new expense entry.';
  }

  onCancel(): void { this.cancelled.emit(); }
  onSave(): void { this.saved.emit({ ...this.model }); }

  onFile(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    this.model.attachmentName = input.files?.[0]?.name ?? '';
  }
}
