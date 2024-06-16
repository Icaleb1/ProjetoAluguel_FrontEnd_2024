import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../../model/endereco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/ProjetoAluguel_BackEnd_2024/rest/restrito/endereco';

  public cadastrarEndereco(endereco: Endereco): Observable<any>{
    return this.httpClient.post<any>(this.API, endereco)
  }

  public consultarEnderecosPorIdUsuario(idUsuario:number): Observable<Endereco[]>{
    return this.httpClient.get<Endereco[]>(this.API+"/todos/"+idUsuario);
  }

  public consultarPrincipalPorIdUsuario(idUsuario:number): Observable<Endereco>{
    return this.httpClient.get<Endereco>(this.API+"/principal/"+idUsuario)
  }

  public consultarPorId(id:number): Observable<Endereco>{
    return this.httpClient.get<Endereco>(this.API+"/"+id);
  }

  public atualizar(endereco: Endereco): Observable<any>{
    return this.httpClient.put<any>(this.API+"/atualizar", endereco)
  }


}
