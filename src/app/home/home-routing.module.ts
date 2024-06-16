import { EnderecosModule } from './../enderecos/enderecos.module';
  import { LoginModule } from './../login/login.module';
  import { HomeModule } from './home.module';
  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { HomeComponent } from './home/home.component';

  const routes: Routes = [
    { path: '', component: HomeComponent,

      // Chamadas de rotas filhas
      //Exemplo: http://localhost:4200/home/brinquedos
      //               /home: carrega o HomeModule
      //               '' (entre 'home' e 'cartas'): carrega o HomeComponent
      //               /cartas: carrega o CartasModule
      children: [
        {
          path: 'brinquedos',
          loadChildren:() => import('../brinquedos/brinquedos.module').then(m => m.BrinquedosModule)
        },
        {
          path: 'usuarios',
          loadChildren:() => import('../usuarios/usuarios.module').then(m => m.UsuariosModule)
        },
        {
          path: 'alugueis',
          loadChildren:() => import('../alugueis/alugueis.module').then(m => m.AlugueisModule)
        },
        {
          path: 'enderecos',
          loadChildren:() => import('../enderecos/enderecos.module').then(m => m.EnderecosModule)
        },
      ]
    },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { }
