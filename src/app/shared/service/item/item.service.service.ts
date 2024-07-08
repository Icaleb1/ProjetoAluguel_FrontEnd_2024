import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../../model/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/ProjetoAluguel_BackEnd_2024/rest/restrito/item';

  public consultarTodosPorIdAluguel(idAluguel:number): Observable<Array<Item>>{
    return this.httpClient.get<Array<Item>>(this.API+"/todos-por-aluguel/"+idAluguel)
  }

  public criarItem(item: Item): Observable<any>{
    return this.httpClient.post<any>(this.API, item)
  }

}
