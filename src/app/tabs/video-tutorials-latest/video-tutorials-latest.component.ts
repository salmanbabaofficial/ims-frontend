import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClock, faGraduationCap, faMagnifyingGlass, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';

interface Tutorial {
  id: number;
  title: string;
  category: string;
  duration: string;
  views: number;
  thumbColor: string;
  isNew: boolean;
  rating: number;
}

@Component({
  selector: 'app-video-tutorials-latest',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './video-tutorials-latest.component.html',
  styleUrl: './video-tutorials-latest.component.css',
})
export class VideoTutorialsLatestComponent {
  readonly faPlay = faPlay;
  readonly faClock = faClock;
  readonly faStar = faStar;
  readonly faSearch = faMagnifyingGlass;
  readonly faGrad = faGraduationCap;

  searchTerm = '';
  readonly activeCategory = signal<string>('all');

  readonly categories = ['all', 'Getting Started', 'Students', 'Fee Management', 'Examination', 'LMS', 'Reports', 'Settings'];

  readonly tutorials: Tutorial[] = [
    { id: 1, title: 'Getting Started with IMS', category: 'Getting Started', duration: '05:12', views: 1452, thumbColor: '#2563eb', isNew: true, rating: 4.8 },
    { id: 2, title: 'How to Add a New Student', category: 'Students', duration: '03:45', views: 982, thumbColor: '#16a34a', isNew: true, rating: 4.6 },
    { id: 3, title: 'Generate Fee Challan (Bulk)', category: 'Fee Management', duration: '04:30', views: 1230, thumbColor: '#f59e0b', isNew: false, rating: 4.9 },
    { id: 4, title: 'Mark Daily Attendance', category: 'Students', duration: '02:58', views: 880, thumbColor: '#06b6d4', isNew: false, rating: 4.5 },
    { id: 5, title: 'Create Exam Date Sheet', category: 'Examination', duration: '06:20', views: 645, thumbColor: '#8b5cf6', isNew: true, rating: 4.7 },
    { id: 6, title: 'Compile Exam Result', category: 'Examination', duration: '04:55', views: 712, thumbColor: '#ec4899', isNew: false, rating: 4.6 },
    { id: 7, title: 'Upload Assignment in LMS', category: 'LMS', duration: '03:10', views: 540, thumbColor: '#10b981', isNew: false, rating: 4.4 },
    { id: 8, title: 'Send General Message (SMS)', category: 'Settings', duration: '02:25', views: 421, thumbColor: '#ef4444', isNew: false, rating: 4.5 },
    { id: 9, title: 'Promote Students to Next Class', category: 'Students', duration: '04:10', views: 388, thumbColor: '#0891b2', isNew: true, rating: 4.7 },
    { id: 10, title: 'Generate Monthly Reports', category: 'Reports', duration: '05:48', views: 533, thumbColor: '#a16207', isNew: false, rating: 4.8 },
    { id: 11, title: 'Backup & Restore Database', category: 'Settings', duration: '03:32', views: 298, thumbColor: '#6d28d9', isNew: false, rating: 4.6 },
    { id: 12, title: 'Manage Users & Permissions', category: 'Settings', duration: '04:42', views: 411, thumbColor: '#be185d', isNew: true, rating: 4.7 },
  ];

  get filtered(): Tutorial[] {
    const cat = this.activeCategory();
    return this.tutorials.filter((t) => (cat === 'all' || t.category === cat) && t.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
