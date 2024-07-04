import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AluguelDetalheComponent } from './aluguel-detalhe/aluguel-detalhe.component';

const routes: Routes = [
  {path: 'alugar/:id', component: AluguelDetalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlugueisRoutingModule { }
