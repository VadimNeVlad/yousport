import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Observable } from 'rxjs';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn$ = new Observable<boolean>();
  user$ = new Observable<User | null>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn();

    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.authService.user$;
  }

  isLoggedIn(): void {
    this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
