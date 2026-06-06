import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPrint, faShare } from '@fortawesome/free-solid-svg-icons';

interface DateSheetRow {
  id: number;
  date: string;
  day: string;
  subject: string;
  time: string;
  duration: string;
  room: string;
}

@Component({
  selector: 'app-date-sheet',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './date-sheet.component.html',
  styleUrl: './date-sheet.component.css',
})
export class DateSheetComponent {
  readonly faPrint = faPrint;
  readonly faShare = faShare;

  selectedExam = 'First Term — Class 1';

  readonly examOptions = ['First Term — Class 1', 'First Term — Class 2', 'May Test — Class 5'];

  readonly rows: DateSheetRow[] = [
    { id: 1, date: '10 Jun 2026', day: 'Tuesday', subject: 'English', time: '09:00 AM', duration: '2 hrs', room: 'Room 101' },
    { id: 2, date: '12 Jun 2026', day: 'Thursday', subject: 'Urdu', time: '09:00 AM', duration: '2 hrs', room: 'Room 101' },
    { id: 3, date: '14 Jun 2026', day: 'Saturday', subject: 'Mathematics', time: '09:00 AM', duration: '3 hrs', room: 'Room 102' },
    { id: 4, date: '16 Jun 2026', day: 'Monday', subject: 'Science', time: '09:00 AM', duration: '2.5 hrs', room: 'Room 102' },
    { id: 5, date: '18 Jun 2026', day: 'Wednesday', subject: 'Islamiat', time: '09:00 AM', duration: '1.5 hrs', room: 'Room 101' },
    { id: 6, date: '20 Jun 2026', day: 'Friday', subject: 'Art & Craft', time: '09:00 AM', duration: '1.5 hrs', room: 'Hall A' },
  ];
}
