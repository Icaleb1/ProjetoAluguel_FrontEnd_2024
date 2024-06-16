import { AlugueisService } from './../../shared/service/aluguel/alugueis.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { Router } from '@angular/router';
import { Carrinho } from '../../shared/model/carrinho';
import Swal from 'sweetalert2';
import { ItemCarrinho } from '../../shared/model/itemCarrinho';
import { CarrinhosService } from '../../shared/service/carrinho/carrinhos.service';
import { ItemCarrinhosService } from '../../shared/service/item-carrinho/item-carrinhos.service';
import { Aluguel } from '../../shared/model/aluguel';
import { EnderecosService } from '../../shared/service/endereco/enderecos.service';
import { Endereco } from '../../shared/model/endereco';
import { Frete } from '../../shared/model/frete';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public usuarioAutenticado: Usuario;
  public ehAdministrador: boolean = false;
  carrinho: Carrinho;
  itens: ItemCarrinho[] = [];
  brinquedos: ItemCarrinho[] = [];
  item: ItemCarrinho


  constructor(private router: Router,
             private carrinhoService: CarrinhosService,
             private itemCarrinhoService: ItemCarrinhosService,
             private alugueisService: AlugueisService,
             private enderecoService: EnderecosService,

  ) { }

  ngOnInit(): void {
    const usuarioNoStorage = localStorage.getItem('usuarioAutenticado');

  if (usuarioNoStorage) {
    this.usuarioAutenticado = JSON.parse(usuarioNoStorage);

    this.consultarTodosBrinquedosCarrinho(this.usuarioAutenticado.id);
  } else {
    console.error('Nenhum usuário autenticado encontrado no armazenamento local');
  }
  }

  public cadastrarEndereco(){
    this.router.navigate(['/home/enderecos/detalhe']);
  }


  logout(){
    localStorage.removeItem('usuarioAutenticado');
    this.router.navigate(['/login']);
  }

  private consultarTodosBrinquedosCarrinho(idUsuario: number): void {
    this.carrinhoService.consultarCarrinhoPorIdUsuario(idUsuario).subscribe(
      resultado => {
        this.carrinho = resultado;
        this.itens = resultado.itens;
        this.brinquedos = this.itens;
      },
      erro => {
        console.error('Erro ao consultar Brinquedos!', erro);
      }
    );
  }


  public removerItem(itemSelecionado: ItemCarrinho) {
    Swal.fire({
      title: 'Deseja realmente remover esse item do carrinho?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remova!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.itemCarrinhoService.removerDoCarrinho(itemSelecionado.id).subscribe(
          resultado => {
            Swal.fire('Sucesso!', 'Item removido com sucesso!', 'success');
            this.consultarTodosBrinquedosCarrinho(this.usuarioAutenticado.id);
          },
          erro => {
            Swal.fire('Erro!', 'Erro ao remover item: ' + erro.error.mensagem, 'error');
          }
        );
      }
    });
  }

  private pesquisar(): void {
    this.consultarTodosBrinquedosCarrinho(this.usuarioAutenticado.id);
  }

  confirmar() {
    if (this.itens.length === 0) {
      Swal.fire('Erro!', 'Não é possível criar aluguel com o carrinho vazio.', 'error');
      return;
    }

    this.criarAluguel();
  }

  criarAluguel() {
    const novoAluguel: Aluguel = {
      id: 0,
      usuario: this.usuarioAutenticado,
      itens: [],
      dataAluguel: new Date(),
      dataDevolucao: new Date(),
      dataDevDefinitiva: new Date(),
      valoresAdicionais: 0,
      valorTotal: 0,
      idEnderecoDeEntrega: 0,
    };

    this.alugueisService.cadastrarAluguel(novoAluguel).subscribe(
      aluguelCriado => {
        const aluguelId = aluguelCriado.id;
        this.adicionarItensAoAluguel(aluguelId);
      },
      erro => {
        Swal.fire('Erro!', 'Erro ao criar aluguel: ' + erro.error.mensagem, 'error');
      }
    );
  }

  adicionarItensAoAluguel(aluguelId: number) {
    this.carrinhoService.adicionarItensAoAluguel(aluguelId, this.itens).subscribe(
      resultado => {
        Swal.fire('Sucesso!', 'Itens adicionados ao aluguel com sucesso!', 'success');
        this.limparCarrinho(aluguelId);
      },
      erro => {
        Swal.fire('Erro!', 'Erro ao adicionar itens ao aluguel: ' + erro.error.mensagem, 'error');
      }
    );
  }

  limparCarrinho(aluguelId: number) {
    this.carrinhoService.limparCarrinho(this.carrinho.id).subscribe(
      () => {
        this.carrinhoService.setItensCarrinho([]);
        this.router.navigate(['/home/alugueis/alugar/' + aluguelId]);
    //    {path: "alugar/:id", component: AluguelDetalheComponent}
      },
      erro => {
        Swal.fire('Erro!', 'Erro ao limpar o carrinho: ' + erro.error.mensagem, 'error');
        this.carrinhoService.setItensCarrinho([]);
        this.router.navigate(['/home/alugueis/alugar/', aluguelId]);
      }
    );
  }

  public validarQuantidade(item: ItemCarrinho) {
    if (item.quantidade < 1) {
      item.quantidade = 1;
      Swal.fire('Aviso!', 'A quantidade deve ser maior ou igual a um.', 'warning');
    } else if (item.quantidade > item.brinquedo.estoqueDisponivel) {
      item.quantidade = item.brinquedo.estoqueDisponivel;
      Swal.fire('Aviso!', 'A quantidade não pode ser maior que a disponível.', 'warning');
    }
  }

}
