import { ItemCarrinhosService } from './shared/service/item-carrinho/item-carrinhos.service';
import { Carrinho } from './shared/model/carrinho';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CarrinhosService } from './shared/service/carrinho/carrinhos.service';
import { ItemCarrinho } from './shared/model/itemCarrinho';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  itens: ItemCarrinho[] = [];
  brinquedos: ItemCarrinho[] = [];

  @Output()
  atualizarCarrinho = new EventEmitter();

  constructor(private carrinhoService: CarrinhosService,
              private itemCarrinhoService: ItemCarrinhosService
  ) { }

  ngOnInit(): void {
    const idUsuario = this.getUsuarioId(); // ajuste para obter o idUsuario de forma adequada
    this.consultarTodosBrinquedosCarrinho(idUsuario);
  }

  private consultarTodosBrinquedosCarrinho(idUsuario: number): void {
    this.carrinhoService.consultarCarrinhoPorIdUsuario(idUsuario).subscribe(
      resultado => {
        this.itens = resultado.itens;
        this.brinquedos = this.itens; // Assumindo que todos os itens são brinquedos
      },
      erro => {
        console.error('Erro ao consultar Brinquedos! ', erro);
      }
    );
  }

  private getUsuarioId(): number {
    // Implemente a lógica para obter o id do usuário
    // Pode ser de um serviço de autenticação, ou de outra fonte
    return 1; // Exemplo: substitua isso pela lógica real
  }


  public removerItem(itemSelecionado: ItemCarrinho) {
    Swal.fire({
      title: 'Deseja realmente excluir esse item do carrinho?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.itemCarrinhoService.removerDoCarrinho(itemSelecionado.id).subscribe(
          resultado => {
            this.consultarTodosBrinquedosCarrinho(this.getUsuarioId());
          },
          erro => {
            Swal.fire('Erro!', 'Erro ao excluir item: ' + erro.error.mensagem, 'error');
          }
        );
      }
    });
  }

  private pesquisar(): void {
    const idUsuario = this.getUsuarioId();
    this.consultarTodosBrinquedosCarrinho(idUsuario);
  }
}
