import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTutorialsLatestComponent } from './video-tutorials-latest.component';

describe('VideoTutorialsLatestComponent', () => {
  let component: VideoTutorialsLatestComponent;
  let fixture: ComponentFixture<VideoTutorialsLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoTutorialsLatestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoTutorialsLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
