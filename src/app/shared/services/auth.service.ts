import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthData, AuthResponse } from '../models/auth';
import { Observable, catchError, map, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = environment.apiUrl;
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private tostr: ToastrService,
    private router: Router
  ) {}

  register(registerData: AuthData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this._baseUrl}/register`, registerData)
      .pipe(
        map((authData: AuthResponse) => {
          this.tostr.success('Registration completed successfully');
          this.router.navigateByUrl('/');
          return authData;
        }),

        catchError((e: HttpErrorResponse) => {
          this.tostr.error(e.message);
          return throwError(() => e);
        })
      );
  }

  login(loginData: AuthData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this._baseUrl}/login`, loginData)
      .pipe(
        map((authData: AuthResponse) => {
          localStorage.setItem('token', authData.accessToken);
          this.isLoggedIn$.next(true);
          return authData;
        }),

        catchError((e: HttpErrorResponse) => {
          this.tostr.error('Incorrect email or password');
          return throwError(() => e);
        })
      );
  }

  isLoggedIn(): boolean {
    this.isLoggedIn$.next(!!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
