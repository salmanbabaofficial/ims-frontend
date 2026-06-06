import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

type RuleKind = 'fixed' | 'percent';

interface DeductionRule {
  id: number;
  name: string;
  description: string;
  kind: RuleKind;
  value: number;
  enabled: boolean;
}

@Component({
  selector: 'app-deduction-rules',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './deduction-rules.component.html',
  styleUrl: './deduction-rules.component.css',
})
export class DeductionRulesComponent {
  readonly faSave = faSave;

  readonly rules = signal<DeductionRule[]>([
    { id: 1, name: 'Income Tax', description: 'Federal income tax deduction.', kind: 'percent', value: 5, enabled: true },
    { id: 2, name: 'EOBI', description: 'Employee Old-age Benefits Institute.', kind: 'fixed', value: 370, enabled: true },
    { id: 3, name: 'Provident Fund', description: '5% of basic salary.', kind: 'percent', value: 5, enabled: true },
    { id: 4, name: 'Absent Deduction', description: 'Per day absent salary cut.', kind: 'fixed', value: 500, enabled: true },
    { id: 5, name: 'Late Mark Deduction', description: '3 lates = 1 absent.', kind: 'fixed', value: 167, enabled: false },
  ]);

  toggle(id: number, val: boolean): void {
    this.rules.update((arr) => arr.map((r) => (r.id === id ? { ...r, enabled: val } : r)));
  }
}
