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

}
