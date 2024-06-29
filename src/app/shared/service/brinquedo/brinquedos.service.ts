import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrinquedoSeletor } from '../../model/seletor/brinquedoSeletor';
import { Brinquedo } from '../../model/brinquedo';

@Injectable({
  providedIn: 'root'
})
export class BrinquedosService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/ProjetoAluguel_BackEnd_2024/rest/restrito/brinquedo';

  public listarTodos(): Observable<Array<Brinquedo>>{
    return this.httpClient.get<Array<Brinquedo>>(this.API+"/todos");
  }

  public consultarComSeletor(seletor: BrinquedoSeletor): Observable<Array<Brinquedo>>{
    return this.httpClient.post<Array<Brinquedo>>(this.API+"/filtro",seletor)
  }

  public cadastrarBrinquedo(brinquedo: Brinquedo): Observable<any>{
    return this.httpClient.post<any>(this.API, brinquedo)
  }

  public consultarPorId(id:number): Observable<Brinquedo>{
    return this.httpClient.get<Brinquedo>(this.API+"/"+id);
  }

  public atualizar(brinquedo: Brinquedo): Observable<any>{
    return this.httpClient.put<any>(this.API+"/atualizar", brinquedo)
  }

  public excluirBrinquedo(id:number): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.API+"/"+id)
  }

}
