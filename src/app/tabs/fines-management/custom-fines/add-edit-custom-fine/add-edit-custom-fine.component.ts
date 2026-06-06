import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface CustomFineFormValue {
  id?: number;
  referenceNo: string;
  studentId: string;
  fineType: string;
  amount: number | null;
  imposedOn: string;
  reason: string;
  issuedBy: string;
  paidDate: string;
  paymentMethod: string;
  status: 'paid' | 'unpaid';
}

@Component({
  selector: 'app-add-edit-custom-fine',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-custom-fine.component.html',
  styleUrl: './add-edit-custom-fine.component.css',
})
export class AddEditCustomFineComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;
  readonly editing = input<Partial<CustomFineFormValue> | null>(null);
  readonly cancelled = output<void>();
  readonly saved = output<CustomFineFormValue>();

  readonly fineTypes = ['Misbehavior', 'Late Submission', 'Damaged Property', 'Uniform Violation', 'Late Arrival', 'Library Late Return', 'Other'];
  readonly issuers = ['Principal', 'Vice Principal', 'Class Teacher', 'Coordinator', 'Discipline Committee'];
  readonly paymentMethods = ['Cash', 'Bank Transfer', 'Cheque', 'Online'];
  readonly students = [
    { id: 'ADM-0001', name: 'Ali Hassan' },
    { id: 'ADM-0002', name: 'Fatima Noor' },
    { id: 'ADM-0003', name: 'Ahmad Raza' },
  ];

  model: CustomFineFormValue = {
    referenceNo: '',
    studentId: '',
    fineType: '',
    amount: null,
    imposedOn: '',
    reason: '',
    issuedBy: '',
    paidDate: '',
    paymentMethod: '',
    status: 'unpaid',
  };

  ngOnInit(): void {
    const current = this.editing();
    if (current) {
      this.model = { ...this.model, ...current };
    }
  }

  get isEdit(): boolean { return !!this.editing(); }
  onCancel(): void { this.cancelled.emit(); }
  onSave(): void { this.saved.emit({ ...this.model }); }
}
