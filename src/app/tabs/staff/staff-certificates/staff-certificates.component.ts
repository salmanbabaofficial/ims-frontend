import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faAward, faDownload, faEye, faPrint } from '@fortawesome/free-solid-svg-icons';

interface CertificateTemplate {
  id: number;
  title: string;
  description: string;
  color: string;
}

interface StaffEntry {
  id: number;
  name: string;
  initial: string;
  designation: string;
  staffId: string;
}

@Component({
  selector: 'app-staff-certificates',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './staff-certificates.component.html',
  styleUrl: './staff-certificates.component.css',
})
export class StaffCertificatesComponent {
  readonly faAward = faAward;
  readonly faEye = faEye;
  readonly faPrint = faPrint;
  readonly faDownload = faDownload;

  selectedTemplate = 1;
  selectedStaff = 'all';

  readonly templates: CertificateTemplate[] = [
    { id: 1, title: 'Experience Certificate', description: 'Official certificate confirming staff experience.', color: '#ef7c2a' },
    { id: 2, title: 'Appreciation Award', description: 'Award for outstanding performance and dedication.', color: '#5b8def' },
    { id: 3, title: 'Service Certificate', description: 'Certificate of years of service to the institute.', color: '#22c55e' },
    { id: 4, title: 'Training Completion', description: 'Issued on completion of training programs.', color: '#a855f7' },
  ];

  readonly staff: StaffEntry[] = [
    { id: 1, name: 'Ayesha Khan', initial: 'A', designation: 'Principal', staffId: 'STF-0001' },
    { id: 2, name: 'Bilal Ahmed', initial: 'B', designation: 'Vice Principal', staffId: 'STF-0002' },
    { id: 3, name: 'Sara Iqbal', initial: 'S', designation: 'Senior Teacher', staffId: 'STF-0003' },
    { id: 4, name: 'Hamza Raza', initial: 'H', designation: 'Accountant', staffId: 'STF-0004' },
  ];
}
