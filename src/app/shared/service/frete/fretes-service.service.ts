import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Frete } from '../../model/frete';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FretesServiceService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/ProjetoAluguel_BackEnd_2024/rest/restrito/frete';

  public cadastrarFrete(frete: Frete): Observable<any>{
    return this.httpClient.post<any>(this.API, frete);
  }


}
