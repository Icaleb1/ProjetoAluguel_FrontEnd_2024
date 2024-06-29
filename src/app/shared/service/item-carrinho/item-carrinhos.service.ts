import { ItemCarrinho } from './../../model/itemCarrinho';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemCarrinhosService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/ProjetoAluguel_BackEnd_2024/rest/restrito/itemCarrinho';

  public adicionarAoCarrinho(itemCarrinho: ItemCarrinho): Observable<any>{
    return this.httpClient.post<any>(this.API, itemCarrinho);
  }

  public removerDoCarrinho(idItem: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.API+"/"+idItem);
  }



}
