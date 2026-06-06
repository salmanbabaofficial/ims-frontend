import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faDownload, faIdCard, faPrint } from '@fortawesome/free-solid-svg-icons';

interface StaffCard {
  id: number;
  staffId: string;
  name: string;
  initial: string;
  designation: string;
  department: string;
  phone: string;
  joiningDate: string;
}

@Component({
  selector: 'app-staff-cards',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './staff-cards.component.html',
  styleUrl: './staff-cards.component.css',
})
export class StaffCardsComponent {
  readonly faIdCard = faIdCard;
  readonly faPrint = faPrint;
  readonly faDownload = faDownload;

  selectedDepartment = 'all';

  readonly departments = ['Academic', 'Administration', 'Accounts', 'Library', 'Sports', 'Maintenance'];

  readonly cards: StaffCard[] = [
    { id: 1, staffId: 'STF-0001', name: 'Ayesha Khan', initial: 'A', designation: 'Principal', department: 'Administration', phone: '0300-1234567', joiningDate: '01 Jan 2020' },
    { id: 2, staffId: 'STF-0002', name: 'Bilal Ahmed', initial: 'B', designation: 'Vice Principal', department: 'Administration', phone: '0301-2345678', joiningDate: '15 Mar 2020' },
    { id: 3, staffId: 'STF-0003', name: 'Sara Iqbal', initial: 'S', designation: 'Senior Teacher', department: 'Academic', phone: '0302-3456789', joiningDate: '01 Aug 2021' },
    { id: 4, staffId: 'STF-0004', name: 'Hamza Raza', initial: 'H', designation: 'Accountant', department: 'Accounts', phone: '0303-4567890', joiningDate: '05 Feb 2022' },
    { id: 5, staffId: 'STF-0005', name: 'Maryam Tariq', initial: 'M', designation: 'Librarian', department: 'Library', phone: '0304-5678901', joiningDate: '20 May 2022' },
    { id: 6, staffId: 'STF-0006', name: 'Usman Saeed', initial: 'U', designation: 'PE Coach', department: 'Sports', phone: '0305-6789012', joiningDate: '11 Sep 2023' },
  ];
}
