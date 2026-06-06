import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteAndDemoteComponent } from './promote-and-demote.component';

describe('PromoteAndDemoteComponent', () => {
  let component: PromoteAndDemoteComponent;
  let fixture: ComponentFixture<PromoteAndDemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoteAndDemoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoteAndDemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
