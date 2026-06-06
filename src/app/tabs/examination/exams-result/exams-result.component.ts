import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFileExport, faPrint } from '@fortawesome/free-solid-svg-icons';

interface ResultRow {
  id: number;
  rollNo: string;
  name: string;
  initial: string;
  total: number;
  obtained: number;
  position: number;
  result: 'Pass' | 'Fail';
}

@Component({
  selector: 'app-exams-result',
  imports: [FormsModule, FaIconComponent, DecimalPipe],
  templateUrl: './exams-result.component.html',
  styleUrl: './exams-result.component.css',
})
export class ExamsResultComponent {
  readonly faPrint = faPrint;
  readonly faFileExport = faFileExport;

  selectedExam = 'First Term 2026';
  selectedClass = 'Class 1';

  readonly examOptions = ['First Term 2026', 'Second Term 2026'];
  readonly classOptions = ['Class 1', 'Class 2', 'Class 3'];

  readonly rows: ResultRow[] = [
    { id: 1, rollNo: '02', name: 'Fatima Noor', initial: 'F', total: 600, obtained: 552, position: 1, result: 'Pass' },
    { id: 2, rollNo: '01', name: 'Ali Hassan', initial: 'A', total: 600, obtained: 510, position: 2, result: 'Pass' },
    { id: 3, rollNo: '05', name: 'Zainab Bibi', initial: 'Z', total: 600, obtained: 450, position: 3, result: 'Pass' },
    { id: 4, rollNo: '03', name: 'Maryam Aslam', initial: 'M', total: 600, obtained: 408, position: 4, result: 'Pass' },
    { id: 5, rollNo: '04', name: 'Ahmad Raza', initial: 'A', total: 600, obtained: 220, position: 5, result: 'Fail' },
  ];

  percentage(r: ResultRow): number {
    return Math.round((r.obtained / r.total) * 1000) / 10;
  }

  grade(p: number): string {
    if (p >= 90) return 'A+';
    if (p >= 80) return 'A';
    if (p >= 70) return 'B';
    if (p >= 60) return 'C';
    if (p >= 50) return 'D';
    if (p >= 40) return 'E';
    return 'F';
  }
}
