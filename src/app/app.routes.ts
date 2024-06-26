import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'brinquedos',
    loadChildren: ()=>
      import('./brinquedos/brinquedos.module').then((m) => m.BrinquedosModule),
  },
  {
    path: 'alugueis',
    loadChildren: ()=>
      import('./alugueis/alugueis.module').then((m) => m.AlugueisModule),
  }
];
