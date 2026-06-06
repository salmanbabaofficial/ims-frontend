import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faChalkboardUser,
  faGraduationCap,
  faShieldHalved,
  faUserGroup,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

interface RoleCard {
  id: UserRole;
  title: string;
  subtitle: string;
  description: string;
  icon: IconDefinition;
  accent: string;
  features: string[];
}

@Component({
  selector: 'app-role-select',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './role-select.component.html',
  styleUrl: './role-select.component.css',
})
export class RoleSelectComponent {
  readonly faArrowRight = faArrowRight;

  readonly roles: RoleCard[] = [
    {
      id: 'admin',
      title: 'Administrator',
      subtitle: 'Full system access',
      description: 'Manage students, staff, fees, exams and configure the entire institute.',
      icon: faShieldHalved,
      accent: 'admin',
      features: ['Manage Users', 'Fees & Reports', 'Settings'],
    },
    {
      id: 'teacher',
      title: 'Teacher',
      subtitle: 'Academic portal',
      description: 'Mark attendance, upload assignments, enter marks and manage your classes.',
      icon: faChalkboardUser,
      accent: 'teacher',
      features: ['Attendance', 'Assignments', 'Exam Marks'],
    },
    {
      id: 'student',
      title: 'Student',
      subtitle: 'Learning dashboard',
      description: 'View timetable, assignments, results and daily diary at one place.',
      icon: faGraduationCap,
      accent: 'student',
      features: ['Diary & Notes', 'Results', 'Fee Status'],
    },
    {
      id: 'parent',
      title: 'Parent',
      subtitle: 'Child progress',
      description: 'Track attendance, fee dues and academic progress of your children.',
      icon: faUserGroup,
      accent: 'parent',
      features: ['Attendance', 'Fee Challan', 'Progress'],
    },
  ];

  constructor(private readonly router: Router) {}

  selectRole(role: UserRole): void {
    this.router.navigate(['/login'], { queryParams: { role } });
  }
}
