import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCardsComponent } from './staff-cards.component';

describe('StaffCardsComponent', () => {
  let component: StaffCardsComponent;
  let fixture: ComponentFixture<StaffCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
