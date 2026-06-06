import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultExpenseComponent } from './default-expense.component';

describe('DefaultExpenseComponent', () => {
  let component: DefaultExpenseComponent;
  let fixture: ComponentFixture<DefaultExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
