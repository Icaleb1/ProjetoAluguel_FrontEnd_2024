import { ItemCarrinhosService } from './../../shared/service/item-carrinho/item-carrinhos.service';
import { BrinquedosService } from '../../shared/service/brinquedo/brinquedos.service';
import { Component, OnInit } from '@angular/core';
import { Brinquedo } from '../../shared/model/brinquedo';
import { ActivatedRoute, Router } from '@angular/router';
import { BrinquedoSeletor } from '../../shared/model/seletor/brinquedoSeletor';
import { CarrinhosService } from '../../shared/service/carrinho/carrinhos.service';
import { ItemCarrinho } from '../../shared/model/itemCarrinho';
import Swal from 'sweetalert2';
import { Carrinho } from '../../shared/model/carrinho';
import { Usuario } from '../../shared/model/usuario';
import { CarrinhoEventService } from '../../shared/service/carrinho-event.service';
import { ItemServiceService } from '../../shared/service/item/item.service.service';
import { Item } from '../../shared/model/item';


@Component({
  selector: 'app-brinquedo-listagem',
  templateUrl: './brinquedo-listagem.component.html',
  styleUrl: './brinquedo-listagem.component.scss'
})

export class BrinquedoListagemComponent implements OnInit{


  public usuarioAutenticado: Usuario;
  public ehAdministrador: boolean = false;
  public brinquedos: Array<Brinquedo> = new Array();
  public seletor: BrinquedoSeletor = new BrinquedoSeletor();
  idCarrinho: number;
  carrinho: Carrinho;

  constructor(private brinquedosService : BrinquedosService,
              private itemCarrinhosService : ItemCarrinhosService,
              private router: Router,
              private route: ActivatedRoute,
              private carrinhoService: CarrinhosService,
              private carrinhoEventService: CarrinhoEventService,
              private itemService: ItemServiceService,
  ){}

  ngOnInit(): void {
    
    const usuarioNoStorage = localStorage.getItem('usuarioAutenticado');

    if (usuarioNoStorage) {
      this.usuarioAutenticado = JSON.parse(usuarioNoStorage);
      this.ehAdministrador = this.usuarioAutenticado.administrador;
    } else {
      console.error('Nenhum usuário autenticado encontrado no armazenamento local');
    }



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
    if (brinquedo.estoqueDisponivel < 1) {
      Swal.fire('Não é possível alugar!', 'Este brinquedo não possuí itens dísponivel em estoque.', 'error');
      return;
    }

    this.carrinhoService.consultarCarrinhoPorIdUsuario(this.usuarioAutenticado.id).subscribe(
      carrinho => {
        const itemCarrinho: ItemCarrinho = {
          id: 0, // o ID será gerado no backend
          idCarrinho: carrinho.id, // Obtemos o idCarrinho do carrinho do usuário
          brinquedo: brinquedo,
          quantidade: 1
        };

        this.itemCarrinhosService.adicionarAoCarrinho(itemCarrinho).subscribe(
          resultado => {
            console.log('Item adicionado ao carrinho com sucesso!', resultado);
            this.carrinhoEventService.emitirItemAdicionado();
          },
          erro => {
            console.error('Erro ao adicionar item ao carrinho!', erro);
          }
        );
      },
      erro => {
        console.error('Erro ao obter o carrinho do usuário!', erro);
      }
    );
  }


  public editar(idBrinquedoSelecionado: number){
    this.router.navigate(['/home/brinquedos/cadastro/', idBrinquedoSelecionado])
  }


  public excluir(brinquedoSelecionado: Brinquedo){
    if (brinquedoSelecionado.estoqueTotal > 0) {
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

  public criarItem(brinquedo: Brinquedo): void {
    const novoItem: Item = {
      id: 0, // O ID será gerado no backend
      id_aluguel: 0, // Defina o ID do aluguel, se aplicável
      brinquedo: brinquedo,
      disponivel: true
    };

    this.itemService.criarItem(novoItem).subscribe(
      resultado => {
        console.log('Item adicionado com sucesso!', resultado);
        Swal.fire('Sucesso!', 'Item adicionado com sucesso!', 'success');
        this.consultarTodosBrinquedos();
      },
      erro => {
        console.error('Erro ao adicionar Item!', erro);
        Swal.fire('Erro!', 'Erro ao adicionar Item: ' + erro.message, 'error');
      }
    );

  }
}
