import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrinquedoListagemComponent } from './brinquedo-listagem/brinquedo-listagem.component';
import { BrinquedoCadastroComponent } from './brinquedo-cadastro/brinquedo-cadastro.component';

const routes: Routes = [
  {path: "", component: BrinquedoListagemComponent},
  {path: "cadastro", component: BrinquedoCadastroComponent},
  { path: 'cadastro/:id', component: BrinquedoCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrinquedosRoutingModule { }
