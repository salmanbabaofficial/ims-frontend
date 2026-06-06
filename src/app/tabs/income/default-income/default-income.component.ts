import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface DefaultIncomeRule {
  id: number;
  name: string;
  description: string;
  amount: number;
  frequency: 'monthly' | 'yearly' | 'quarterly';
  enabled: boolean;
}

@Component({
  selector: 'app-default-income',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './default-income.component.html',
  styleUrl: './default-income.component.css',
})
export class DefaultIncomeComponent {
  readonly faSave = faSave;

  readonly rules = signal<DefaultIncomeRule[]>([
    { id: 1, name: 'Tuition Fee Collection', description: 'Monthly fee collection from students.', amount: 285000, frequency: 'monthly', enabled: true },
    { id: 2, name: 'Admission Fees', description: 'New admission charges.', amount: 90000, frequency: 'monthly', enabled: true },
    { id: 3, name: 'Annual Examination Fee', description: 'Yearly board / annual exam fee.', amount: 120000, frequency: 'yearly', enabled: true },
    { id: 4, name: 'Stationery Sales', description: 'Quarterly average sale.', amount: 35000, frequency: 'quarterly', enabled: false },
  ]);

  toggle(id: number, val: boolean): void {
    this.rules.update((arr) => arr.map((r) => (r.id === id ? { ...r, enabled: val } : r)));
  }
}
