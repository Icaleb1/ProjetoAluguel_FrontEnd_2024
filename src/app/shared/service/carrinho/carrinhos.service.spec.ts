import { TestBed } from '@angular/core/testing';
import { CarrinhosService } from './carrinhos.service';



describe('CarrinhosService', () => {
  let service: CarrinhosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
