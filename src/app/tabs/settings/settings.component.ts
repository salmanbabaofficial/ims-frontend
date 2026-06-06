import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faBuilding,
  faCreditCard,
  faDatabase,
  faPalette,
  faPlug,
  faSave,
  faShieldHalved,
  faSms,
} from '@fortawesome/free-solid-svg-icons';

type SettingsTab = 'general' | 'school' | 'fee' | 'sms' | 'notifications' | 'security' | 'integrations' | 'appearance' | 'backup';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  readonly faSave = faSave;
  readonly faBuilding = faBuilding;
  readonly faCreditCard = faCreditCard;
  readonly faSms = faSms;
  readonly faBell = faBell;
  readonly faShield = faShieldHalved;
  readonly faPlug = faPlug;
  readonly faPalette = faPalette;
  readonly faDatabase = faDatabase;

  readonly activeTab = signal<SettingsTab>('general');

  general = {
    siteName: 'IMS - Institute Management System',
    timezone: 'Asia/Karachi',
    language: 'English',
    dateFormat: 'DD MMM YYYY',
    currency: 'PKR',
    weekStart: 'Monday',
  };

  school = {
    name: 'Sunrise Public School',
    motto: 'Knowledge for All',
    address: '123 Main Street, Lahore, Pakistan',
    phone: '+92 42 1234567',
    email: 'info@sunrise.edu.pk',
    website: 'https://sunrise.edu.pk',
    affiliation: 'BISE Lahore',
  };

  fee = {
    feePrefix: 'CH-',
    receiptFooter: 'Thank you for the payment.',
    lateFeeAfterDays: 7,
    lateFeeFixed: 100,
    sendReminderSms: true,
  };

  sms = {
    provider: 'Jazz',
    senderId: 'IMS-SCH',
    apiKey: '••••••••••••',
    enableForFee: true,
    enableForAttendance: true,
    enableForDiary: true,
  };

  notifications = {
    feeReminder: true,
    attendanceAlerts: true,
    examResults: true,
    eventReminders: true,
    pushNotifications: false,
  };

  security = {
    passwordPolicy: 'strong',
    twoFactor: false,
    sessionTimeout: 30,
    lockoutAttempts: 5,
  };

  appearance = {
    primaryColor: '#2563eb',
    sidebarStyle: 'light',
    layout: 'fluid',
  };

  backup = {
    autoBackup: true,
    frequency: 'Daily',
    keepLast: 7,
  };

  readonly tabs: { id: SettingsTab; label: string; icon: any; subtitle: string }[] = [
    { id: 'general', label: 'General', icon: this.faBuilding, subtitle: 'Site basics' },
    { id: 'school', label: 'School Info', icon: this.faBuilding, subtitle: 'Branding & contact' },
    { id: 'fee', label: 'Fee', icon: this.faCreditCard, subtitle: 'Receipt & late fee' },
    { id: 'sms', label: 'SMS', icon: this.faSms, subtitle: 'Gateway setup' },
    { id: 'notifications', label: 'Notifications', icon: this.faBell, subtitle: 'Alert preferences' },
    { id: 'security', label: 'Security', icon: this.faShield, subtitle: 'Passwords & sessions' },
    { id: 'integrations', label: 'Integrations', icon: this.faPlug, subtitle: '3rd-party services' },
    { id: 'appearance', label: 'Appearance', icon: this.faPalette, subtitle: 'Theme & layout' },
    { id: 'backup', label: 'Backup', icon: this.faDatabase, subtitle: 'Data backups' },
  ];
}
