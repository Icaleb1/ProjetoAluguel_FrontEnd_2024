import { Component } from '@angular/core';
import { Item } from '../../shared/model/item';
import { Usuario } from '../../shared/model/usuario';
import { ItemCarrinho } from '../../shared/model/itemCarrinho';
import { Aluguel } from '../../shared/model/aluguel';
import { Endereco } from '../../shared/model/endereco';
import { Frete } from '../../shared/model/frete';

@Component({
  selector: 'app-aluguel-listagem',
  templateUrl: './aluguel-listagem.component.html',
  styleUrl: './aluguel-listagem.component.scss'
})
export class AluguelListagemComponent {
  frete: Frete = new Frete;
  idAluguel: number;
  enderecos: Array<Endereco> = new Array();
  endereco: Endereco = new Endereco;
  aluguel: Aluguel = new Aluguel;
  itensCarrinho: Array<ItemCarrinho> = [];
  usuarioAutenticado: Usuario;
  ehAdministrador: boolean;
  alugueis: Array<Aluguel> = new Array();
}
