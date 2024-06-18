import { AlugueisService } from './../../shared/service/aluguel/alugueis.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/model/item';
import { Usuario } from '../../shared/model/usuario';
import { ItemCarrinho } from '../../shared/model/itemCarrinho';
import { Aluguel } from '../../shared/model/aluguel';
import { Endereco } from '../../shared/model/endereco';
import { Frete } from '../../shared/model/frete';
import { EnderecosService } from '../../shared/service/endereco/enderecos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhosService } from '../../shared/service/carrinho/carrinhos.service';
import { ItemServiceService } from '../../shared/service/item/item.service.service';
import { FretesServiceService } from '../../shared/service/frete/fretes-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aluguel-listagem',
  templateUrl: './aluguel-listagem.component.html',
  styleUrl: './aluguel-listagem.component.scss'
})
export class AluguelListagemComponent implements OnInit{
  frete: Frete = new Frete;
  idAluguel: number;
  enderecos: Array<Endereco> = new Array();
  endereco: Endereco = new Endereco;
  aluguel: Aluguel = new Aluguel;
  itensCarrinho: Array<ItemCarrinho> = [];
  usuarioAutenticado: Usuario;
  ehAdministrador: boolean;
  public alugueis: Array<Aluguel> = new Array();


  constructor(private enderecoService: EnderecosService,
    private router: Router,
    private route: ActivatedRoute,
    private carrinhosService: CarrinhosService,
    private itemService: ItemServiceService,
    private aluguelService: AlugueisService,
    private fretesServiceService: FretesServiceService,
) { }
  ngOnInit(): void {
    const usuarioNoStorage = localStorage.getItem('usuarioAutenticado');

    if (usuarioNoStorage) {
      this.usuarioAutenticado = JSON.parse(usuarioNoStorage);
    } else {
      Swal.fire('Nenhum usuário autenticado encontrado no armazenamento local', 'error')
    }

    this.consultarTodosAlugueis();
  }

  private consultarTodosAlugueis(){
    this.aluguelService.consultarPorIdUsuario(this.usuarioAutenticado.id).subscribe(
      resultado => {
        this.alugueis = resultado;
      },
      erro => {
        Swal.fire('Erro ao consultar Brinquedos! ', 'error')

      }
    );
  }

  public devolver(idAluguel: number) {
    this.aluguelService.devolucao(idAluguel).subscribe(
      resultado => {
        Swal.fire('Aluguel devolvido com sucesso! ', '', 'success')
        // Aqui você pode atualizar a lista de aluguéis após a devolução, se necessário
        this.consultarTodosAlugueis();
      },
      erro => {
        Swal.fire('Erro ao devolver Aluguel! ', 'error')
      }
    );
  }

  public voltar(){
    this.router.navigate(['/home/alugueis'])
  }
}
