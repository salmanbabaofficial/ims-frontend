import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIncomeTypesComponent } from './custom-income-types.component';

describe('CustomIncomeTypesComponent', () => {
  let component: CustomIncomeTypesComponent;
  let fixture: ComponentFixture<CustomIncomeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomIncomeTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomIncomeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
