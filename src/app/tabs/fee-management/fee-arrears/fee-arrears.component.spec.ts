import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeArrearsComponent } from './fee-arrears.component';

describe('FeeArrearsComponent', () => {
  let component: FeeArrearsComponent;
  let fixture: ComponentFixture<FeeArrearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeArrearsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeArrearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
