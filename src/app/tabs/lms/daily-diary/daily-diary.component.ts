import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBookOpen, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

interface DiaryEntry {
  id: number;
  subject: string;
  homework: string;
  classwork: string;
  remarks: string;
}

@Component({
  selector: 'app-daily-diary',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './daily-diary.component.html',
  styleUrl: './daily-diary.component.css',
})
export class DailyDiaryComponent {
  readonly faPlus = faPlus;
  readonly faSave = faSave;
  readonly faTrash = faTrash;
  readonly faBookOpen = faBookOpen;

  diaryDate = '2026-06-06';
  selectedClass = 'Class 1';
  selectedSection = 'A';

  readonly classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  readonly sectionOptions = ['A', 'B', 'C'];
  readonly subjectOptions = ['English', 'Urdu', 'Mathematics', 'Science', 'Islamiat', 'Pak Studies'];

  readonly entries = signal<DiaryEntry[]>([
    { id: 1, subject: 'English', homework: 'Complete exercise 2.1 from grammar book.', classwork: 'Reading lesson 4 (The Honest Boy).', remarks: 'Bring notebooks tomorrow.' },
    { id: 2, subject: 'Mathematics', homework: 'Solve Q1-Q10 page 32.', classwork: 'Addition with carry over.', remarks: '' },
  ]);

  addRow(): void {
    const id = (this.entries().at(-1)?.id ?? 0) + 1;
    this.entries.update((list) => [
      ...list,
      { id, subject: '', homework: '', classwork: '', remarks: '' },
    ]);
  }

  removeRow(id: number): void {
    this.entries.update((list) => list.filter((r) => r.id !== id));
  }
}
