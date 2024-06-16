import { Usuario } from './../../shared/model/usuario';
import { Endereco } from './../../shared/model/endereco';
import { Component, OnInit } from '@angular/core';
import { EnderecosService } from '../../shared/service/endereco/enderecos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluguel } from '../../shared/model/aluguel';
import { CarrinhosService } from '../../shared/service/carrinho/carrinhos.service';
import { Carrinho } from '../../shared/model/carrinho';
import { ItemCarrinho } from '../../shared/model/itemCarrinho';
import { ItemServiceService } from '../../shared/service/item/item.service.service';
import { Item } from '../../shared/model/item';
import { AlugueisService } from '../../shared/service/aluguel/alugueis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aluguel-detalhe',
  templateUrl: './aluguel-detalhe.component.html',
  styleUrl: './aluguel-detalhe.component.scss'
})
export class AluguelDetalheComponent implements OnInit {

  idAluguel: number;
  enderecos: Array<Endereco> = new Array();
  endereco: Endereco = new Endereco;
  aluguel: Aluguel = new Aluguel;
  itensCarrinho: Array<ItemCarrinho> = [];
  usuarioAutenticado: Usuario;
  ehAdministrador: boolean;
  itens: Array<Item> = new Array();

  constructor(private enderecoService: EnderecosService,
              private router: Router,
              private route: ActivatedRoute,
              private carrinhosService: CarrinhosService,
              private itemService: ItemServiceService,
              private aluguelService: AlugueisService
  ) { }


  ngOnInit(): void {

    const usuarioNoStorage = localStorage.getItem('usuarioAutenticado');

    if (usuarioNoStorage) {
      this.usuarioAutenticado = JSON.parse(usuarioNoStorage);
    } else {
      console.error('Nenhum usuário autenticado encontrado no armazenamento local');
    }

    this.route.params.subscribe((params) => {
      this.idAluguel = params['id'];
      if(this.idAluguel){
        this.buscarAluguel();
      }

      this.consultarTodosPorIdAluguel();
    });

    this.consultarEnderecosDeUsuario(this.usuarioAutenticado.id);

    this.carrinhosService.itensCarrinho$.subscribe(itensCarrinho => {
      if (itensCarrinho) {
        this.itensCarrinho = itensCarrinho;
      }
    });
  }

  public compareById(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  private consultarEnderecosDeUsuario(idUsuario: number): void {
    this.enderecoService.consultarEnderecosPorIdUsuario(this.usuarioAutenticado.id).subscribe(
      resultado => {
        this.enderecos = resultado;
      },
      erro => {
        console.error('Erro ao consultar Endereços! ', erro);
      }
    );
  }

  private consultarTodosPorIdAluguel(){
    this.itemService.consultarTodosPorIdAluguel(this.idAluguel).subscribe(
      resultado => {
        this.itens = resultado;
      },
      erro => {
        console.error('Erro ao consultar Brinquedos! ', erro);
      }
    );
  }

  public buscarAluguel(): void{
    this.aluguelService.consultarPorId(this.idAluguel).subscribe(
      (brinquedo) => {
        this.aluguel = brinquedo;
        this.consultarTodosPorIdAluguel();
      },
      (erro) => {
        Swal.fire('Erro ao buscar brinquedo ', erro, 'error');
      }
    );
  }


}
