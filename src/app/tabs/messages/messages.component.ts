import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  faPaperPlane,
  faPaperclip,
  faPenToSquare,
  faStar,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

interface Thread {
  id: number;
  name: string;
  initial: string;
  role: string;
  preview: string;
  unread: number;
  time: string;
  starred: boolean;
}

interface ChatMessage {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
}

@Component({
  selector: 'app-messages',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  readonly faSearch = faMagnifyingGlass;
  readonly faSend = faPaperPlane;
  readonly faPaperclip = faPaperclip;
  readonly faStar = faStar;
  readonly faTrash = faTrash;
  readonly faPenToSquare = faPenToSquare;

  searchTerm = '';
  composeText = '';

  readonly threads: Thread[] = [
    { id: 1, name: 'Hassan Ali (Parent)', initial: 'H', role: 'Parent', preview: 'Walikum-Salam, ji bilkul, kal mai school aata hoon.', unread: 2, time: '10:42 AM', starred: true },
    { id: 2, name: 'Mr. Khalid (Math Teacher)', initial: 'K', role: 'Teacher', preview: 'Please check the new lesson plan attached.', unread: 0, time: 'Yesterday', starred: false },
    { id: 3, name: 'Ms. Ayesha (English Dept)', initial: 'A', role: 'Teacher', preview: 'Result entry due tomorrow.', unread: 1, time: 'Yesterday', starred: false },
    { id: 4, name: 'Bibi Akhtar (Parent)', initial: 'B', role: 'Parent', preview: 'Fee payment receipt forward kr dein.', unread: 0, time: 'Mon', starred: false },
    { id: 5, name: 'Admin Office', initial: 'AO', role: 'Admin', preview: 'Holiday notice published.', unread: 0, time: 'Sun', starred: true },
  ];

  selectedId = signal<number>(1);

  readonly messages: ChatMessage[] = [
    { id: 1, text: 'Assalam-o-Alaikum, kya aap kal school visit kr saktay hain?', time: '10:30 AM', isMine: true },
    { id: 2, text: 'Walikum-Salam, ji bilkul, kal mai school aata hoon.', time: '10:42 AM', isMine: false },
    { id: 3, text: 'Shukriya. 10 AM ka time theek hai?', time: '10:43 AM', isMine: true },
    { id: 4, text: 'Ji bilkul, 10 AM perfect hai.', time: '10:45 AM', isMine: false },
  ];

  select(id: number): void {
    this.selectedId.set(id);
  }

  get current(): Thread | undefined {
    return this.threads.find((t) => t.id === this.selectedId());
  }

  send(): void {
    if (!this.composeText.trim()) return;
    this.composeText = '';
  }
}
