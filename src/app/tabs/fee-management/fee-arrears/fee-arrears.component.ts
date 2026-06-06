import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faFileExport, faMagnifyingGlass, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

interface ArrearRow {
  id: number;
  admissionNo: string;
  name: string;
  initial: string;
  className: string;
  fatherName: string;
  phone: string;
  monthsOverdue: number;
  amount: number;
}

@Component({
  selector: 'app-fee-arrears',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective],
  templateUrl: './fee-arrears.component.html',
  styleUrl: './fee-arrears.component.css',
})
export class FeeArrearsComponent {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPaperPlane = faPaperPlane;
  readonly faFileExport = faFileExport;

  searchTerm = '';
  selectedClass = 'all';

  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  readonly rows: ArrearRow[] = [
    { id: 1, admissionNo: 'ADM-0001', name: 'Ali Hassan', initial: 'A', className: 'Class 1 - A', fatherName: 'Hassan Khan', phone: '0300-1111111', monthsOverdue: 2, amount: 10000 },
    { id: 2, admissionNo: 'ADM-0014', name: 'Maryam Aslam', initial: 'M', className: 'Class 3 - A', fatherName: 'Aslam Pervaiz', phone: '0305-6666666', monthsOverdue: 3, amount: 18000 },
    { id: 3, admissionNo: 'ADM-0023', name: 'Hamza Iqbal', initial: 'H', className: 'Class 9 - B', fatherName: 'Iqbal Hussain', phone: '0304-5555555', monthsOverdue: 1, amount: 5000 },
    { id: 4, admissionNo: 'ADM-0032', name: 'Zainab Bibi', initial: 'Z', className: 'Class 5 - A', fatherName: 'Mohammad Ashraf', phone: '0303-4444444', monthsOverdue: 4, amount: 26000 },
  ];

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }

  get totalArrears(): number {
    return this.rows.reduce((sum, r) => sum + r.amount, 0);
  }
}
