import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { Router } from '@angular/router';
import { Carrinho } from '../../shared/model/carrinho';
import Swal from 'sweetalert2';
import { ItemCarrinho } from '../../shared/model/itemCarrinho';
import { CarrinhosService } from '../../shared/service/carrinho/carrinhos.service';
import { ItemCarrinhosService } from '../../shared/service/item-carrinho/item-carrinhos.service';

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

  constructor(private router: Router,
             private carrinhoService: CarrinhosService,
             private itemCarrinhoService: ItemCarrinhosService,

  ) { }

  ngOnInit(): void {
    let usuarioNoStorage = localStorage.getItem('usuarioAutenticado');

    if(usuarioNoStorage){
      this.usuarioAutenticado = JSON.parse(usuarioNoStorage);
      this.ehAdministrador = this.usuarioAutenticado?.administrador == true;

      if(this.ehAdministrador){
        this.router.navigate(['/home/brinquedos']);

      }
    } else {
      this.router.navigate(['/login']);
    }

    //const idUsuario = this.getUsuarioId(); // ajuste para obter o idUsuario de forma adequada
    //this.consultarTodosBrinquedosCarrinho(idUsuario);
  }

  logout(){
    localStorage.removeItem('usuarioAutenticado');
    this.router.navigate(['/login']);
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
      title: 'Deseja realmente remover esse item do carrinho?',
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

  public confirmar(){
    this.carrinhoService.setItensCarrinho(this.itens)
    this.router.navigate(['/alugueis/alugar']);
  }


}
