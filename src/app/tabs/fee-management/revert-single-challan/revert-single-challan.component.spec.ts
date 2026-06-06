import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertSingleChallanComponent } from './revert-single-challan.component';

describe('RevertSingleChallanComponent', () => {
  let component: RevertSingleChallanComponent;
  let fixture: ComponentFixture<RevertSingleChallanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevertSingleChallanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevertSingleChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
