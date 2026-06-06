import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faPlay, faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

interface VideoItem {
  id: number;
  title: string;
  subject: string;
  className: string;
  duration: string;
  uploadedOn: string;
  views: number;
  thumbColor: string;
}

@Component({
  selector: 'app-videos',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export class VideosComponent {
  readonly faPlus = faPlus;
  readonly faPlay = faPlay;
  readonly faTrash = faTrash;
  readonly faEye = faEye;
  readonly faUpload = faUpload;

  showForm = signal(false);
  selectedClass = 'all';
  selectedSubject = 'all';

  newVideo = { title: '', subject: '', className: '', url: '' };

  readonly classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  readonly subjectOptions = ['English', 'Urdu', 'Mathematics', 'Science', 'Islamiat'];

  readonly videos: VideoItem[] = [
    { id: 1, title: 'Introduction to Tenses', subject: 'English', className: 'Class 5', duration: '12:34', uploadedOn: '02 Jun 2026', views: 145, thumbColor: '#6366f1' },
    { id: 2, title: 'Multiplication Tables', subject: 'Mathematics', className: 'Class 3', duration: '08:21', uploadedOn: '03 Jun 2026', views: 89, thumbColor: '#06b6d4' },
    { id: 3, title: 'Plants & Photosynthesis', subject: 'Science', className: 'Class 4', duration: '15:02', uploadedOn: '01 Jun 2026', views: 212, thumbColor: '#10b981' },
    { id: 4, title: 'Surah Al-Ikhlas Tafseer', subject: 'Islamiat', className: 'Class 2', duration: '06:48', uploadedOn: '30 May 2026', views: 178, thumbColor: '#f59e0b' },
    { id: 5, title: 'Story: Honest Boy', subject: 'Urdu', className: 'Class 1', duration: '04:55', uploadedOn: '28 May 2026', views: 65, thumbColor: '#ec4899' },
    { id: 6, title: 'Geometry Basics', subject: 'Mathematics', className: 'Class 5', duration: '11:30', uploadedOn: '25 May 2026', views: 102, thumbColor: '#8b5cf6' },
  ];
}
