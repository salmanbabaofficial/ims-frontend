import { DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faPaperPlane, faPrint } from '@fortawesome/free-solid-svg-icons';

interface DiaryRecipient {
  id: number;
  name: string;
  initial: string;
  rollNo: string;
  className: string;
  parent: string;
  phone: string;
  selected: boolean;
}

@Component({
  selector: 'app-printsend-diary',
  imports: [FormsModule, FaIconComponent, DecimalPipe],
  templateUrl: './printsend-diary.component.html',
  styleUrl: './printsend-diary.component.css',
})
export class PrintsendDiaryComponent {
  readonly faPrint = faPrint;
  readonly faSend = faPaperPlane;
  readonly faEnvelope = faEnvelope;

  diaryDate = '2026-06-06';
  selectedClass = 'Class 1';
  selectedSection = 'A';
  channel: 'sms' | 'whatsapp' | 'email' = 'sms';

  readonly classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  readonly sectionOptions = ['A', 'B', 'C'];

  readonly recipients = signal<DiaryRecipient[]>([
    { id: 1, rollNo: '01', name: 'Ali Hassan', initial: 'A', className: 'Class 1 - A', parent: 'Hassan Ali', phone: '0300-1234567', selected: true },
    { id: 2, rollNo: '02', name: 'Fatima Noor', initial: 'F', className: 'Class 1 - A', parent: 'Noor Ahmad', phone: '0301-2345678', selected: true },
    { id: 3, rollNo: '03', name: 'Maryam Aslam', initial: 'M', className: 'Class 1 - A', parent: 'Aslam Pervaiz', phone: '0302-3456789', selected: true },
    { id: 4, rollNo: '04', name: 'Ahmad Raza', initial: 'A', className: 'Class 1 - A', parent: 'Raza Mohammad', phone: '0303-4567890', selected: false },
    { id: 5, rollNo: '05', name: 'Zainab Bibi', initial: 'Z', className: 'Class 1 - A', parent: 'Bibi Akhtar', phone: '0304-5678901', selected: true },
  ]);

  message = 'Assalam-o-Alaikum! Aaj ki diary aap ke account par bhej di gayi hai. Shukriya.';

  toggleAll(checked: boolean): void {
    this.recipients.update((list) => list.map((r) => ({ ...r, selected: checked })));
  }

  toggleOne(id: number, checked: boolean): void {
    this.recipients.update((list) => list.map((r) => (r.id === id ? { ...r, selected: checked } : r)));
  }

  get selectedCount(): number {
    return this.recipients().filter((r) => r.selected).length;
  }

  get totalCount(): number {
    return this.recipients().length;
  }
}
