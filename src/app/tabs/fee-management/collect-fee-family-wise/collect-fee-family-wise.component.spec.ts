import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectFeeFamilyWiseComponent } from './collect-fee-family-wise.component';

describe('CollectFeeFamilyWiseComponent', () => {
  let component: CollectFeeFamilyWiseComponent;
  let fixture: ComponentFixture<CollectFeeFamilyWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectFeeFamilyWiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectFeeFamilyWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
