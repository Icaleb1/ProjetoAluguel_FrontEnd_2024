import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrinho } from '../../model/carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhosService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/ProjetoAluguel_BackEnd_2024/rest/carrinho';

  public consultarCarrinhoPorIdUsuario(idUsuario:number): Observable<Carrinho>{
    return this.httpClient.get<Carrinho>(this.API+"/"+idUsuario);
  }

}
