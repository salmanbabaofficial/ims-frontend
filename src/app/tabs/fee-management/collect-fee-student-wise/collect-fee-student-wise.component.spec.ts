import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectFeeStudentWiseComponent } from './collect-fee-student-wise.component';

describe('CollectFeeStudentWiseComponent', () => {
  let component: CollectFeeStudentWiseComponent;
  let fixture: ComponentFixture<CollectFeeStudentWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectFeeStudentWiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectFeeStudentWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
