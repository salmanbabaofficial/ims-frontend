import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDeductionComponent } from './custom-deduction.component';

describe('CustomDeductionComponent', () => {
  let component: CustomDeductionComponent;
  let fixture: ComponentFixture<CustomDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDeductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
