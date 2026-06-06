import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFinesComponent } from './default-fines.component';

describe('DefaultFinesComponent', () => {
  let component: DefaultFinesComponent;
  let fixture: ComponentFixture<DefaultFinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultFinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
