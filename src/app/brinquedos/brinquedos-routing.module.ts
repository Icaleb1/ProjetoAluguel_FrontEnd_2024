import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrinquedoListagemComponent } from './brinquedo-listagem/brinquedo-listagem.component';

const routes: Routes = [
  {path: "", component: BrinquedoListagemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrinquedosRoutingModule { }
