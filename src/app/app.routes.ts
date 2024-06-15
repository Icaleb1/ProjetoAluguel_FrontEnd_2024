import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'brinquedos',
    loadChildren: ()=>
      import('./brinquedos/brinquedos.module').then((m) => m.BrinquedosModule),

  }

];
