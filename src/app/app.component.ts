import { Carrinho } from './shared/model/carrinho';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CarrinhosService } from './shared/service/carrinho/carrinhos.service';
import { ItemCarrinho } from './shared/model/itemCarrinho';

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

  constructor(private carrinhoService: CarrinhosService) { }

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
    return 12; // Exemplo: substitua isso pela lógica real
  }
}
