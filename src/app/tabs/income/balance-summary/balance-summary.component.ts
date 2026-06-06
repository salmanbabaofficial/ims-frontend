import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp, faChartLine, faMoneyBillTransfer, faPrint, faSackDollar, faWallet } from '@fortawesome/free-solid-svg-icons';

interface SummaryStat {
  label: string;
  value: string;
  trend: number;
  icon: 'income' | 'expense' | 'profit' | 'cash';
}

interface MonthlyPoint {
  label: string;
  income: number;
  expense: number;
}

interface RecentTxn {
  id: number;
  date: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
}

@Component({
  selector: 'app-balance-summary',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './balance-summary.component.html',
  styleUrl: './balance-summary.component.css',
})
export class BalanceSummaryComponent {
  readonly faChartLine = faChartLine;
  readonly faSackDollar = faSackDollar;
  readonly faMoneyBillTransfer = faMoneyBillTransfer;
  readonly faWallet = faWallet;
  readonly faArrowUp = faArrowUp;
  readonly faArrowDown = faArrowDown;
  readonly faPrint = faPrint;

  startDate = '2026-01-01';
  endDate = '2026-06-30';

  readonly stats: SummaryStat[] = [
    { label: 'Total Income', value: 'Rs. 1,420,000', trend: 12, icon: 'income' },
    { label: 'Total Expense', value: 'Rs. 678,500', trend: -5, icon: 'expense' },
    { label: 'Net Profit', value: 'Rs. 741,500', trend: 18, icon: 'profit' },
    { label: 'Cash in Hand', value: 'Rs. 892,000', trend: 7, icon: 'cash' },
  ];

  readonly monthly: MonthlyPoint[] = [
    { label: 'Jan', income: 220, expense: 110 },
    { label: 'Feb', income: 234, expense: 105 },
    { label: 'Mar', income: 258, expense: 122 },
    { label: 'Apr', income: 198, expense: 130 },
    { label: 'May', income: 268, expense: 98 },
    { label: 'Jun', income: 242, expense: 113 },
  ];

  readonly transactions: RecentTxn[] = [
    { id: 1, date: '06 Jun', description: 'Tuition Fee — June', type: 'income', amount: 268000 },
    { id: 2, date: '04 Jun', description: 'Office Supplies', type: 'expense', amount: 4500 },
    { id: 3, date: '02 Jun', description: 'Maintenance & Repairs', type: 'expense', amount: 8000 },
    { id: 4, date: '01 Jun', description: 'Admission Fee — New Students', type: 'income', amount: 90000 },
    { id: 5, date: '28 May', description: 'Sports Event Cost', type: 'expense', amount: 15000 },
  ];

  iconFor(t: SummaryStat['icon']) {
    if (t === 'income') return this.faSackDollar;
    if (t === 'expense') return this.faMoneyBillTransfer;
    if (t === 'profit') return this.faChartLine;
    return this.faWallet;
  }
}
