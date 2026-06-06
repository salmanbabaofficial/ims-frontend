import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintsendDiaryComponent } from './printsend-diary.component';

describe('PrintsendDiaryComponent', () => {
  let component: PrintsendDiaryComponent;
  let fixture: ComponentFixture<PrintsendDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintsendDiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintsendDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
