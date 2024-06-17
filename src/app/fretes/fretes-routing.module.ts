import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreteDetalheComponent } from './frete-detalhe/frete-detalhe.component';

const routes: Routes = [
  {path: 'detalhe', component: FreteDetalheComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FretesRoutingModule { }
