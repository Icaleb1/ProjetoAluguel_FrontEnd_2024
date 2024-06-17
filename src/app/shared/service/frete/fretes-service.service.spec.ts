import { TestBed } from '@angular/core/testing';

import { FretesServiceService } from './fretes-service.service';

describe('FretesServiceService', () => {
  let service: FretesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FretesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
