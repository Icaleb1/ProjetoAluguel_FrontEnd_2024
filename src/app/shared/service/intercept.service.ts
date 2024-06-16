import { intercept } from './intercept.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const intercept: HttpInterceptorFn = (req, next) => {

    try {
      let authReq = req;

      if (typeof window !== 'undefined' && window.localStorage) {
        const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
        if (usuarioAutenticado) {
          const usuario = JSON.parse(usuarioAutenticado);
          authReq = req.clone({
            setHeaders: { idSessao: usuario.idSessao }
          });
          return next(authReq);
        }else{
          return next(req);
        }
      }
    } catch (error) {
        console.error('Error in interceptor:', error);
        return next(req);
    }
};
