import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FretesRoutingModule } from './fretes-routing.module';
import { FreteDetalheComponent } from './frete-detalhe/frete-detalhe.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FreteDetalheComponent,
  ],
  imports: [
    CommonModule,
    FretesRoutingModule,
    FormsModule,
  ]
})
export class FretesModule { }
