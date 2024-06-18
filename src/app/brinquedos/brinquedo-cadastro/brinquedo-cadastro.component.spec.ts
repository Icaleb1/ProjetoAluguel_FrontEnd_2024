import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrinquedoCadastroComponent } from './brinquedo-cadastro.component';

describe('BrinquedoCadastroComponent', () => {
  let component: BrinquedoCadastroComponent;
  let fixture: ComponentFixture<BrinquedoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrinquedoCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrinquedoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
