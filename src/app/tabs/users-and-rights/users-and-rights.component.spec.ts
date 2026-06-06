import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndRightsComponent } from './users-and-rights.component';

describe('UsersAndRightsComponent', () => {
  let component: UsersAndRightsComponent;
  let fixture: ComponentFixture<UsersAndRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersAndRightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAndRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
