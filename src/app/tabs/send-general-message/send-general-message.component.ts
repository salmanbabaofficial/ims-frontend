import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBell, faComment, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface AudienceGroup {
  id: string;
  label: string;
  count: number;
  selected: boolean;
}

@Component({
  selector: 'app-send-general-message',
  imports: [FormsModule, FaIconComponent, DecimalPipe],
  templateUrl: './send-general-message.component.html',
  styleUrl: './send-general-message.component.css',
})
export class SendGeneralMessageComponent {
  readonly faSend = faPaperPlane;
  readonly faSms = faComment;
  readonly faWhatsapp = faWhatsapp;
  readonly faEmail = faEnvelope;
  readonly faBell = faBell;

  channel: 'sms' | 'whatsapp' | 'email' | 'push' = 'sms';
  title = '';
  message = 'Assalam-o-Alaikum! ';
  scheduleEnabled = false;
  scheduleAt = '';

  audiences: AudienceGroup[] = [
    { id: 'all-parents', label: 'All Parents', count: 542, selected: true },
    { id: 'all-students', label: 'All Students', count: 612, selected: false },
    { id: 'all-staff', label: 'All Staff', count: 48, selected: false },
    { id: 'admin', label: 'Admin Users', count: 4, selected: false },
    { id: 'class-1', label: 'Class 1 Parents', count: 65, selected: false },
    { id: 'class-2', label: 'Class 2 Parents', count: 58, selected: false },
    { id: 'class-3', label: 'Class 3 Parents', count: 61, selected: false },
    { id: 'class-4', label: 'Class 4 Parents', count: 55, selected: false },
    { id: 'class-5', label: 'Class 5 Parents', count: 49, selected: false },
    { id: 'defaulters', label: 'Fee Defaulters', count: 23, selected: false },
  ];

  toggle(a: AudienceGroup): void {
    a.selected = !a.selected;
  }

  get totalRecipients(): number {
    return this.audiences.filter((a) => a.selected).reduce((s, a) => s + a.count, 0);
  }
}
