import { BrinquedosService } from '../../shared/service/brinquedo/brinquedos.service';
import { Component, OnInit } from '@angular/core';
import { Brinquedo } from '../../shared/model/brinquedo';
import { ActivatedRoute, Router } from '@angular/router';
import { BrinquedoSeletor } from '../../shared/model/seletor/brinquedoSeletor';


@Component({
  selector: 'app-brinquedo-listagem',
  templateUrl: './brinquedo-listagem.component.html',
  styleUrl: './brinquedo-listagem.component.scss'
})
export class BrinquedoListagemComponent implements OnInit{

  public brinquedos: Array<Brinquedo> = new Array();
  public seletor: BrinquedoSeletor = new BrinquedoSeletor();

  constructor(private brinquedosService : BrinquedosService,
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

}
