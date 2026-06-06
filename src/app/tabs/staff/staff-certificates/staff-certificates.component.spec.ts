import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCertificatesComponent } from './staff-certificates.component';

describe('StaffCertificatesComponent', () => {
  let component: StaffCertificatesComponent;
  let fixture: ComponentFixture<StaffCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffCertificatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
