import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brinquedo } from '../model/brinquedo';
import { BrinquedoSeletor } from '../model/seletor/brinquedoSeletor';

@Injectable({
  providedIn: 'root'
})
export class BrinquedosService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/ProjetoAluguel_BackEnd_2024/rest/brinquedo';

  public listarTodos(): Observable<Array<Brinquedo>>{
    return this.httpClient.get<Array<Brinquedo>>(this.API+"/todos");
  }

  public consultarComSeletor(seletor: BrinquedoSeletor): Observable<Array<Brinquedo>>{
    return this.httpClient.post<Array<Brinquedo>>(this.API+"/filtro",seletor)
  }




}
