import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export interface FineTypeFormValue {
  id?: number;
  name: string;
  defaultAmount: number | null;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-add-edit-fine-type',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-fine-type.component.html',
  styleUrl: './add-edit-fine-type.component.css',
})
export class AddEditFineTypeComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;
  readonly editing = input<FineTypeFormValue | null>(null);
  readonly cancelled = output<void>();
  readonly saved = output<FineTypeFormValue>();

  model: FineTypeFormValue = { name: '', defaultAmount: null, description: '', status: 'active' };

  ngOnInit(): void {
    const current = this.editing();
    if (current) this.model = { ...current };
  }

  get isEdit(): boolean {
    return !!this.editing();
  }
  onCancel(): void { this.cancelled.emit(); }
  onSave(): void { this.saved.emit({ ...this.model }); }
}
