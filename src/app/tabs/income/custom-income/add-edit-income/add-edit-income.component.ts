import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface IncomeFormValue {
  id?: number;
  date: string;
  voucherNo: string;
  referenceNo: string;
  type: string;
  description: string;
  amount: number | null;
  taxPercent: number | null;
  receivedFrom: string;
  paymentMethod: string;
  bankAccount: string;
  attachmentName: string;
  status: 'received' | 'pending';
  notes: string;
}

@Component({
  selector: 'app-add-edit-income',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-income.component.html',
  styleUrl: './add-edit-income.component.css',
})
export class AddEditIncomeComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;
  readonly editing = input<Partial<IncomeFormValue> | null>(null);
  readonly viewOnly = input<boolean>(false);
  readonly cancelled = output<void>();
  readonly saved = output<IncomeFormValue>();

  readonly types = ['Donations', 'Sponsorships', 'Rental Income', 'Book Sales', 'Uniform Sales', 'Tuck Shop', 'Other'];
  readonly methods = ['Cash', 'Bank Transfer', 'Cheque', 'Online'];
  readonly bankAccounts = ['HBL - Main Account', 'MCB - Petty Cash', 'Meezan - Operations', 'Cash in Hand'];

  model: IncomeFormValue = {
    date: '',
    voucherNo: '',
    referenceNo: '',
    type: '',
    description: '',
    amount: null,
    taxPercent: null,
    receivedFrom: '',
    paymentMethod: 'Cash',
    bankAccount: '',
    attachmentName: '',
    status: 'received',
    notes: '',
  };

  ngOnInit(): void {
    const current = this.editing();
    if (current) this.model = { ...this.model, ...current };
  }
  get isEdit(): boolean { return !!this.editing() && !this.viewOnly(); }
  get isView(): boolean { return this.viewOnly(); }

  get pageTitle(): string {
    if (this.isView) return 'View Income';
    if (this.isEdit) return 'Edit Income';
    return 'Add Income';
  }

  get pageSubtitle(): string {
    if (this.isView) return 'Read-only view of income details.';
    if (this.isEdit) return 'Update the income entry below.';
    return 'Record an incoming amount.';
  }

  onCancel(): void { this.cancelled.emit(); }
  onSave(): void { this.saved.emit({ ...this.model }); }

  onFile(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    this.model.attachmentName = input.files?.[0]?.name ?? '';
  }
}
