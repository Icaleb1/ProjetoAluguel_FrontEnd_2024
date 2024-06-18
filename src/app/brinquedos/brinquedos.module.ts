import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrinquedosRoutingModule } from './brinquedos-routing.module';
import { BrinquedoListagemComponent } from './brinquedo-listagem/brinquedo-listagem.component';
import { FormsModule } from '@angular/forms';
import { BrinquedoCadastroComponent } from './brinquedo-cadastro/brinquedo-cadastro.component';


@NgModule({
  declarations: [
    BrinquedoListagemComponent,
    BrinquedoCadastroComponent
  ],
  imports: [
    CommonModule,
    BrinquedosRoutingModule,
    FormsModule
  ]
})
export class BrinquedosModule { }
