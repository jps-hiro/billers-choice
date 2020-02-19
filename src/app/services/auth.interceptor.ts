import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let reqUrl = environment.baseUrl;
    if(this.authService.isLoggedIn) {
      req = req.clone({
        headers: req.headers.set(
          "Authorization",
          "Bearer " + JSON.parse(localStorage.getItem('currentUser')).tokens.jwt
        ),
        url: reqUrl + req.url
      });
    }
    return next.handle(req);
  }
}