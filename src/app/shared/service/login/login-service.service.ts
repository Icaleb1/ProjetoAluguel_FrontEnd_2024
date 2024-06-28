import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../../model/usuario.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private readonly API = 'http://localhost:8080/ProjetoAluguel_BackEnd_2024/rest/login';

  constructor(private httpClient: HttpClient) { }

  autenticar(dto: UsuarioDTO): Observable<any> {
    return this.httpClient.post(this.API + '/autenticar', dto);
  }

  sair() {
    localStorage.removeItem('usuarioAutenticado');
  }
}
