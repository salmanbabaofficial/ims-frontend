import { DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface StudentMarks {
  id: number;
  rollNo: string;
  name: string;
  initial: string;
  marks: number | null;
  totalMarks: number;
}

@Component({
  selector: 'app-exams-marks',
  imports: [FormsModule, FaIconComponent, DecimalPipe],
  templateUrl: './exams-marks.component.html',
  styleUrl: './exams-marks.component.css',
})
export class ExamsMarksComponent {
  readonly faSave = faSave;

  selectedExam = '';
  selectedClass = '';
  selectedSubject = '';

  readonly examOptions = ['First Term 2026', 'Second Term 2026', 'Monthly Tests'];
  readonly classOptions = ['Class 1', 'Class 2', 'Class 3'];
  readonly subjectOptions = ['English', 'Urdu', 'Mathematics', 'Science', 'Islamiat'];

  readonly students = signal<StudentMarks[]>([
    { id: 1, rollNo: '01', name: 'Ali Hassan', initial: 'A', marks: 85, totalMarks: 100 },
    { id: 2, rollNo: '02', name: 'Fatima Noor', initial: 'F', marks: 92, totalMarks: 100 },
    { id: 3, rollNo: '03', name: 'Maryam Aslam', initial: 'M', marks: 68, totalMarks: 100 },
    { id: 4, rollNo: '04', name: 'Ahmad Raza', initial: 'A', marks: null, totalMarks: 100 },
    { id: 5, rollNo: '05', name: 'Zainab Bibi', initial: 'Z', marks: 75, totalMarks: 100 },
  ]);

  grade(m: number | null): string {
    if (m === null) return '—';
    if (m >= 90) return 'A+';
    if (m >= 80) return 'A';
    if (m >= 70) return 'B';
    if (m >= 60) return 'C';
    if (m >= 50) return 'D';
    if (m >= 40) return 'E';
    return 'F';
  }
}
