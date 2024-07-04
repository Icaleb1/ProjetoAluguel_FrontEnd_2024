
import { Component } from '@angular/core';
import { UsuarioDTO } from '../../shared/model/usuario.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from '../../shared/service/login/login-service.service';
import { Usuario } from '../../shared/model/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public dto: UsuarioDTO = new UsuarioDTO();

  constructor(
              private LoginServiceService: LoginServiceService,
              private router: Router,
              private route: ActivatedRoute
            ){

  }

  public realizarLogin() {
    this.LoginServiceService.autenticar(this.dto).subscribe(
      (usuarioAutenticado: Usuario) => {
        if (usuarioAutenticado.idSessao) {
          Swal.fire('Sucesso', 'Usuário autenticado com sucesso', 'success');
          localStorage.setItem('usuarioAutenticado', JSON.stringify(usuarioAutenticado));
          this.router.navigate(['/home']);
        } else {
          Swal.fire('Erro', 'Sessão não iniciada corretamente', 'error');
        }
      },
      (erro) => {
        Swal.fire('Erro ao logar!', erro.error.mensagem, 'error');
      }
    );
  }


  public cadastro(){
    this.router.navigate(['/usuario/novo']);
  }

}
