import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export type UserRoleValue = 'Admin' | 'Teacher' | 'Accountant' | 'Parent' | 'Student';

export interface UserFormValue {
  id?: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  role: UserRoleValue;
  password: string;
  confirmPassword: string;
  status: 'active' | 'inactive';
  sendCredentials: boolean;
  notes: string;
}

@Component({
  selector: 'app-add-edit-user',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css',
})
export class AddEditUserComponent implements OnInit {
  readonly faArrowLeft = faArrowLeft;
  readonly faEye = faEye;
  readonly faEyeSlash = faEyeSlash;

  readonly editing = input<UserFormValue | null>(null);
  readonly cancelled = output<void>();
  readonly saved = output<UserFormValue>();

  showPassword = false;
  showConfirm = false;

  readonly roleOptions: UserRoleValue[] = ['Admin', 'Teacher', 'Accountant', 'Parent', 'Student'];

  model: UserFormValue = {
    name: '',
    email: '',
    phone: '',
    username: '',
    role: 'Teacher',
    password: '',
    confirmPassword: '',
    status: 'active',
    sendCredentials: true,
    notes: '',
  };

  ngOnInit(): void {
    const current = this.editing();
    if (current) {
      this.model = { ...current };
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
