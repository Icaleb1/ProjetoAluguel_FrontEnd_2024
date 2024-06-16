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
export class AppComponent implements OnInit{


  itens: any[]; // ajuste o tipo conforme necessário

  constructor(private carrinhoService: CarrinhosService) { }

  ngOnInit(): void {
    const idUsuario = this.getUsuarioId(); // ajuste para obter o idUsuario de forma adequada
    this.consultarTodosBrinquedosCarrinho(idUsuario);
  }

  private consultarTodosBrinquedosCarrinho(idUsuario: number): void {
    this.carrinhoService.consultarCarrinhoPorIdUsuario(idUsuario).subscribe(
      resultado => {
        this.itens = resultado.itens; // ajuste se necessário
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

  
  title = 'ProjetoAluguel_FrontEnd_2024';

  sidebarWidth: number = 250;

  toggleSidebar() {
    this.sidebarWidth = this.sidebarWidth === 150 ? 0 : 2500; // Alternar entre 0 (retrair) e 250 (expandir)
  }


}
