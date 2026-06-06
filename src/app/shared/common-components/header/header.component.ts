import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly appTitle = input<string>('Institute Management System');

  readonly faBell = faBell;
  readonly faUser = faUser;
  readonly faSignOut = faArrowRightFromBracket;
}
