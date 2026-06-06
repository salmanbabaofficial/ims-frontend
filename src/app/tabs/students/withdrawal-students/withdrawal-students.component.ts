import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faMagnifyingGlass,
  faRotateLeft,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

interface WithdrawnStudent {
  id: number;
  admissionNo: string;
  name: string;
  initial: string;
  fatherName: string;
  className: string;
  section: string;
  withdrawnOn: string;
  reason: string;
}

@Component({
  selector: 'app-withdrawal-students',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective],
  templateUrl: './withdrawal-students.component.html',
  styleUrl: './withdrawal-students.component.css',
})
export class WithdrawalStudentsComponent {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faRotateLeft = faRotateLeft;
  readonly faTrash = faTrash;

  searchTerm = '';
  selectedClass = 'all';

  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  readonly rows: WithdrawnStudent[] = [
    { id: 1, admissionNo: 'ADM-0011', name: 'Asad Khan', initial: 'A', fatherName: 'Khan Wali', className: 'Class 3', section: 'A', withdrawnOn: '15 May 2026', reason: 'Family relocated' },
    { id: 2, admissionNo: 'ADM-0014', name: 'Nida Yousaf', initial: 'N', fatherName: 'Yousaf Pervaiz', className: 'Class 2', section: 'B', withdrawnOn: '02 May 2026', reason: 'Transferred to another school' },
    { id: 3, admissionNo: 'ADM-0019', name: 'Zeeshan Akram', initial: 'Z', fatherName: 'Akram Hussain', className: 'Class 5', section: 'A', withdrawnOn: '20 Apr 2026', reason: 'Personal reasons' },
  ];

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }
}
