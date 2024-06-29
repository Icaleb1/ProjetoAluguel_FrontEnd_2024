import { Usuario } from './../../model/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/ProjetoAluguel_BackEnd_2024/rest/usuario';

  public cadastrarUsuario(usuario: Usuario): Observable<any>{
    return this.httpClient.post<any>(this.API, usuario)
  }


  public consultarPorId(id:number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(this.API+"/"+id);
  }

  public atualizar(usuario: Usuario): Observable<any>{
    return this.httpClient.put<any>(this.API+"/atualizar", usuario)
  }



}
