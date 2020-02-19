import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';


const CUR_USER = "currentUser";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    public http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    let store = localStorage.getItem(CUR_USER);
    if (store) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(store));
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(new User());
    }
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(info) {
    return this.http.post<any>('api/Token/Authenticate', info)
      .pipe(map(user => {
        if (user) {
          localStorage.setItem(CUR_USER, JSON.stringify(user));
          let dateNow = new Date();
          dateNow.setTime(dateNow.getTime() + (60 * 60 * 1000));
          this.cookieService.set(
            CUR_USER,
            user.sessionId,
            dateNow,                    // keep the cookie info of 1 hour.
            "/",
            "",
            environment.SESSION_SECURE,    // this needs to be set to true for live production,
          )    
          this.currentUserSubject.next(user);
        }
        return user;
      }))
  }

  logout() {
    const user = JSON.parse(localStorage.getItem(CUR_USER));
    this.http.post('api/Token/Logout', {sessionId: user.sessionId, refreshToken: user.tokens.refreshToken}).subscribe(
      (res)=>{
        localStorage.removeItem(CUR_USER);
        this.cookieService.delete(CUR_USER);
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
      },
      (err)=>{
        localStorage.removeItem(CUR_USER);
        this.cookieService.delete(CUR_USER);
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
      })
  }

  get isLoggedIn(): boolean {
    return this.cookieService.get(CUR_USER) ? true : false;
  }
  get userId() {
    const user = JSON.parse(localStorage.getItem(CUR_USER));
    return (user && user.id) ? user.id : '';
  }
  get getSessionId() {
    return this.cookieService.get(CUR_USER);
  }
}
