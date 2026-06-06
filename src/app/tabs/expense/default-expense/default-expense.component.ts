import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface DefaultExpenseRule {
  id: number;
  name: string;
  description: string;
  amount: number;
  frequency: 'monthly' | 'yearly' | 'quarterly';
  enabled: boolean;
}

@Component({
  selector: 'app-default-expense',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './default-expense.component.html',
  styleUrl: './default-expense.component.css',
})
export class DefaultExpenseComponent {
  readonly faSave = faSave;

  readonly rules = signal<DefaultExpenseRule[]>([
    { id: 1, name: 'Electricity Bill', description: 'Monthly electricity charges.', amount: 35000, frequency: 'monthly', enabled: true },
    { id: 2, name: 'Water Bill', description: 'Monthly water supply charges.', amount: 4500, frequency: 'monthly', enabled: true },
    { id: 3, name: 'Internet Charges', description: 'Office and Wi-Fi internet.', amount: 8000, frequency: 'monthly', enabled: true },
    { id: 4, name: 'Annual Audit Fee', description: 'External auditor charges.', amount: 25000, frequency: 'yearly', enabled: false },
  ]);

  toggle(id: number, val: boolean): void {
    this.rules.update((arr) => arr.map((r) => (r.id === id ? { ...r, enabled: val } : r)));
  }
}
