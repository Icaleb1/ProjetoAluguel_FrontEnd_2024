import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoEventService {
  public itemAdicionadoAoCarrinho: EventEmitter<void> = new EventEmitter();

  constructor() { }

  emitirItemAdicionado(): void {
    this.itemAdicionadoAoCarrinho.emit();
  }
}
