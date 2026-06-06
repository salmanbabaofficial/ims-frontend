import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultIncomeComponent } from './default-income.component';

describe('DefaultIncomeComponent', () => {
  let component: DefaultIncomeComponent;
  let fixture: ComponentFixture<DefaultIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
