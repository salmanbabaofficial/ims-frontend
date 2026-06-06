import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

interface AllowanceRow {
  id: number;
  staffName: string;
  initial: string;
  designation: string;
  houseRent: number;
  transport: number;
  medical: number;
  other: number;
}

@Component({
  selector: 'app-staff-allowances',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './staff-allowances.component.html',
  styleUrl: './staff-allowances.component.css',
})
export class StaffAllowancesComponent {
  readonly faPlus = faPlus;
  readonly faPenToSquare = faPenToSquare;
  readonly faSave = faSave;

  selectedDepartment = 'all';
  readonly departments = ['Academic', 'Administration', 'Accounts', 'Library', 'Sports'];

  readonly rows = signal<AllowanceRow[]>([
    { id: 1, staffName: 'Ayesha Khan', initial: 'A', designation: 'Principal', houseRent: 20000, transport: 8000, medical: 5000, other: 3000 },
    { id: 2, staffName: 'Bilal Ahmed', initial: 'B', designation: 'Vice Principal', houseRent: 18000, transport: 7000, medical: 4500, other: 2500 },
    { id: 3, staffName: 'Sara Iqbal', initial: 'S', designation: 'Senior Teacher', houseRent: 12000, transport: 5000, medical: 3500, other: 2000 },
    { id: 4, staffName: 'Hamza Raza', initial: 'H', designation: 'Accountant', houseRent: 10000, transport: 4500, medical: 3000, other: 1500 },
  ]);

  totalFor(r: AllowanceRow): number {
    return r.houseRent + r.transport + r.medical + r.other;
  }
}
