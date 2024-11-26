import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaLinksComponent } from './social-media-links.component';

describe('SocialMediaLinksComponent', () => {
  let component: SocialMediaLinksComponent;
  let fixture: ComponentFixture<SocialMediaLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
