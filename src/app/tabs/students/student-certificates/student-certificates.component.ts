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

interface StudentEntry {
  id: number;
  name: string;
  initial: string;
  className: string;
  section: string;
  admissionNo: string;
}

@Component({
  selector: 'app-student-certificates',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './student-certificates.component.html',
  styleUrl: './student-certificates.component.css',
})
export class StudentCertificatesComponent {
  readonly faAward = faAward;
  readonly faEye = faEye;
  readonly faPrint = faPrint;
  readonly faDownload = faDownload;

  selectedTemplate = 1;
  selectedClass = 'all';

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3'];

  readonly templates: CertificateTemplate[] = [
    { id: 1, title: 'Character Certificate', description: 'Issued to certify good character of the student.', color: '#ef7c2a' },
    { id: 2, title: 'Leaving Certificate', description: 'Issued when a student leaves the institute.', color: '#5b8def' },
    { id: 3, title: 'Bonafide Certificate', description: 'Verifies bonafide enrollment of the student.', color: '#22c55e' },
    { id: 4, title: 'Merit Certificate', description: 'Awarded for outstanding academic merit.', color: '#a855f7' },
    { id: 5, title: 'Participation Certificate', description: 'For participation in events and activities.', color: '#06b6d4' },
  ];

  readonly students: StudentEntry[] = [
    { id: 1, name: 'Ali Hassan', initial: 'A', className: 'Class 1', section: 'A', admissionNo: 'ADM-0001' },
    { id: 2, name: 'Fatima Noor', initial: 'F', className: 'Class 1', section: 'A', admissionNo: 'ADM-0002' },
    { id: 3, name: 'Ahmad Raza', initial: 'A', className: 'Class 2', section: 'B', admissionNo: 'ADM-0003' },
    { id: 4, name: 'Zainab Bibi', initial: 'Z', className: 'Class 5', section: 'A', admissionNo: 'ADM-0004' },
  ];
}
