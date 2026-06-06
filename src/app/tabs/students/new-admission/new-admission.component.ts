import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faMagnifyingGlass,
  faPenToSquare,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

interface NewAdmissionRow {
  id: number;
  admissionNo: string;
  name: string;
  initial: string;
  fatherName: string;
  className: string;
  section: string;
  phone: string;
  admissionDate: string;
}

@Component({
  selector: 'app-new-admission',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective],
  templateUrl: './new-admission.component.html',
  styleUrl: './new-admission.component.css',
})
export class NewAdmissionComponent {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPenToSquare = faPenToSquare;
  readonly faPrint = faPrint;

  searchTerm = '';
  selectedClass = 'all';

  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  readonly rows: NewAdmissionRow[] = [
    { id: 1, admissionNo: 'ADM-0026', name: 'Hassan Ali', initial: 'H', fatherName: 'Ali Raza', className: 'Class 1', section: 'A', phone: '0300-1234567', admissionDate: '05 Jun 2026' },
    { id: 2, admissionNo: 'ADM-0027', name: 'Ayesha Bibi', initial: 'A', fatherName: 'Akhter Mahmood', className: 'Nursery', section: 'A', phone: '0301-2345678', admissionDate: '04 Jun 2026' },
    { id: 3, admissionNo: 'ADM-0028', name: 'Usman Tariq', initial: 'U', fatherName: 'Tariq Mehmood', className: 'KG', section: 'B', phone: '0302-3456789', admissionDate: '03 Jun 2026' },
    { id: 4, admissionNo: 'ADM-0029', name: 'Maryam Faisal', initial: 'M', fatherName: 'Faisal Ahmed', className: 'Class 2', section: 'A', phone: '0303-4567890', admissionDate: '02 Jun 2026' },
  ];

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }
}
