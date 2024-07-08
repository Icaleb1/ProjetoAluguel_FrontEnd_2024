import { TestBed } from '@angular/core/testing';

import { CarrinhoEventService } from './carrinho-event.service';

describe('CarrinhoEventService', () => {
  let service: CarrinhoEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
