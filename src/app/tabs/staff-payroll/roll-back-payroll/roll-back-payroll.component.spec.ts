import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollBackPayrollComponent } from './roll-back-payroll.component';

describe('RollBackPayrollComponent', () => {
  let component: RollBackPayrollComponent;
  let fixture: ComponentFixture<RollBackPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollBackPayrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollBackPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
