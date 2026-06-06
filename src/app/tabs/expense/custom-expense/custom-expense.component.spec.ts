import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomExpenseComponent } from './custom-expense.component';

describe('CustomExpenseComponent', () => {
  let component: CustomExpenseComponent;
  let fixture: ComponentFixture<CustomExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
