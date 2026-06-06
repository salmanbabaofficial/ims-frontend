import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSingleChallanComponent } from './create-single-challan.component';

describe('CreateSingleChallanComponent', () => {
  let component: CreateSingleChallanComponent;
  let fixture: ComponentFixture<CreateSingleChallanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSingleChallanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSingleChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
