import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsGroupsComponent } from './exams-groups.component';

describe('ExamsGroupsComponent', () => {
  let component: ExamsGroupsComponent;
  let fixture: ComponentFixture<ExamsGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamsGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
