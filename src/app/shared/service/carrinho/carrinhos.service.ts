import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carrinho } from '../../model/carrinho';
import { ItemCarrinho } from '../../model/itemCarrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhosService {

  private itensCarrinhoSource = new BehaviorSubject<Array<ItemCarrinho>>([]);
  itensCarrinho$ = this.itensCarrinhoSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/ProjetoAluguel_BackEnd_2024/rest/restrito/carrinho';

    public consultarCarrinhoPorIdUsuario(idUsuario:number): Observable<Carrinho>{
      return this.httpClient.get<Carrinho>(this.API+"/por-usuario/"+idUsuario);
    }


    setItensCarrinho(itens: Array<ItemCarrinho>) {
      this.itensCarrinhoSource.next(itens);
    }

    public adicionarItensAoAluguel(aluguelId: number, itensCarrinho: Array<ItemCarrinho>): Observable<boolean> {
      return this.httpClient.put<boolean>(`${this.API}/adicao-aluguel/${aluguelId}`, itensCarrinho);
    }

    public limparCarrinho(idCarrinho: number): Observable<boolean>{
      return this.httpClient.delete<boolean>(this.API+"/"+idCarrinho);
    }


}
