import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faFileExport, faMagnifyingGlass, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

interface DefaulterRow {
  id: number;
  admissionNo: string;
  name: string;
  initial: string;
  className: string;
  fatherName: string;
  phone: string;
  totalDue: number;
  lastPaid: string;
  daysOverdue: number;
}

@Component({
  selector: 'app-fee-defaulters',
  imports: [FormsModule, FaIconComponent, ClickOutsideDirective],
  templateUrl: './fee-defaulters.component.html',
  styleUrl: './fee-defaulters.component.css',
})
export class FeeDefaultersComponent {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faEye = faEye;
  readonly faPaperPlane = faPaperPlane;
  readonly faFileExport = faFileExport;

  searchTerm = '';
  selectedClass = 'all';
  minDays = '60';

  readonly searchOpen = signal(false);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3'];

  readonly rows: DefaulterRow[] = [
    { id: 1, admissionNo: 'ADM-0032', name: 'Zainab Bibi', initial: 'Z', className: 'Class 5 - A', fatherName: 'Mohammad Ashraf', phone: '0303-4444444', totalDue: 26000, lastPaid: '15 Feb 2026', daysOverdue: 110 },
    { id: 2, admissionNo: 'ADM-0048', name: 'Imran Sheikh', initial: 'I', className: 'Class 6 - B', fatherName: 'Sheikh Asif', phone: '0307-7777777', totalDue: 22000, lastPaid: '10 Mar 2026', daysOverdue: 88 },
    { id: 3, admissionNo: 'ADM-0061', name: 'Sana Akhtar', initial: 'S', className: 'Class 4 - A', fatherName: 'Akhtar Mahmood', phone: '0308-8888888', totalDue: 18000, lastPaid: '20 Mar 2026', daysOverdue: 78 },
  ];

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    this.searchOpen.set(willOpen);
    if (willOpen) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }
}
