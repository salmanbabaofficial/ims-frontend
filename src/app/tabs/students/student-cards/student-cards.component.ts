import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faDownload, faPrint } from '@fortawesome/free-solid-svg-icons';

interface StudentCard {
  id: number;
  admissionNo: string;
  name: string;
  initial: string;
  className: string;
  section: string;
  fatherName: string;
  phone: string;
  validTill: string;
}

@Component({
  selector: 'app-student-cards',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './student-cards.component.html',
  styleUrl: './student-cards.component.css',
})
export class StudentCardsComponent {
  readonly faPrint = faPrint;
  readonly faDownload = faDownload;

  selectedClass = 'all';
  selectedSection = 'all';

  readonly classOptions = ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  readonly sectionOptions = ['A', 'B', 'C'];

  readonly cards: StudentCard[] = [
    { id: 1, admissionNo: 'ADM-0001', name: 'Ali Hassan', initial: 'A', className: 'Class 1', section: 'A', fatherName: 'Hassan Khan', phone: '0300-1111111', validTill: '31 Mar 2026' },
    { id: 2, admissionNo: 'ADM-0002', name: 'Fatima Noor', initial: 'F', className: 'Class 1', section: 'A', fatherName: 'Noor Ahmed', phone: '0301-2222222', validTill: '31 Mar 2026' },
    { id: 3, admissionNo: 'ADM-0003', name: 'Ahmad Raza', initial: 'A', className: 'Class 2', section: 'B', fatherName: 'Raza Hussain', phone: '0302-3333333', validTill: '31 Mar 2026' },
    { id: 4, admissionNo: 'ADM-0004', name: 'Zainab Bibi', initial: 'Z', className: 'Class 5', section: 'A', fatherName: 'Mohammad Ashraf', phone: '0303-4444444', validTill: '31 Mar 2026' },
    { id: 5, admissionNo: 'ADM-0005', name: 'Hamza Iqbal', initial: 'H', className: 'Class 9', section: 'B', fatherName: 'Iqbal Hussain', phone: '0304-5555555', validTill: '31 Mar 2026' },
    { id: 6, admissionNo: 'ADM-0006', name: 'Maryam Aslam', initial: 'M', className: 'Class 3', section: 'A', fatherName: 'Aslam Pervaiz', phone: '0305-6666666', validTill: '31 Mar 2026' },
  ];
}
