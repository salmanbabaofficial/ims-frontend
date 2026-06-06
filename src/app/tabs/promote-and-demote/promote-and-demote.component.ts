import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faCheck,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

interface PromoteRow {
  id: number;
  rollNo: string;
  name: string;
  initial: string;
  fromClass: string;
  fromSection: string;
  toClass: string;
  toSection: string;
  result: 'Pass' | 'Fail';
  action: 'promote' | 'detain' | 'demote';
  selected: boolean;
}

@Component({
  selector: 'app-promote-and-demote',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './promote-and-demote.component.html',
  styleUrl: './promote-and-demote.component.css',
})
export class PromoteAndDemoteComponent {
  readonly faArrowUp = faArrowUp;
  readonly faArrowDown = faArrowDown;
  readonly faCheck = faCheck;
  readonly faWarn = faTriangleExclamation;

  fromSession = '2025 - 2026';
  toSession = '2026 - 2027';
  selectedClass = 'Class 1';
  selectedSection = 'A';

  readonly sessionOptions = ['2024 - 2025', '2025 - 2026', '2026 - 2027'];
  readonly classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  readonly sectionOptions = ['A', 'B', 'C'];

  readonly rows = signal<PromoteRow[]>([
    { id: 1, rollNo: '01', name: 'Ali Hassan', initial: 'A', fromClass: 'Class 1', fromSection: 'A', toClass: 'Class 2', toSection: 'A', result: 'Pass', action: 'promote', selected: true },
    { id: 2, rollNo: '02', name: 'Fatima Noor', initial: 'F', fromClass: 'Class 1', fromSection: 'A', toClass: 'Class 2', toSection: 'A', result: 'Pass', action: 'promote', selected: true },
    { id: 3, rollNo: '03', name: 'Maryam Aslam', initial: 'M', fromClass: 'Class 1', fromSection: 'A', toClass: 'Class 2', toSection: 'A', result: 'Pass', action: 'promote', selected: true },
    { id: 4, rollNo: '04', name: 'Ahmad Raza', initial: 'A', fromClass: 'Class 1', fromSection: 'A', toClass: 'Class 1', toSection: 'A', result: 'Fail', action: 'detain', selected: true },
    { id: 5, rollNo: '05', name: 'Zainab Bibi', initial: 'Z', fromClass: 'Class 1', fromSection: 'A', toClass: 'Class 2', toSection: 'A', result: 'Pass', action: 'promote', selected: true },
  ]);

  toggleAll(checked: boolean): void {
    this.rows.update((list) => list.map((r) => ({ ...r, selected: checked })));
  }

  toggleOne(id: number, checked: boolean): void {
    this.rows.update((list) => list.map((r) => (r.id === id ? { ...r, selected: checked } : r)));
  }

  get selectedCount(): number {
    return this.rows().filter((r) => r.selected).length;
  }

  get promoteCount(): number {
    return this.rows().filter((r) => r.action === 'promote').length;
  }

  get detainCount(): number {
    return this.rows().filter((r) => r.action === 'detain').length;
  }
}
