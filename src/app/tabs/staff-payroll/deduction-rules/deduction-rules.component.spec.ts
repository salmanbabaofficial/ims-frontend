import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionRulesComponent } from './deduction-rules.component';

describe('DeductionRulesComponent', () => {
  let component: DeductionRulesComponent;
  let fixture: ComponentFixture<DeductionRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeductionRulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
