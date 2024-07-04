import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluguel } from '../../model/aluguel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlugueisService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/ProjetoAluguel_BackEnd_2024/rest/restrito/aluguel';

  public cadastrarAluguel(aluguel: Aluguel): Observable<any>{
    return this.httpClient.post<any>(this.API, aluguel)
  }

  public consultarPorId(id:number): Observable<Aluguel>{
    return this.httpClient.get<Aluguel>(this.API+"/"+id);
  }

}
