import { ActivatedRoute, Router } from '@angular/router';
import { BrinquedosService } from '../../shared/service/brinquedo/brinquedos.service';
import { Brinquedo } from './../../shared/model/brinquedo';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brinquedo-cadastro',
  templateUrl: './brinquedo-cadastro.component.html',
  styleUrl: './brinquedo-cadastro.component.scss'
})
export class BrinquedoCadastroComponent implements OnInit{

  public brinquedo: Brinquedo = new Brinquedo();
  public idBrinquedo: number;

  constructor(private brinquedoService: BrinquedosService,
    private router:Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idBrinquedo = params['id'];
      if(this.idBrinquedo){
        this.buscarBrinquedo();
      }
    });

  }


  public buscarBrinquedo(): void{
    this.brinquedoService.consultarPorId(this.idBrinquedo).subscribe(
      (brinquedo) => {
        this.brinquedo = brinquedo;
      },
      (erro) => {
        Swal.fire('Erro ao buscar brinquedo ', erro, 'error');
      }
    );
  }


  public salvar(): void{
    if(this.idBrinquedo){
      this.atualizarBrinquedo();
    }else{
      this.cadastrarBrinquedo();
    }
  }

  public cadastrarBrinquedo(){
    this.brinquedoService.cadastrarBrinquedo(this.brinquedo).subscribe(
    (resposta) => {
      Swal.fire('Brinquedo cadastrado com sucesso!', '', 'success'); this.voltar();
    },
    (erro) => {
      Swal.fire('Erro ao salvar o Brinquedo!', erro, 'error');
    }
  );
}

public atualizarBrinquedo(){
  this.brinquedoService.atualizar(this.brinquedo).subscribe(
    (resposta) => {
      Swal.fire('Brinquedo editado com sucesso!', '', 'success');
      this.voltar();
    },
    (erro) => {
      Swal.fire('Erro ao editar brinquedo: ' + erro.error.mensagem, 'error');
    }
  );
}

voltar() {
  this.router.navigate(['/brinquedos']);
}



}

