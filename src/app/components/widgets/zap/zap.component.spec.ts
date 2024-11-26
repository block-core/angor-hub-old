import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapComponent } from './zap.component';

describe('ZapComponent', () => {
  let component: ZapComponent;
  let fixture: ComponentFixture<ZapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
