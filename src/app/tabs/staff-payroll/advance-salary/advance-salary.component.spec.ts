import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceSalaryComponent } from './advance-salary.component';

describe('AdvanceSalaryComponent', () => {
  let component: AdvanceSalaryComponent;
  let fixture: ComponentFixture<AdvanceSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceSalaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
