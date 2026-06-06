import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIncomeComponent } from './custom-income.component';

describe('CustomIncomeComponent', () => {
  let component: CustomIncomeComponent;
  let fixture: ComponentFixture<CustomIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
