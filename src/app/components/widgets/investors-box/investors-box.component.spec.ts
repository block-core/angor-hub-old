import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsBoxComponent } from './investors-box.component';

describe('InvestorsBoxComponent', () => {
  let component: InvestorsBoxComponent;
  let fixture: ComponentFixture<InvestorsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestorsBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
