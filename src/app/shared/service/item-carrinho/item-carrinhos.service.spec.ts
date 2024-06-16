import { TestBed } from '@angular/core/testing';

import { ItemCarrinhosService } from './item-carrinhos.service';

describe('ItemCarrinhosService', () => {
  let service: ItemCarrinhosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemCarrinhosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
