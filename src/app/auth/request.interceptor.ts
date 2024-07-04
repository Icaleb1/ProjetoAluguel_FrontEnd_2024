import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginServiceService } from "../shared/service/login/login-service.service";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginServiceService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    if (typeof window !== 'undefined' && window.localStorage) {
      const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
      if (usuarioAutenticado) {
        const usuario = JSON.parse(usuarioAutenticado);
        authReq = req.clone({
          setHeaders: { idSessao: usuario.idSessao }
        });
      }
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.loginService.sair();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}

