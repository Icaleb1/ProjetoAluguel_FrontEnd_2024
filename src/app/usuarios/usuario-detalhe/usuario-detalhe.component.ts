import { UsuariosService } from './../../shared/service/usuario/usuarios.service';
import { Usuario } from './../../shared/model/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrl: './usuario-detalhe.component.scss'
})
export class UsuarioDetalheComponent implements OnInit{

  public usuario: Usuario = new Usuario();
  public idUsuario: number;

  constructor(private usuarioService: UsuariosService,
    private router:Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idUsuario = params['id'];
      if(this.idUsuario){
        this.buscarUsuario();
      }
    });

  }

  public buscarUsuario(): void{
    this.usuarioService.consultarPorId(this.idUsuario).subscribe(
      (brinquedo) => {
        this.usuario = brinquedo;
      },
      (erro) => {
        Swal.fire('Erro ao buscar usuario ', erro, 'error');
      }
    );
  }

  public salvar(): void{
    if(this.validarCampos()){
      if(this.idUsuario){
        this.atualizarUsuario();
      }else{
        this.cadastrarUsuario();
      }
    }
  }

  public validarCampos(): boolean {
    if (!this.usuario.nome || !this.usuario.cpf || !this.usuario.data_nascimento || !this.usuario.email || !this.usuario.telefone || !this.usuario.senha) {
      Swal.fire('Erro!', 'Todos os campos devem ser preenchidos!', 'error');
      return false;
    }

    return true;
  }

  public cadastrarUsuario(){
    this.usuario.ativo = true;
    this.usuario.administrador = false
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
    (resposta) => {
      Swal.fire('Usuario cadastrado com sucesso!', '', 'success'); this.voltar();
    },
    (erro) => {
      Swal.fire('Erro ao salvar o Usuario!', erro, 'error');
    }
  );
}

public atualizarUsuario(){
  this.usuarioService.atualizar(this.usuario).subscribe(
    (resposta) => {
      Swal.fire('Usuario editado com sucesso!', '', 'success');
      this.voltar();
    },
    (erro) => {
      Swal.fire('Erro ao editar usuario: ' + erro.error.mensagem, 'error');
    }
  );
}

voltar() {
  this.router.navigate(['/login']);
}

}
