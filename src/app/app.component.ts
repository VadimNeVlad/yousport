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
  user$ = new Observable<User | null>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

  logout(): void {
    this.authService.logout();
  }
}
