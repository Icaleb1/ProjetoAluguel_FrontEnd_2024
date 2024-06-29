import { ItemCarrinhosService } from './../../shared/service/item-carrinho/item-carrinhos.service';
import { BrinquedosService } from '../../shared/service/brinquedo/brinquedos.service';
import { Component, OnInit } from '@angular/core';
import { Brinquedo } from '../../shared/model/brinquedo';
import { ActivatedRoute, Router } from '@angular/router';
import { BrinquedoSeletor } from '../../shared/model/seletor/brinquedoSeletor';
import { CarrinhosService } from '../../shared/service/carrinho/carrinhos.service';
import { ItemCarrinho } from '../../shared/model/itemCarrinho';
import Swal from 'sweetalert2';


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
    if(this.seletor.valorMinimo > this.seletor.valorMaximo){
      Swal.fire('Erro!', 'Valor minimo não pode ser maior que valor máximo!', 'error');
      return;
    }

    this.brinquedosService.consultarComSeletor(this.seletor).subscribe(
      resultado => {
        this.brinquedos = resultado;
      },
      erro => {
        console.log('Erro ao buscar todas os brinquedos ' + erro + '!');
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
        console.log('Item adicionado ao carrinho com sucesso!', resultado);
      },
      erro => {
        console.error('Erro ao adicionar item ao carrinho!', erro);
      }
    );
  }


  public editar(idBrinquedoSelecionado: number){
    this.router.navigate(['/brinquedos/cadastro/', idBrinquedoSelecionado])
  }


  public excluir(brinquedoSelecionado: Brinquedo){
    if (brinquedoSelecionado.quantEstoque > 0) {
      Swal.fire('Não é possível excluir!', 'Este brinquedo possuí itens em estoque e não pode ser excluído.', 'error');
      return;
    }

    Swal.fire({
      title: 'Deseja realmente excluir esse brinquedo?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.brinquedosService.excluirBrinquedo(brinquedoSelecionado.id).subscribe(
          resultado => {
            this.pesquisar();
          },
          erro => {
            Swal.fire('Erro!', 'Erro ao excluir brinquedo: ' + erro.error.mensagem, 'error');
          }
        );
      }
    });
  }

}
