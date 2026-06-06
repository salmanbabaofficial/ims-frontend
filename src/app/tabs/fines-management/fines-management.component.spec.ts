import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinesManagementComponent } from './fines-management.component';

describe('FinesManagementComponent', () => {
  let component: FinesManagementComponent;
  let fixture: ComponentFixture<FinesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
