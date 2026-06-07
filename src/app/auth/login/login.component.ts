import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faChalkboardUser,
  faEnvelope,
  faEye,
  faEyeSlash,
  faGraduationCap,
  faLock,
  faShieldHalved,
  faUserGroup,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../interfaces/auth.interface';

interface RoleMeta {
  id: UserRole;
  title: string;
  subtitle: string;
  icon: IconDefinition;
  accent: string;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, FaIconComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  readonly faEnvelope = faEnvelope;
  readonly faLock = faLock;
  readonly faArrowLeft = faArrowLeft;
  readonly faEye = faEye;
  readonly faEyeSlash = faEyeSlash;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly roleMetaMap: Record<UserRole, RoleMeta> = {
    admin: { id: 'admin', title: 'Administrator', subtitle: 'Full system access', icon: faShieldHalved, accent: 'admin' },
    teacher: { id: 'teacher', title: 'Teacher Portal', subtitle: 'Academic & classroom tools', icon: faChalkboardUser, accent: 'teacher' },
    student: { id: 'student', title: 'Student Portal', subtitle: 'Learning & progress dashboard', icon: faGraduationCap, accent: 'student' },
    parent: { id: 'parent', title: 'Parent Portal', subtitle: "Track your child's progress", icon: faUserGroup, accent: 'parent' },
  };

  readonly role = signal<UserRole>('admin');
  readonly showPassword = signal(false);
  readonly loading = signal(false);

  email = '';
  password = '';
  remember = true;

  ngOnInit(): void {
    const r = (this.route.snapshot.queryParamMap.get('role') ?? 'admin') as UserRole;
    if (this.roleMetaMap[r]) {
      this.role.set(r);
    }
    this.email = this.demoEmail();
  }

  get meta(): RoleMeta {
    return this.roleMetaMap[this.role()];
  }

  demoEmail(): string {
    switch (this.role()) {
      case 'admin': return 'admin@ims.edu';
      case 'teacher': return 'teacher@ims.edu';
      case 'student': return 'student@ims.edu';
      case 'parent': return 'parent@ims.edu';
    }
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  onSubmit(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.authService.saveSession({
        user: {
          id: '1',
          name: this.meta.title,
          email: this.email,
          role: this.role(),
        },
        accessToken: 'demo-token',
        refreshToken: 'demo-refresh',
      });
      this.router.navigate(['/dashboard']);
    }, 600);
  }
}
