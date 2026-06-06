import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface DefaultFineRule {
  id: number;
  name: string;
  description: string;
  amount: number;
  enabled: boolean;
}

@Component({
  selector: 'app-default-fines',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './default-fines.component.html',
  styleUrl: './default-fines.component.css',
})
export class DefaultFinesComponent {
  readonly faSave = faSave;

  readonly rules = signal<DefaultFineRule[]>([
    { id: 1, name: 'Late Fee Submission', description: 'Charged after fee due date.', amount: 100, enabled: true },
    { id: 2, name: 'Absence Fine', description: 'Charged for each unexcused absent day.', amount: 50, enabled: false },
    { id: 3, name: 'Late Arrival', description: 'Charged when student arrives after grace period.', amount: 25, enabled: true },
    { id: 4, name: 'Library Late Return', description: 'Per day fine on overdue books.', amount: 10, enabled: true },
  ]);

  toggle(id: number, val: boolean): void {
    this.rules.update((arr) => arr.map((r) => (r.id === id ? { ...r, enabled: val } : r)));
  }
}
