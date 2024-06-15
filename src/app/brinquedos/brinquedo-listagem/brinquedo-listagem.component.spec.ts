import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrinquedoListagemComponent } from './brinquedo-listagem.component';

describe('BrinquedoListagemComponent', () => {
  let component: BrinquedoListagemComponent;
  let fixture: ComponentFixture<BrinquedoListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrinquedoListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrinquedoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
