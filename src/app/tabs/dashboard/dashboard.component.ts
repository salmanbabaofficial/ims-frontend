import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faArrowDown,
  faArrowRight,
  faArrowUp,
  faBell,
  faBookOpen,
  faBullhorn,
  faCakeCandles,
  faCalendarDays,
  faChalkboardUser,
  faChartLine,
  faClipboardUser,
  faComment,
  faEllipsis,
  faFileInvoiceDollar,
  faGift,
  faMoneyBillWave,
  faPaperPlane,
  faPlus,
  faReceipt,
  faScaleBalanced,
  faSchool,
  faTriangleExclamation,
  faUserGraduate,
  faUsers,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface StatCard {
  id: number;
  icon: IconDefinition;
  label: string;
  value: string;
  trend: 'up' | 'down';
  change: string;
  hint: string;
  accent: string;
}

interface QuickAction {
  id: number;
  icon: IconDefinition;
  label: string;
  route: string;
  accent: string;
}

interface BarPoint {
  name: string;
  collected: number;
  expense: number;
}

interface WeekPoint {
  day: string;
  percent: number;
}

interface Activity {
  id: number;
  type: 'admission' | 'fee' | 'staff' | 'expense' | 'message' | 'exam';
  icon: IconDefinition;
  title: string;
  meta: string;
  time: string;
}

interface Birthday {
  id: number;
  name: string;
  className: string;
  age: number;
  initial: string;
  type: 'student' | 'staff';
}

interface Defaulter {
  id: number;
  name: string;
  className: string;
  fatherName: string;
  amount: number;
  months: number;
  initial: string;
}

interface NoticeItem {
  id: number;
  title: string;
  type: 'info' | 'warning' | 'event';
  date: string;
  description: string;
}

interface EventItem {
  id: number;
  title: string;
  day: string;
  month: string;
  time: string;
  location: string;
  accent: string;
}

interface GenderSegment {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [FaIconComponent, RouterLink, DecimalPipe, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  readonly faArrowUp = faArrowUp;
  readonly faArrowDown = faArrowDown;
  readonly faArrowRight = faArrowRight;
  readonly faEllipsis = faEllipsis;
  readonly faGift = faGift;
  readonly faBullhorn = faBullhorn;
  readonly faTriangleExclamation = faTriangleExclamation;

  readonly currentSession = '2025–2026';
  readonly todayLabel = 'Saturday, 06 June 2026';

  readonly totalStudents = 1247;
  readonly maleCount = 712;
  readonly femaleCount = 535;

  readonly statCards: StatCard[] = [
    {
      id: 1, icon: faUserGraduate, label: 'Total Students',
      value: '1,247', trend: 'up', change: '+24', hint: 'this month',
      accent: '#ed9e42',
    },
    {
      id: 2, icon: faUsers, label: 'Total Staff',
      value: '84', trend: 'up', change: '+3', hint: 'this month',
      accent: '#3aa0ff',
    },
    {
      id: 3, icon: faClipboardUser, label: "Today's Attendance",
      value: '92.5%', trend: 'up', change: '+2.1%', hint: 'vs yesterday',
      accent: '#2ecc71',
    },
    {
      id: 4, icon: faMoneyBillWave, label: 'Fee Collected (Month)',
      value: 'Rs. 24.5L', trend: 'up', change: '+18%', hint: 'vs last month',
      accent: '#9b59b6',
    },
    {
      id: 5, icon: faScaleBalanced, label: 'Pending Dues',
      value: 'Rs. 11.2L', trend: 'down', change: '-6%', hint: 'vs last month',
      accent: '#e74c3c',
    },
    {
      id: 6, icon: faReceipt, label: "Today's Expense",
      value: 'Rs. 8,500', trend: 'down', change: '-12%', hint: 'vs yesterday',
      accent: '#f39c12',
    },
  ];

  readonly quickActions: QuickAction[] = [
    { id: 1, icon: faPlus, label: 'New Admission', route: '/students/admission-form', accent: '#ed9e42' },
    { id: 2, icon: faFileInvoiceDollar, label: 'Collect Fee', route: '/fee-management/collect-fee-student-wise', accent: '#2ecc71' },
    { id: 3, icon: faClipboardUser, label: 'Mark Attendance', route: '/students-attendance/mark-attendance', accent: '#3aa0ff' },
    { id: 4, icon: faPaperPlane, label: 'Send SMS', route: '/send-general-message', accent: '#9b59b6' },
    { id: 5, icon: faReceipt, label: 'Add Expense', route: '/expense/custom-expense', accent: '#f39c12' },
    { id: 6, icon: faChartLine, label: 'View Reports', route: '/fee-management/fee-reports', accent: '#14b8a6' },
  ];

  readonly feeChartMonths: BarPoint[] = [
    { name: 'Jan', collected: 65, expense: 38 },
    { name: 'Feb', collected: 78, expense: 42 },
    { name: 'Mar', collected: 58, expense: 33 },
    { name: 'Apr', collected: 88, expense: 52 },
    { name: 'May', collected: 72, expense: 47 },
    { name: 'Jun', collected: 95, expense: 58 },
  ];

  readonly attendanceWeek: WeekPoint[] = [
    { day: 'Mon', percent: 88 },
    { day: 'Tue', percent: 94 },
    { day: 'Wed', percent: 81 },
    { day: 'Thu', percent: 89 },
    { day: 'Fri', percent: 95 },
    { day: 'Sat', percent: 76 },
  ];

  readonly recentActivity: Activity[] = [
    { id: 1, type: 'admission', icon: faUserGraduate, title: 'New admission: Ayesha Tariq', meta: 'Class 5 · Section A', time: 'Just now' },
    { id: 2, type: 'fee', icon: faMoneyBillWave, title: 'Fee received: Rs. 12,500', meta: 'From Ali Hassan (ADM-0001)', time: '5 min ago' },
    { id: 3, type: 'staff', icon: faChalkboardUser, title: 'Staff attendance marked', meta: '82 of 84 present today', time: '32 min ago' },
    { id: 4, type: 'exam', icon: faBookOpen, title: 'Exam results published', meta: 'Class 8 · Mid-Term Exam', time: '1 hour ago' },
    { id: 5, type: 'expense', icon: faReceipt, title: 'Expense added: Rs. 8,500', meta: 'Stationery & Office Supplies', time: '2 hours ago' },
    { id: 6, type: 'message', icon: faComment, title: 'SMS sent to 38 absent students', meta: 'Daily attendance alert', time: '3 hours ago' },
  ];

  readonly birthdaysToday: Birthday[] = [
    { id: 1, name: 'Fatima Noor', className: 'Class 4-A', age: 9, initial: 'F', type: 'student' },
    { id: 2, name: 'Hamza Iqbal', className: 'Class 9-B', age: 14, initial: 'H', type: 'student' },
    { id: 3, name: 'Ms. Sara Khan', className: 'Mathematics Teacher', age: 32, initial: 'S', type: 'staff' },
  ];

  readonly topDefaulters: Defaulter[] = [
    { id: 1, name: 'Zainab Bibi', className: 'Class 5-A', fatherName: 'Mohammad Ashraf', amount: 28500, months: 3, initial: 'Z' },
    { id: 2, name: 'Hamza Iqbal', className: 'Class 9-B', fatherName: 'Iqbal Hussain', amount: 22000, months: 2, initial: 'H' },
    { id: 3, name: 'Bilal Sheikh', className: 'Class 7-A', fatherName: 'Sheikh Asif', amount: 18500, months: 2, initial: 'B' },
    { id: 4, name: 'Sana Malik', className: 'Class 6-B', fatherName: 'Malik Tariq', amount: 14200, months: 2, initial: 'S' },
    { id: 5, name: 'Hassan Raza', className: 'Class 3-A', fatherName: 'Raza Khan', amount: 9800, months: 1, initial: 'H' },
  ];

  readonly notices: NoticeItem[] = [
    { id: 1, title: 'Summer Vacation Schedule Announced', type: 'info', date: '06 Jun 2026', description: 'School will remain closed from 20 June to 15 August. Reopens on 16 August 2026.' },
    { id: 2, title: 'Fee Submission Deadline Reminder', type: 'warning', date: '05 Jun 2026', description: 'Monthly fee for June must be submitted by 10 June. Late fee will apply afterwards.' },
    { id: 3, title: 'Parent–Teacher Meeting on 12 June', type: 'event', date: '04 Jun 2026', description: 'PTM scheduled for Saturday, 12 June from 9:00 AM to 1:00 PM. All parents are requested to attend.' },
  ];

  readonly upcomingEvents: EventItem[] = [
    { id: 1, title: 'Parent–Teacher Meeting', day: '12', month: 'JUN', time: '09:00 AM', location: 'Main Auditorium', accent: '#ed9e42' },
    { id: 2, title: 'Annual Sports Day', day: '15', month: 'JUN', time: '08:00 AM', location: 'School Ground', accent: '#2ecc71' },
    { id: 3, title: 'Quran Recitation Contest', day: '18', month: 'JUN', time: '10:30 AM', location: 'Mosque Hall', accent: '#9b59b6' },
    { id: 4, title: 'Summer Vacation Begins', day: '20', month: 'JUN', time: 'After School', location: 'Institute-wide', accent: '#3aa0ff' },
  ];

  // ===== Gender donut math =====
  get genderSegments(): GenderSegment[] {
    return [
      { label: 'Boys', value: this.maleCount, color: '#3aa0ff' },
      { label: 'Girls', value: this.femaleCount, color: '#ec4899' },
    ];
  }

  get malePercent(): number {
    return Math.round((this.maleCount / this.totalStudents) * 100);
  }

  get femalePercent(): number {
    return 100 - this.malePercent;
  }

  get donutMaleStroke(): string {
    const circumference = 2 * Math.PI * 56;
    const malePart = (this.malePercent / 100) * circumference;
    return `${malePart} ${circumference - malePart}`;
  }

  // helpers for icons (used as bell/calendar icons in notice/event blocks)
  readonly faBell = faBell;
  readonly faCalendarDays = faCalendarDays;
  readonly faCakeCandles = faCakeCandles;
  readonly faSchool = faSchool;
}
