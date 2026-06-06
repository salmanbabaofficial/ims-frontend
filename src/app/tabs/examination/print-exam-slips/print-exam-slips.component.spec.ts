import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintExamSlipsComponent } from './print-exam-slips.component';

describe('PrintExamSlipsComponent', () => {
  let component: PrintExamSlipsComponent;
  let fixture: ComponentFixture<PrintExamSlipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintExamSlipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintExamSlipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
