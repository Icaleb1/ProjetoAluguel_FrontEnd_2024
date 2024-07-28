import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../shared/service/usuario/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrl: './usuario-listagem.component.scss'
})
export class UsuarioListagemComponent implements OnInit{

  public usuarioAutenticado: Usuario;
  public ehAdministrador: boolean = false;
  public usuarios: Array<Usuario> = new Array();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
  ){}

  ngOnInit(): void {
    const usuarioNoStorage = localStorage.getItem('usuarioAutenticado');

    if (usuarioNoStorage) {
      this.usuarioAutenticado = JSON.parse(usuarioNoStorage);
      this.ehAdministrador = this.usuarioAutenticado.administrador;
    } else {
      console.error('Nenhum usuário autenticado encontrado no armazenamento local');
    }

    this.consultarTodosUsuarios();
  }

  private consultarTodosUsuarios(){
    this.usuarioService.listarTodos().subscribe(
      resultado => {
        this.usuarios = resultado;
      },
      erro => {
        Swal.fire('Erro ao consultar Usuários! ' + erro.message, 'error');
      }
    )
  }


}
