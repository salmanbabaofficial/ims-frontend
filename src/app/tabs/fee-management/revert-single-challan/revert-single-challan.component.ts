import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

interface MatchedChallan {
  id: number;
  challanNo: string;
  studentName: string;
  className: string;
  amount: number;
  paidDate: string;
  status: 'paid' | 'partial' | 'unpaid';
}

@Component({
  selector: 'app-revert-single-challan',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './revert-single-challan.component.html',
  styleUrl: './revert-single-challan.component.css',
})
export class RevertSingleChallanComponent {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faRotateLeft = faRotateLeft;

  challanSearch = 'CH-1002';
  revertReason = '';

  readonly matched: MatchedChallan | null = {
    id: 1,
    challanNo: 'CH-1002',
    studentName: 'Ali Hassan',
    className: 'Class 1 - A',
    amount: 5000,
    paidDate: '05 Jun 2026',
    status: 'paid',
  };
}
