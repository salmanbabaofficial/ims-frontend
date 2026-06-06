import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface SmsRecipient {
  id: number;
  rollNo: string;
  name: string;
  initial: string;
  parentName: string;
  phone: string;
  status: 'absent' | 'late' | 'leave';
  selected: boolean;
}

@Component({
  selector: 'app-send-attendance-sms',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './send-attendance-sms.component.html',
  styleUrl: './send-attendance-sms.component.css',
})
export class SendAttendanceSmsComponent {
  readonly faPaperPlane = faPaperPlane;

  selectedDate = '2026-06-06';
  selectedClass = '';
  selectedSection = '';
  filterStatus = 'absent';
  messageTemplate =
    'Dear Parent, your child {{name}} was marked {{status}} on {{date}}. Regards, Institute.';

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3'];
  readonly sectionOptions = ['A', 'B', 'C'];

  readonly recipients = signal<SmsRecipient[]>([
    { id: 1, rollNo: '03', name: 'Maryam Aslam', initial: 'M', parentName: 'Aslam Pervaiz', phone: '0305-6666666', status: 'absent', selected: true },
    { id: 2, rollNo: '06', name: 'Bilal Sheikh', initial: 'B', parentName: 'Sheikh Asif', phone: '0302-3333333', status: 'absent', selected: true },
    { id: 3, rollNo: '04', name: 'Ahmad Raza', initial: 'A', parentName: 'Raza Hussain', phone: '0302-3333333', status: 'late', selected: false },
    { id: 4, rollNo: '05', name: 'Zainab Bibi', initial: 'Z', parentName: 'Mohammad Ashraf', phone: '0303-4444444', status: 'leave', selected: false },
  ]);

  toggleAll(value: boolean): void {
    this.recipients.update((list) => list.map((r) => ({ ...r, selected: value })));
  }

  toggleOne(id: number, value: boolean): void {
    this.recipients.update((list) => list.map((r) => (r.id === id ? { ...r, selected: value } : r)));
  }

  selectedCount(): number {
    return this.recipients().filter((r) => r.selected).length;
  }
}
