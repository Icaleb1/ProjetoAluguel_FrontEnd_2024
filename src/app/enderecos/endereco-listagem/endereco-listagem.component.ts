import { EnderecosService } from './../../shared/service/endereco/enderecos.service';
import { Endereco } from './../../shared/model/endereco';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../shared/model/usuario';

@Component({
  selector: 'app-endereco-listagem',
  templateUrl: './endereco-listagem.component.html',
  styleUrls: ['./endereco-listagem.component.scss']
})
export class EnderecoListagemComponent implements OnInit {

  public usuarioAutenticado: Usuario;
  public enderecos: Array<Endereco> = new Array();




  constructor(
    private router: Router,
    private enderecosService: EnderecosService,
    private route: ActivatedRoute,
  ){}


  ngOnInit(): void {
    const usuarioNoStorage = localStorage.getItem('usuarioAutenticado');

    if (usuarioNoStorage) {
      this.usuarioAutenticado = JSON.parse(usuarioNoStorage);
    } else {
      console.error('Nenhum usuário autenticado encontrado no armazenamento local');
    }

    this.consultarTodosOsEnderecosUsuario();
  }


  private consultarTodosOsEnderecosUsuario(){
    this.enderecosService.consultarEnderecosPorIdUsuario(this.usuarioAutenticado.id).subscribe(
      resultado => {
        this.enderecos = resultado;
      },
      erro => {
        console.error('Erro ao consultar endereços! ', erro);

      }
    );
  }

  cadastrarEndereco() {
    this.router.navigate(['/home/enderecos/detalhe']);
  }
}
