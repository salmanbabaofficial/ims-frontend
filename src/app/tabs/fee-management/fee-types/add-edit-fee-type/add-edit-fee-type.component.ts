import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface FeeTypeFormValue {
  id?: number;
  name: string;
  code: string;
  frequency: 'monthly' | 'one-time' | 'yearly' | 'quarterly';
  defaultAmount: number | null;
  applicableTo: string;
  account: string;
  isMandatory: boolean;
  isRefundable: boolean;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-add-edit-fee-type',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-fee-type.component.html',
  styleUrl: './add-edit-fee-type.component.css',
})
export class AddEditFeeTypeComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;

  readonly editing = input<Partial<FeeTypeFormValue> | null>(null);
  readonly cancelled = output<void>();
  readonly saved = output<FeeTypeFormValue>();

  readonly accounts = ['Tuition Account', 'Examination Account', 'Transport Account', 'Hostel Account', 'Library Account', 'Activity Account', 'Other'];

  model: FeeTypeFormValue = {
    name: '',
    code: '',
    frequency: 'monthly',
    defaultAmount: null,
    applicableTo: '',
    account: '',
    isMandatory: true,
    isRefundable: false,
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
