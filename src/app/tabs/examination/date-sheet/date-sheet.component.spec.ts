import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSheetComponent } from './date-sheet.component';

describe('DateSheetComponent', () => {
  let component: DateSheetComponent;
  let fixture: ComponentFixture<DateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
