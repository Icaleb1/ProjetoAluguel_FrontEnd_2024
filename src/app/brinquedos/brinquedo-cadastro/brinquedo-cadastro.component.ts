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

  constructor(private brinquedoService: BrinquedosService,
    private router:Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

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


voltar() {
  this.router.navigate(['/brinquedos']);
}



}

