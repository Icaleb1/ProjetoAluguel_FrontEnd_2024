import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnderecosRoutingModule } from './enderecos-routing.module';
import { EnderecoDetalheComponent } from './endereco-detalhe/endereco-detalhe.component';
import { EnderecoListagemComponent } from './endereco-listagem/endereco-listagem.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EnderecoDetalheComponent,
    EnderecoListagemComponent
  ],
  imports: [
    CommonModule,
    EnderecosRoutingModule,
    FormsModule,
  ]
})
export class EnderecosModule { }
