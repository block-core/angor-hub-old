import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadboxComponent } from './downloadbox.component';

describe('DownloadboxComponent', () => {
  let component: DownloadboxComponent;
  let fixture: ComponentFixture<DownloadboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
