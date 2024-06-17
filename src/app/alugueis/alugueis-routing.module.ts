import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AluguelDetalheComponent } from './aluguel-detalhe/aluguel-detalhe.component';
import { AluguelListagemComponent } from './aluguel-listagem/aluguel-listagem.component';

const routes: Routes = [
  {path: '', component: AluguelListagemComponent},
  {path: 'alugar/:id', component: AluguelDetalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlugueisRoutingModule { }
