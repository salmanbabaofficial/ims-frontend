import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendGeneralMessageComponent } from './send-general-message.component';

describe('SendGeneralMessageComponent', () => {
  let component: SendGeneralMessageComponent;
  let fixture: ComponentFixture<SendGeneralMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendGeneralMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendGeneralMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
