import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreteDetalheComponent } from './frete-detalhe.component';

describe('FreteDetalheComponent', () => {
  let component: FreteDetalheComponent;
  let fixture: ComponentFixture<FreteDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreteDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
