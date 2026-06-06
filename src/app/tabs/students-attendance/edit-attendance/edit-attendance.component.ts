import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheck, faClock, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';

type AttendanceMark = 'present' | 'absent' | 'leave' | 'late';

interface EditAttendanceRow {
  id: number;
  rollNo: string;
  name: string;
  initial: string;
  fatherName: string;
  mark: AttendanceMark;
}

@Component({
  selector: 'app-edit-attendance',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './edit-attendance.component.html',
  styleUrl: './edit-attendance.component.css',
})
export class EditAttendanceComponent {
  readonly faCheck = faCheck;
  readonly faXmark = faXmark;
  readonly faClock = faClock;
  readonly faSave = faSave;

  selectedDate = '2026-06-05';
  selectedClass = 'Class 1';
  selectedSection = 'A';

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3'];
  readonly sectionOptions = ['A', 'B', 'C'];

  readonly rows = signal<EditAttendanceRow[]>([
    { id: 1, rollNo: '01', name: 'Ali Hassan', initial: 'A', fatherName: 'Hassan Khan', mark: 'present' },
    { id: 2, rollNo: '02', name: 'Fatima Noor', initial: 'F', fatherName: 'Noor Ahmed', mark: 'present' },
    { id: 3, rollNo: '03', name: 'Maryam Aslam', initial: 'M', fatherName: 'Aslam Pervaiz', mark: 'absent' },
    { id: 4, rollNo: '04', name: 'Ahmad Raza', initial: 'A', fatherName: 'Raza Hussain', mark: 'late' },
    { id: 5, rollNo: '05', name: 'Zainab Bibi', initial: 'Z', fatherName: 'Mohammad Ashraf', mark: 'leave' },
  ]);

  setMark(id: number, mark: AttendanceMark): void {
    this.rows.update((arr) => arr.map((s) => (s.id === id ? { ...s, mark } : s)));
  }
}
