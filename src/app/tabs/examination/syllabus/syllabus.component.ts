import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBook, faDownload, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

interface SyllabusItem {
  id: number;
  className: string;
  subject: string;
  description: string;
  fileName: string;
  uploadedOn: string;
}

@Component({
  selector: 'app-syllabus',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './syllabus.component.html',
  styleUrl: './syllabus.component.css',
})
export class SyllabusComponent {
  readonly faPlus = faPlus;
  readonly faDownload = faDownload;
  readonly faUpload = faUpload;
  readonly faBook = faBook;

  showForm = signal(false);
  selectedClass = 'all';

  newSyllabus = { className: '', subject: '', description: '' };

  readonly classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  readonly subjectOptions = ['English', 'Urdu', 'Mathematics', 'Science'];

  readonly items: SyllabusItem[] = [
    { id: 1, className: 'Class 1', subject: 'English', description: 'Chapters 1-10, grammar basics.', fileName: 'english-c1.pdf', uploadedOn: '01 Jun 2026' },
    { id: 2, className: 'Class 1', subject: 'Mathematics', description: 'Numbers 1-100, addition, subtraction.', fileName: 'math-c1.pdf', uploadedOn: '01 Jun 2026' },
    { id: 3, className: 'Class 2', subject: 'Science', description: 'Living things, plants & animals.', fileName: 'science-c2.pdf', uploadedOn: '02 Jun 2026' },
    { id: 4, className: 'Class 3', subject: 'Urdu', description: 'Sabaq 1-15, qawaid e Urdu.', fileName: 'urdu-c3.pdf', uploadedOn: '03 Jun 2026' },
  ];
}
