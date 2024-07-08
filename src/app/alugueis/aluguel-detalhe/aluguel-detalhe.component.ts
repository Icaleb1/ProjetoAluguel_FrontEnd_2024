import { FretesServiceService } from './../../shared/service/frete/fretes-service.service';
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
import { Frete } from '../../shared/model/frete';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-aluguel-detalhe',
  templateUrl: './aluguel-detalhe.component.html',
  styleUrl: './aluguel-detalhe.component.scss'
})
export class AluguelDetalheComponent implements OnInit {

  frete: Frete = new Frete;
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
              private aluguelService: AlugueisService,
              private fretesServiceService: FretesServiceService,
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

    this.consultarEnderecosDeUsuario();

    this.carrinhosService.itensCarrinho$.subscribe(itensCarrinho => {
      if (itensCarrinho) {
        this.itensCarrinho = itensCarrinho;
      }
    });
  }

  public compareById(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  private consultarEnderecosDeUsuario(): void {
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
  public cadastrarEndereco(){
    this.router.navigate(['/home/enderecos/detalhe']);
  }

  private cadastrarFrete(): Observable<Frete> {
    this.frete.id_aluguel = this.idAluguel;
    return this.fretesServiceService.cadastrarFrete(this.frete);
  }

  public calcularFrete(): void {
    if (this.frete.distancia) {
      const valorGasolina = 5.58;
      this.frete.valor = this.frete.distancia * valorGasolina;
    } else {
      Swal.fire('Erro!', 'Informe a distância para calcular o frete.', 'error');
    }
  }

  public atualizarAluguel(): void {
    if (this.validarCampos()) {
      this.calcularFrete();

      this.cadastrarFrete().subscribe(
        (frete) => {
          this.frete = frete;

          // Após cadastrar o frete, atualiza o aluguel
          this.atualizarAluguelBackend();
        },
        (erro) => {
          Swal.fire('Erro ao cadastrar frete: ' + erro.error.mensagem, '', 'error');
        }
      );
    }
  }


  private atualizarAluguelBackend(): void {
    this.aluguelService.atualizar(this.aluguel).subscribe(
      (aluguelAtualizado) => {
        // Atualizar this.aluguel com os dados retornados do backend
        this.aluguel = aluguelAtualizado;

        // Calcula o valor total após atualizar o aluguel
        const valorTotal = this.calcularValorTotal();

        if (valorTotal !== undefined) {
          // Após atualizar o aluguel, exibe o valor total e confirmação
          Swal.fire({
            title: 'Aluguel atualizado com sucesso!',
            text: `Valor total: ${valorTotal}`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Finalizar Aluguel',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              // Chama o método para finalizar o aluguel
              this.executarFinalizacaoAluguel();
            }
          });
        } else {
          Swal.fire('Erro!', 'O valor total do aluguel não foi calculado corretamente.', 'error');
        }
      },
      (erro) => {
        Swal.fire('Erro ao atualizar aluguel: ' + erro.error.mensagem, '', 'error');
      }
    );
  }


  private executarFinalizacaoAluguel(): void {
    this.router.navigate(['/home/alugueis'])
    Swal.fire('Aluguel finalizado com sucesso!', '', 'success');
  }

 private finalizarAluguel(aluguel: Aluguel): Observable<any> {
    return this.aluguelService.finalizarAluguel(aluguel);
  }




  public validarCampos(): boolean {
    if (!this.aluguel.dataDevolucao || !this.aluguel.idEnderecoDeEntrega  || !this.frete.distancia) {
      Swal.fire('Erro!', 'Todos os campos devem ser preenchidos!', 'error');
      return false;
    }

    const hoje = new Date();
    const dataDevolucao = new Date(this.aluguel.dataDevolucao);
    const dataDevDefinitiva = new Date(this.aluguel.dataDevDefinitiva);

    if (dataDevolucao < hoje) {
      Swal.fire('Erro!', 'Data de devolução não pode ser menor que a data de hoje!', 'error');
      return false;
    }

    if (dataDevDefinitiva < hoje) {
      Swal.fire('Erro!', 'Data de devolução definitiva não pode ser menor que a data de hoje!', 'error');
      return false;
    }

    return true;
  }

  public removerItem(idItem: number): void {
    this.aluguelService.removerItem(this.idAluguel, idItem).subscribe(
      () => {
        Swal.fire('Item removido com sucesso!', '', 'success');
        this.consultarTodosPorIdAluguel();
      },
      (erro) => {
        Swal.fire('Erro ao remover item: ' + erro.error.mensagem, '', 'error');
      }
    );
  }

  calcularValorTotal(): number {
    let totalItens = 0;

    // Somar o valor diária de cada brinquedo em cada item do carrinho
    if (this.itens.length > 0) {
      totalItens = this.itens.reduce((acc, item) => {
        const valorDiaria = item.brinquedo.valorDiaria; // Assume-se que 'brinquedo' possui o atributo 'valorDiaria'
        return acc + valorDiaria;
      }, 0);
    }

    // Adicionar o valor do frete, se definido
    if (this.frete.valor) {
      return totalItens + this.frete.valor;
    } else {
      return totalItens;
    }
  }



  // finalizarAluguel(){
  //   this.cadastrarFrete();
  // }

}
