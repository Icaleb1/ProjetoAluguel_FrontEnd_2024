import { EnderecosService } from './../../shared/service/endereco/enderecos.service';
import { Endereco } from './../../shared/model/endereco';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../shared/model/usuario';
import Swal from 'sweetalert2';
import { EnderecoSeletor } from '../../shared/model/seletor/enderecoSeletor';


@Component({
  selector: 'app-endereco-listagem',
  templateUrl: './endereco-listagem.component.html',
  styleUrls: ['./endereco-listagem.component.scss']
})
export class EnderecoListagemComponent implements OnInit {

  public usuarioAutenticado: Usuario;
  public enderecos: Array<Endereco> = new Array();
  public endereco: Endereco = new Endereco();
  public seletor: EnderecoSeletor = new EnderecoSeletor();

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

  public editar(enderecoSelecionado: number){
    this.router.navigate(['/home/enderecos/detalhe/', enderecoSelecionado])
  }

  public pesquisar() {
    const idUsuario: number = this.seletor.idUsuario;
    this.enderecosService.consultarEnderecosPorIdUsuario(idUsuario).subscribe(
      resultado => {
        this.enderecos = resultado;
      },
      erro => {
        console.log('Erro ao buscar todas os endereços ' + erro + '!');
      }
    );
  }


  public excluir(enderecoSelecionado: Endereco) {
    Swal.fire({
      title: 'Deseja realmente excluir este endereço?',
      text: 'Esta ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.enderecosService.excluirEndereco(enderecoSelecionado.id).subscribe(
          resultado => {
            this.enderecos = this.enderecos.filter(endereco => endereco.id !== enderecoSelecionado.id);
  
            Swal.fire('Endereço Excluído!', 'O endereço foi excluído com sucesso.', 'success');
          },
          erro => {
            Swal.fire('Erro!', 'Erro ao excluir endereço: ' + erro.error.mensagem, 'error');
          }
        );
      }
    });
  }

  voltar(){
    this.router.navigate(['/home/brinquedos']);
  }
}
