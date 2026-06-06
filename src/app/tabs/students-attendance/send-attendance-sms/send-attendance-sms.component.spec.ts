import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAttendanceSmsComponent } from './send-attendance-sms.component';

describe('SendAttendanceSmsComponent', () => {
  let component: SendAttendanceSmsComponent;
  let fixture: ComponentFixture<SendAttendanceSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendAttendanceSmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendAttendanceSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
