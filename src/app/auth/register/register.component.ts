import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ScheduleService } from 'src/app/shared/services/schedule.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private scheduleService: ScheduleService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  registerUser(event: FormGroup): void {
    this.authService
      .register(event.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }
}
