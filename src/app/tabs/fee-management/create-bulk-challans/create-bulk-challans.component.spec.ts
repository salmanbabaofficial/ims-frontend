import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBulkChallansComponent } from './create-bulk-challans.component';

describe('CreateBulkChallansComponent', () => {
  let component: CreateBulkChallansComponent;
  let fixture: ComponentFixture<CreateBulkChallansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBulkChallansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBulkChallansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
