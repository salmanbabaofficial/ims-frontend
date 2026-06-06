import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faAngleRight,
  faChevronDown,
  faBorderAll,
  faBookOpen,
  faCalendarDays,
  faChartLine,
  faClipboardUser,
  faEnvelope,
  faFileInvoiceDollar,
  faGears,
  faLayerGroup,
  faMoneyBillWave,
  faPaperPlane,
  faPenToSquare,
  faReceipt,
  faRightLeft,
  faScaleBalanced,
  faUserClock,
  faUserGraduate,
  faUserShield,
  faUsers,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { SidebarTabs } from './interfaces/sidebar.interface';

const childIcon = faAngleRight;

@Component({
  selector: 'app-sidebar',
  imports: [FaIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  faChevronDown = faChevronDown;

  private readonly route = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly openBranchId = signal<number | null>(null);

  sidebarTabs: SidebarTabs[] = [
    { id: 1, icon: faBorderAll, name: 'Dashboard', route: '/dashboard' },
    { id: 2, icon: faVideo, name: 'Video Tutorials', route: '/video-tutorials-latest' },
    {
      id: 3,
      icon: faUserGraduate,
      name: 'Students',
      route: '/students',
      children: [
        { id: 301, icon: childIcon, name: 'Active Students', route: '/students/active-students' },
        { id: 302, icon: childIcon, name: 'Admission Form', route: '/students/admission-form' },
        { id: 303, icon: childIcon, name: 'Admission Inquiry', route: '/students/admission-inquiry' },
        { id: 304, icon: childIcon, name: 'New Admission', route: '/students/new-admission' },
        { id: 305, icon: childIcon, name: 'Student Cards', route: '/students/student-cards' },
        { id: 306, icon: childIcon, name: 'Student Certificates', route: '/students/student-certificates' },
        { id: 307, icon: childIcon, name: 'Withdrawal Students', route: '/students/withdrawal-students' },
      ],
    },
    {
      id: 4,
      icon: faClipboardUser,
      name: 'Students Attendance',
      route: '/students-attendance',
      children: [
        { id: 401, icon: childIcon, name: 'Attendance Reports', route: '/students-attendance/attendance-reports' },
        { id: 402, icon: childIcon, name: 'Edit Attendance', route: '/students-attendance/edit-attendance' },
        { id: 403, icon: childIcon, name: 'Mark Attendance', route: '/students-attendance/mark-attendance' },
        { id: 404, icon: childIcon, name: 'Send Attendance SMS', route: '/students-attendance/send-attendance-sms' },
      ],
    },
    {
      id: 5,
      icon: faMoneyBillWave,
      name: 'Fee Management',
      route: '/fee-management',
      children: [
        { id: 501, icon: childIcon, name: 'Collect Fee (Family)', route: '/fee-management/collect-fee-family-wise' },
        { id: 502, icon: childIcon, name: 'Collect Fee (Student)', route: '/fee-management/collect-fee-student-wise' },
        { id: 503, icon: childIcon, name: 'Create Bulk Challans', route: '/fee-management/create-bulk-challans' },
        { id: 504, icon: childIcon, name: 'Create Single Challan', route: '/fee-management/create-single-challan' },
        { id: 505, icon: childIcon, name: 'Fee Arrears', route: '/fee-management/fee-arrears' },
        { id: 506, icon: childIcon, name: 'Fee Defaulters', route: '/fee-management/fee-defaulters' },
        { id: 507, icon: childIcon, name: 'Fee Reports', route: '/fee-management/fee-reports' },
        { id: 508, icon: childIcon, name: 'Fee Types', route: '/fee-management/fee-types' },
        { id: 509, icon: childIcon, name: 'Revert Bulk Challans', route: '/fee-management/revert-bulk-challans' },
        { id: 510, icon: childIcon, name: 'Revert Single Challan', route: '/fee-management/revert-single-challan' },
      ],
    },
    {
      id: 6,
      icon: faScaleBalanced,
      name: 'Fines',
      route: '/fines-management',
      children: [
        { id: 601, icon: childIcon, name: 'Custom Fines', route: '/fines-management/custom-fines' },
        { id: 602, icon: childIcon, name: 'Custom Fine Types', route: '/fines-management/custom-fine-types' },
        { id: 603, icon: childIcon, name: 'Default Fines', route: '/fines-management/default-fines' },
      ],
    },
    {
      id: 7,
      icon: faReceipt,
      name: 'Expense',
      route: '/expense',
      children: [
        { id: 701, icon: childIcon, name: 'Custom Expense', route: '/expense/custom-expense' },
        { id: 702, icon: childIcon, name: 'Custom Expense Types', route: '/expense/custom-expense-types' },
        { id: 703, icon: childIcon, name: 'Default Expense', route: '/expense/default-expense' },
      ],
    },
    {
      id: 8,
      icon: faChartLine,
      name: 'Income',
      route: '/income',
      children: [
        { id: 801, icon: childIcon, name: 'Balance Summary', route: '/income/balance-summary' },
        { id: 802, icon: childIcon, name: 'Custom Income', route: '/income/custom-income' },
        { id: 803, icon: childIcon, name: 'Custom Income Types', route: '/income/custom-income-types' },
        { id: 804, icon: childIcon, name: 'Default Income', route: '/income/default-income' },
      ],
    },
    {
      id: 9,
      icon: faUsers,
      name: 'Staff',
      route: '/staff',
      children: [
        { id: 901, icon: childIcon, name: 'Staff Cards', route: '/staff/staff-cards' },
        { id: 902, icon: childIcon, name: 'Staff Certificates', route: '/staff/staff-certificates' },
        { id: 903, icon: childIcon, name: 'Staff List', route: '/staff/staff-list' },
      ],
    },
    { id: 10, icon: faUserClock, name: 'Staff Attendance', route: '/staff-attendance' },
    {
      id: 11,
      icon: faFileInvoiceDollar,
      name: 'Staff Payroll',
      route: '/staff-payroll',
      children: [
        { id: 1101, icon: childIcon, name: 'Advance Salary', route: '/staff-payroll/advance-salary' },
        { id: 1102, icon: childIcon, name: 'Custom Deduction', route: '/staff-payroll/custom-deduction' },
        { id: 1103, icon: childIcon, name: 'Deduction Rules', route: '/staff-payroll/deduction-rules' },
        { id: 1104, icon: childIcon, name: 'Payroll List', route: '/staff-payroll/payroll-list' },
        { id: 1105, icon: childIcon, name: 'Roll Back Payroll', route: '/staff-payroll/roll-back-payroll' },
        { id: 1106, icon: childIcon, name: 'Staff Allowances', route: '/staff-payroll/staff-allowances' },
      ],
    },
    {
      id: 12,
      icon: faPenToSquare,
      name: 'Examination',
      route: '/examination',
      children: [
        { id: 1201, icon: childIcon, name: 'Add Subjects', route: '/examination/add-subjects' },
        { id: 1202, icon: childIcon, name: 'Date Sheet', route: '/examination/date-sheet' },
        { id: 1203, icon: childIcon, name: 'Exams Groups', route: '/examination/exams-groups' },
        { id: 1204, icon: childIcon, name: 'Exams List', route: '/examination/exams-list' },
        { id: 1205, icon: childIcon, name: 'Exams Marks', route: '/examination/exams-marks' },
        { id: 1206, icon: childIcon, name: 'Exams Result', route: '/examination/exams-result' },
        { id: 1207, icon: childIcon, name: 'Print Exam Slips', route: '/examination/print-exam-slips' },
        { id: 1208, icon: childIcon, name: 'Syllabus', route: '/examination/syllabus' },
      ],
    },
    {
      id: 13,
      icon: faLayerGroup,
      name: 'Classes & Sections',
      route: '/classes-and-sections',
      children: [
        { id: 1301, icon: childIcon, name: 'Classes', route: '/classes-and-sections/classes' },
        { id: 1302, icon: childIcon, name: 'Sections', route: '/classes-and-sections/sections' },
      ],
    },
    {
      id: 14,
      icon: faBookOpen,
      name: 'LMS',
      route: '/lms',
      children: [
        { id: 1401, icon: childIcon, name: 'Assignments', route: '/lms/assignments' },
        { id: 1402, icon: childIcon, name: 'Daily Diary', route: '/lms/daily-diary' },
        { id: 1403, icon: childIcon, name: 'Print / Send Diary', route: '/lms/printsend-diary' },
        { id: 1404, icon: childIcon, name: 'Videos', route: '/lms/videos' },
      ],
    },
    { id: 15, icon: faEnvelope, name: 'Messages', route: '/messages' },
    { id: 16, icon: faPaperPlane, name: 'Send General Message', route: '/send-general-message' },
    { id: 17, icon: faRightLeft, name: 'Promote & Demote', route: '/promote-and-demote' },
    { id: 18, icon: faCalendarDays, name: 'Sessions', route: '/sessions' },
    { id: 19, icon: faUserShield, name: 'Users & Rights', route: '/users-and-rights' },
    { id: 20, icon: faGears, name: 'Settings', route: '/settings' },
  ];

  readonly sidebarNavPinned: SidebarTabs[] = this.sidebarTabs.slice(0, 2);

  readonly sidebarNavScrollable: SidebarTabs[] = this.sidebarTabs.slice(2);

  constructor() {
    this.syncOpenBranchFromRoute();
    this.route.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.syncOpenBranchFromRoute());
  }

  isParentActive(tab: SidebarTabs): boolean {
    if (!tab.children?.length) {
      return false;
    }
    const currentRoute = this.route.url.split('?')[0];
    const base = tab.route.replace(/\/$/, '');
    return currentRoute === base || currentRoute.startsWith(base + '/');
  }

  isParentRowActive(tab: SidebarTabs): boolean {
    if (!tab.children?.length) {
      return false;
    }
    const currentRoute = this.route.url.split('?')[0];
    const base = tab.route.replace(/\/$/, '');
    return currentRoute === base;
  }

  isBranchOpen(tab: SidebarTabs): boolean {
    if (!tab.children?.length) {
      return false;
    }
    return this.openBranchId() === tab.id;
  }

  toggleBranch(tab: SidebarTabs): void {
    if (!tab.children?.length) {
      return;
    }
    if (this.openBranchId() === tab.id) {
      this.openBranchId.set(null);
      return;
    }
    this.openBranchId.set(tab.id);
  }

  private syncOpenBranchFromRoute(): void {
    for (const t of this.sidebarNavScrollable) {
      if (t.children?.length && this.isParentActive(t)) {
        this.openBranchId.set(t.id);
        return;
      }
    }
    this.openBranchId.set(null);
  }
}
