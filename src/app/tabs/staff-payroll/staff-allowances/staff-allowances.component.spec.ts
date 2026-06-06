import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAllowancesComponent } from './staff-allowances.component';

describe('StaffAllowancesComponent', () => {
  let component: StaffAllowancesComponent;
  let fixture: ComponentFixture<StaffAllowancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffAllowancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffAllowancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
