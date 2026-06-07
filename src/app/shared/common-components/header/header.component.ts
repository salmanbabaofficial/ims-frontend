import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [FaIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly appTitle = input<string>('Institute Management System');

  readonly faBell = faBell;
  readonly faUser = faUser;
  readonly faSignOut = faArrowRightFromBracket;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onLogout(): void {
    const refreshToken = this.authService.getRefreshToken();
    const finish = () => {
      this.authService.clearSession();
      this.router.navigate(['/']);
    };

    if (!refreshToken) {
      finish();
      return;
    }

    this.authService.logout(refreshToken).subscribe({
      next: () => finish(),
      error: () => finish(),
    });
  }
}
