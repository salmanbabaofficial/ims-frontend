import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheck, faClock, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';

type AttendanceMark = 'present' | 'absent' | 'leave' | 'late' | '';

interface AttendanceStudent {
  id: number;
  rollNo: string;
  name: string;
  initial: string;
  fatherName: string;
  mark: AttendanceMark;
}

@Component({
  selector: 'app-mark-attendance',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.css',
})
export class MarkAttendanceComponent {
  readonly faCheck = faCheck;
  readonly faXmark = faXmark;
  readonly faClock = faClock;
  readonly faSave = faSave;

  selectedClass = '';
  selectedSection = '';
  selectedDate = '2026-06-06';

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3'];
  readonly sectionOptions = ['A', 'B', 'C'];

  readonly students = signal<AttendanceStudent[]>([
    { id: 1, rollNo: '01', name: 'Ali Hassan', initial: 'A', fatherName: 'Hassan Khan', mark: 'present' },
    { id: 2, rollNo: '02', name: 'Fatima Noor', initial: 'F', fatherName: 'Noor Ahmed', mark: 'present' },
    { id: 3, rollNo: '03', name: 'Maryam Aslam', initial: 'M', fatherName: 'Aslam Pervaiz', mark: 'absent' },
    { id: 4, rollNo: '04', name: 'Ahmad Raza', initial: 'A', fatherName: 'Raza Hussain', mark: 'present' },
    { id: 5, rollNo: '05', name: 'Zainab Bibi', initial: 'Z', fatherName: 'Mohammad Ashraf', mark: 'leave' },
    { id: 6, rollNo: '06', name: 'Hamza Iqbal', initial: 'H', fatherName: 'Iqbal Hussain', mark: 'late' },
  ]);

  setMark(id: number, mark: AttendanceMark): void {
    this.students.update((arr) => arr.map((s) => (s.id === id ? { ...s, mark } : s)));
  }

  markAll(mark: AttendanceMark): void {
    this.students.update((arr) => arr.map((s) => ({ ...s, mark })));
  }

  count(mark: AttendanceMark): number {
    return this.students().filter((s) => s.mark === mark).length;
  }
}
