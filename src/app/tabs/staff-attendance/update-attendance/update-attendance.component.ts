import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheck, faClock, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';

type StaffMark = 'present' | 'absent' | 'leave' | 'late' | '';

interface StaffAttendanceRow {
  id: number;
  staffId: string;
  name: string;
  initial: string;
  designation: string;
  department: string;
  mark: StaffMark;
  checkIn: string;
}

@Component({
  selector: 'app-update-attendance',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './update-attendance.component.html',
  styleUrl: './update-attendance.component.css',
})
export class UpdateAttendanceComponent {
  readonly faCheck = faCheck;
  readonly faXmark = faXmark;
  readonly faClock = faClock;
  readonly faSave = faSave;

  selectedDate = '2026-06-06';
  selectedDepartment = '';

  readonly departments = ['Academic', 'Administration', 'Accounts', 'Library', 'Sports'];

  readonly rows = signal<StaffAttendanceRow[]>([
    { id: 1, staffId: 'STF-0001', name: 'Ayesha Khan', initial: 'A', designation: 'Principal', department: 'Administration', mark: 'present', checkIn: '08:05 AM' },
    { id: 2, staffId: 'STF-0002', name: 'Bilal Ahmed', initial: 'B', designation: 'Vice Principal', department: 'Administration', mark: 'present', checkIn: '08:12 AM' },
    { id: 3, staffId: 'STF-0003', name: 'Sara Iqbal', initial: 'S', designation: 'Senior Teacher', department: 'Academic', mark: 'late', checkIn: '08:35 AM' },
    { id: 4, staffId: 'STF-0004', name: 'Hamza Raza', initial: 'H', designation: 'Accountant', department: 'Accounts', mark: 'present', checkIn: '08:02 AM' },
    { id: 5, staffId: 'STF-0005', name: 'Maryam Tariq', initial: 'M', designation: 'Librarian', department: 'Library', mark: 'leave', checkIn: '—' },
    { id: 6, staffId: 'STF-0006', name: 'Usman Saeed', initial: 'U', designation: 'PE Coach', department: 'Sports', mark: 'absent', checkIn: '—' },
  ]);

  setMark(id: number, mark: StaffMark): void {
    this.rows.update((arr) => arr.map((s) => (s.id === id ? { ...s, mark } : s)));
  }

  markAll(mark: StaffMark): void {
    this.rows.update((arr) => arr.map((s) => ({ ...s, mark })));
  }

  count(mark: StaffMark): number {
    return this.rows().filter((r) => r.mark === mark).length;
  }
}
