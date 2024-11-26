import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulLinksComponent } from './useful-links.component';

describe('UsefulLinksComponent', () => {
  let component: UsefulLinksComponent;
  let fixture: ComponentFixture<UsefulLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsefulLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsefulLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
