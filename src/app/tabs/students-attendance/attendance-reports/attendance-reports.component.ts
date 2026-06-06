import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChartLine, faFileExport, faFilter, faPrint } from '@fortawesome/free-solid-svg-icons';

interface ReportRow {
  id: number;
  rollNo: string;
  name: string;
  initial: string;
  className: string;
  section: string;
  present: number;
  absent: number;
  leave: number;
  late: number;
  total: number;
}

@Component({
  selector: 'app-attendance-reports',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './attendance-reports.component.html',
  styleUrl: './attendance-reports.component.css',
})
export class AttendanceReportsComponent {
  readonly faFilter = faFilter;
  readonly faPrint = faPrint;
  readonly faFileExport = faFileExport;
  readonly faChartLine = faChartLine;

  startDate = '2026-06-01';
  endDate = '2026-06-06';
  selectedClass = '';
  selectedSection = '';

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3'];
  readonly sectionOptions = ['A', 'B', 'C'];

  readonly rows: ReportRow[] = [
    { id: 1, rollNo: '01', name: 'Ali Hassan', initial: 'A', className: 'Class 1', section: 'A', present: 22, absent: 1, leave: 1, late: 2, total: 26 },
    { id: 2, rollNo: '02', name: 'Fatima Noor', initial: 'F', className: 'Class 1', section: 'A', present: 24, absent: 0, leave: 1, late: 1, total: 26 },
    { id: 3, rollNo: '03', name: 'Maryam Aslam', initial: 'M', className: 'Class 1', section: 'A', present: 19, absent: 5, leave: 1, late: 1, total: 26 },
    { id: 4, rollNo: '04', name: 'Ahmad Raza', initial: 'A', className: 'Class 1', section: 'A', present: 23, absent: 1, leave: 0, late: 2, total: 26 },
    { id: 5, rollNo: '05', name: 'Zainab Bibi', initial: 'Z', className: 'Class 1', section: 'A', present: 20, absent: 2, leave: 3, late: 1, total: 26 },
  ];

  percent(row: ReportRow): number {
    return Math.round((row.present / row.total) * 100);
  }
}
