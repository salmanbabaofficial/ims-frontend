import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFineTypesComponent } from './custom-fine-types.component';

describe('CustomFineTypesComponent', () => {
  let component: CustomFineTypesComponent;
  let fixture: ComponentFixture<CustomFineTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFineTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFineTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
