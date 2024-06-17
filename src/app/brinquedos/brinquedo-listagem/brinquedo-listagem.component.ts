import { ItemCarrinhosService } from './../../shared/service/item-carrinho/item-carrinhos.service';
import { BrinquedosService } from '../../shared/service/brinquedo/brinquedos.service';
import { Component, OnInit } from '@angular/core';
import { Brinquedo } from '../../shared/model/brinquedo';
import { ActivatedRoute, Router } from '@angular/router';
import { BrinquedoSeletor } from '../../shared/model/seletor/brinquedoSeletor';
import { CarrinhosService } from '../../shared/service/carrinho/carrinhos.service';
import { ItemCarrinho } from '../../shared/model/itemCarrinho';


@Component({
  selector: 'app-brinquedo-listagem',
  templateUrl: './brinquedo-listagem.component.html',
  styleUrl: './brinquedo-listagem.component.scss'
})
export class BrinquedoListagemComponent implements OnInit{

  public brinquedos: Array<Brinquedo> = new Array();
  public seletor: BrinquedoSeletor = new BrinquedoSeletor();

  constructor(private brinquedosService : BrinquedosService,
              private itemCarrinhosService : ItemCarrinhosService,
              private router: Router,
              private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.consultarTodosBrinquedos();

  }
  public limpar(){
    this.seletor = new BrinquedoSeletor();
  }

  private consultarTodosBrinquedos(){
    this.brinquedosService.listarTodos().subscribe(
      resultado => {
        this.brinquedos = resultado;
      },
      erro => {
        console.error('Erro ao consultar Brinquedos! ', erro);
      }
    );
  }

  public pesquisar(){
    this.brinquedosService.consultarComSeletor(this.seletor).subscribe(
      resultado => {
        this.brinquedos = resultado;
      },
      erro => {
        console.log('Erro ao buscar todas as pessoas ' + erro);
      }
    );
  }

  public adicionarItemAoCarrinho(brinquedo: Brinquedo): void {
    const itemCarrinho: ItemCarrinho = {
      id: 0, // o ID será gerado no backend
      idCarrinho: 1, // ajuste conforme necessário para obter o carrinho atual
      brinquedo: brinquedo,
      quantidade: 1
    };

    this.itemCarrinhosService.adicionarAoCarrinho(itemCarrinho).subscribe(
      resultado => {
        console.log('Item adicionado ao carrinho com sucesso', resultado);
      },
      erro => {
        console.error('Erro ao adicionar item ao carrinho', erro);
      }
    );
  }
}
