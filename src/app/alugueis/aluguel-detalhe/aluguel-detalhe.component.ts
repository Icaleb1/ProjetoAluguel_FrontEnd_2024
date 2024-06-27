import { Endereco } from './../../shared/model/endereco';
import { Component, OnInit } from '@angular/core';
import { EnderecosService } from '../../shared/service/endereco/enderecos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluguel } from '../../shared/model/aluguel';
import { CarrinhosService } from '../../shared/service/carrinho/carrinhos.service';
import { Carrinho } from '../../shared/model/carrinho';
import { ItemCarrinho } from '../../shared/model/itemCarrinho';

@Component({
  selector: 'app-aluguel-detalhe',
  templateUrl: './aluguel-detalhe.component.html',
  styleUrl: './aluguel-detalhe.component.scss'
})
export class AluguelDetalheComponent implements OnInit {

  enderecos: Array<Endereco> = new Array();
  endereco: Endereco = new Endereco;
  aluguel: Aluguel = new Aluguel;
  itensCarrinho: Array<ItemCarrinho> = [];

  constructor(private enderecoService: EnderecosService,
              private router: Router,
              private route: ActivatedRoute,
              private carrinhosService: CarrinhosService
  ) { }


  ngOnInit(): void {
    const idUsuario = this.getUsuarioId();

    this.consultarEnderecosDeUsuario(idUsuario);

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
    this.enderecoService.consultarEnderecosPorIdUsuario(idUsuario).subscribe(
      resultado => {
        this.enderecos = resultado;
      },
      erro => {
        console.error('Erro ao consultar Endereços! ', erro);
      }
    );
  }

  private getUsuarioId(): number {
    // Implemente a lógica para obter o id do usuário
    // Pode ser de um serviço de autenticação, ou de outra fonte
    return 1; // Exemplo: substitua isso pela lógica real
  }
}
