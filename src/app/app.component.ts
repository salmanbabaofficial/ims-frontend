import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/common-components/footer/footer.component';
import { HeaderComponent } from './shared/common-components/header/header.component';
import { SidebarComponent } from './shared/common-components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly appName = 'Institute Management System';
}
