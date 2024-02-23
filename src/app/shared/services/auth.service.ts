import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthData, AuthResponse } from '../models/auth';
import { Observable, catchError, map, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = environment.apiUrl;

  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  register(registerData: AuthData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this._baseUrl}/auth/register`, registerData)
      .pipe(
        map((authData: AuthResponse) => {
          this.toastr.success('Registration completed successfully');
          this.setCredentials(authData);
          this.router.navigateByUrl('/schedule');
          return authData;
        }),

        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.error.message);
          return throwError(() => e.error.message);
        })
      );
  }

  login(loginData: AuthData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this._baseUrl}/auth/login`, loginData)
      .pipe(
        map((authData: AuthResponse) => {
          this.setCredentials(authData);
          this.router.navigateByUrl('/schedule');
          return authData;
        }),

        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.error.message);
          return throwError(() => e.error.message);
        })
      );
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);

    this.isLoggedIn$.next(!!localStorage.getItem('token'));
    this.user$.next(user);

    return !!localStorage.getItem('token');
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

  private setCredentials(authData: AuthResponse): void {
    localStorage.setItem('token', authData.accessToken);
    localStorage.setItem('user', JSON.stringify(authData.user));

    this.isLoggedIn$.next(true);
    this.user$.next(authData.user);
  }
}
