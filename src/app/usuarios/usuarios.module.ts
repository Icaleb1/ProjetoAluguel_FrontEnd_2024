import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RequestInterceptor } from '../auth/request.interceptor';


@NgModule({
  declarations: [
    UsuarioDetalheComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [

  ],
})
export class UsuariosModule { }
