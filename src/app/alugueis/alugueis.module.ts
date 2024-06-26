import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlugueisRoutingModule } from './alugueis-routing.module';
import { FormsModule } from '@angular/forms';
import { AluguelDetalheComponent } from './aluguel-detalhe/aluguel-detalhe.component';
import { AluguelListagemComponent } from './aluguel-listagem/aluguel-listagem.component';


@NgModule({
  declarations: [
    AluguelDetalheComponent,
    AluguelListagemComponent
  ],
  imports: [
    CommonModule,
    AlugueisRoutingModule,
    FormsModule
  ]
})
export class AlugueisModule { }
