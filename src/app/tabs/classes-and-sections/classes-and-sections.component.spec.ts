import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesAndSectionsComponent } from './classes-and-sections.component';

describe('ClassesAndSectionsComponent', () => {
  let component: ClassesAndSectionsComponent;
  let fixture: ComponentFixture<ClassesAndSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesAndSectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesAndSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
