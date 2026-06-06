import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalStudentsComponent } from './withdrawal-students.component';

describe('WithdrawalStudentsComponent', () => {
  let component: WithdrawalStudentsComponent;
  let fixture: ComponentFixture<WithdrawalStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawalStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
