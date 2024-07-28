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

  public atualizar(aluguel: Aluguel): Observable<any>{
    return this.httpClient.put<any>(this.API+"/atualizar", aluguel);
  }

  public removerItem(idAluguel:number, idItem:number): Observable<any>{
    return this.httpClient.put<any>(this.API+"/remover-item/", idAluguel + "/" + idItem);
  }

  public finalizarAluguel(aluguel: Aluguel): Observable<any>{
    return this.httpClient.put<any>(this.API+"/finalizar", aluguel);
  }

  public consultarPorIdUsuario(idUsuario: number): Observable<Aluguel[]>{
    return this.httpClient.get<Aluguel[]>(this.API+"/todos"+idUsuario);
  }

  public devolucao(aluguel: Aluguel): Observable<any>{
    return this.httpClient.put<any>(this.API+"/devolucao/" + aluguel.id, aluguel);
  }

}
