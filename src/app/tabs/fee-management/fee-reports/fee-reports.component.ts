import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChartLine, faFileExport, faPrint } from '@fortawesome/free-solid-svg-icons';

interface BarPoint {
  label: string;
  value: number;
}

interface ReportRow {
  id: number;
  month: string;
  challansIssued: number;
  collected: number;
  pending: number;
  defaulters: number;
}

@Component({
  selector: 'app-fee-reports',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './fee-reports.component.html',
  styleUrl: './fee-reports.component.css',
})
export class FeeReportsComponent {
  readonly faPrint = faPrint;
  readonly faFileExport = faFileExport;
  readonly faChartLine = faChartLine;

  startDate = '2026-01-01';
  endDate = '2026-06-30';
  selectedClass = 'all';

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  readonly monthly: BarPoint[] = [
    { label: 'Jan', value: 70 },
    { label: 'Feb', value: 78 },
    { label: 'Mar', value: 82 },
    { label: 'Apr', value: 65 },
    { label: 'May', value: 88 },
    { label: 'Jun', value: 92 },
  ];

  readonly rows: ReportRow[] = [
    { id: 1, month: 'January 2026', challansIssued: 312, collected: 218400, pending: 65400, defaulters: 22 },
    { id: 2, month: 'February 2026', challansIssued: 312, collected: 234600, pending: 49200, defaulters: 18 },
    { id: 3, month: 'March 2026', challansIssued: 312, collected: 256800, pending: 28200, defaulters: 12 },
    { id: 4, month: 'April 2026', challansIssued: 312, collected: 198400, pending: 89600, defaulters: 30 },
    { id: 5, month: 'May 2026', challansIssued: 312, collected: 274800, pending: 11200, defaulters: 8 },
    { id: 6, month: 'June 2026', challansIssued: 312, collected: 288800, pending: 4200, defaulters: 4 },
  ];

  get totalCollected(): number {
    return this.rows.reduce((sum, r) => sum + r.collected, 0);
  }
  get totalPending(): number {
    return this.rows.reduce((sum, r) => sum + r.pending, 0);
  }
}
