import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFinesComponent } from './custom-fines.component';

describe('CustomFinesComponent', () => {
  let component: CustomFinesComponent;
  let fixture: ComponentFixture<CustomFinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
