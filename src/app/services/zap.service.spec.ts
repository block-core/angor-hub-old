import { TestBed } from '@angular/core/testing';

import { ZapService } from './zap.service';

describe('ZapService', () => {
  let service: ZapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
