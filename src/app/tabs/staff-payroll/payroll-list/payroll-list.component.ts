import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faFileExport, faPrint, faSackDollar } from '@fortawesome/free-solid-svg-icons';

interface PayrollRow {
  id: number;
  staffName: string;
  initial: string;
  designation: string;
  basic: number;
  allowances: number;
  deductions: number;
  net: number;
  status: 'generated' | 'paid';
}

@Component({
  selector: 'app-payroll-list',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './payroll-list.component.html',
  styleUrl: './payroll-list.component.css',
})
export class PayrollListComponent {
  readonly faEye = faEye;
  readonly faPrint = faPrint;
  readonly faFileExport = faFileExport;
  readonly faSackDollar = faSackDollar;

  selectedMonth = '2026-06';
  selectedDepartment = 'all';

  readonly departments = ['Academic', 'Administration', 'Accounts', 'Library', 'Sports'];

  readonly rows: PayrollRow[] = [
    { id: 1, staffName: 'Ayesha Khan', initial: 'A', designation: 'Principal', basic: 120000, allowances: 36000, deductions: 8000, net: 148000, status: 'paid' },
    { id: 2, staffName: 'Bilal Ahmed', initial: 'B', designation: 'Vice Principal', basic: 95000, allowances: 32000, deductions: 6500, net: 120500, status: 'paid' },
    { id: 3, staffName: 'Sara Iqbal', initial: 'S', designation: 'Senior Teacher', basic: 65000, allowances: 22500, deductions: 4500, net: 83000, status: 'generated' },
    { id: 4, staffName: 'Hamza Raza', initial: 'H', designation: 'Accountant', basic: 55000, allowances: 19000, deductions: 4000, net: 70000, status: 'generated' },
    { id: 5, staffName: 'Maryam Tariq', initial: 'M', designation: 'Librarian', basic: 45000, allowances: 16000, deductions: 3000, net: 58000, status: 'generated' },
  ];

  get totalNet(): number {
    return this.rows.reduce((sum, r) => sum + r.net, 0);
  }
}
