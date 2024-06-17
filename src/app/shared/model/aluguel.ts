import { Endereco } from './endereco';
import { Frete } from './frete';
import { Item } from './item';
import { Usuario } from './usuario';
export class  Aluguel{

    id: number;
    usuario: Usuario;
    itens: Array<Item>;
    dataAluguel: Date;
    dataDevolucao: Date;
    dataDevDefinitiva: Date;
    valoresAdicionais: number;
    valorTotal: number;
    idEnderecoDeEntrega: number;
  }
