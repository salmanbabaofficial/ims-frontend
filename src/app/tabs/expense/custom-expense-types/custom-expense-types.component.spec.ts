import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomExpenseTypesComponent } from './custom-expense-types.component';

describe('CustomExpenseTypesComponent', () => {
  let component: CustomExpenseTypesComponent;
  let fixture: ComponentFixture<CustomExpenseTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomExpenseTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomExpenseTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
