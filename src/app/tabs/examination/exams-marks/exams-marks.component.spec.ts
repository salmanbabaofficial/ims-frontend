import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsMarksComponent } from './exams-marks.component';

describe('ExamsMarksComponent', () => {
  let component: ExamsMarksComponent;
  let fixture: ComponentFixture<ExamsMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamsMarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
