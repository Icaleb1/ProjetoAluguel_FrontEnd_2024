import { Component, OnInit } from '@angular/core';
import { Frete } from '../../shared/model/frete';

@Component({
  selector: 'app-frete-detalhe',
  templateUrl: './frete-detalhe.component.html',
  styleUrl: './frete-detalhe.component.scss'
})
export class FreteDetalheComponent implements OnInit {


  public frete: Frete = new Frete();
  public idBrinquedo: number;

  constructor(){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }





}
