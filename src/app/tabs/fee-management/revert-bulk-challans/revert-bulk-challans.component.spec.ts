import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertBulkChallansComponent } from './revert-bulk-challans.component';

describe('RevertBulkChallansComponent', () => {
  let component: RevertBulkChallansComponent;
  let fixture: ComponentFixture<RevertBulkChallansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevertBulkChallansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevertBulkChallansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
