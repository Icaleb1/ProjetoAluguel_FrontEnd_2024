import { TestBed } from '@angular/core/testing';

import { BrinquedosService } from './brinquedos.service';

describe('BrinquedosService', () => {
  let service: BrinquedosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrinquedosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
