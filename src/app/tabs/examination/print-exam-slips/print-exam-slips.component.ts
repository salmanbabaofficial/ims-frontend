import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faDownload, faPrint } from '@fortawesome/free-solid-svg-icons';

interface Slip {
  id: number;
  admissionNo: string;
  name: string;
  initial: string;
  rollNo: string;
  className: string;
  section: string;
}

@Component({
  selector: 'app-print-exam-slips',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './print-exam-slips.component.html',
  styleUrl: './print-exam-slips.component.css',
})
export class PrintExamSlipsComponent {
  readonly faPrint = faPrint;
  readonly faDownload = faDownload;

  selectedExam = 'First Term 2026';
  selectedClass = 'Class 1';
  readonly examOptions = ['First Term 2026', 'Second Term 2026'];
  readonly classOptions = ['Class 1', 'Class 2', 'Class 3'];

  readonly slips: Slip[] = [
    { id: 1, admissionNo: 'ADM-0001', name: 'Ali Hassan', initial: 'A', rollNo: '01', className: 'Class 1', section: 'A' },
    { id: 2, admissionNo: 'ADM-0002', name: 'Fatima Noor', initial: 'F', rollNo: '02', className: 'Class 1', section: 'A' },
    { id: 3, admissionNo: 'ADM-0003', name: 'Maryam Aslam', initial: 'M', rollNo: '03', className: 'Class 1', section: 'A' },
    { id: 4, admissionNo: 'ADM-0004', name: 'Ahmad Raza', initial: 'A', rollNo: '04', className: 'Class 1', section: 'A' },
  ];
}
