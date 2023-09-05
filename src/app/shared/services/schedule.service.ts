import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Schedule, ScheduleItem } from '../models/schedule';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private _baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  getSchedule(): Observable<Schedule[]> {
    return this.http
      .get<Schedule[]>(`${this._baseUrl}/schedules?uid=${this.uid}`)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.message);
          return throwError(() => e);
        })
      );
  }

  updateSchedule(scheduleItem: any): Observable<ScheduleItem> {
    const updatedSchedule: Schedule = {
      ...scheduleItem,
      uid: this.uid,
    };

    return this.http
      .patch<ScheduleItem>(
        `${this._baseUrl}/schedules/${updatedSchedule.id}`,
        updatedSchedule
      )
      .pipe(
        map((meal: ScheduleItem) => {
          this.toastr.success('Schedule changed successfully');
          return meal;
        }),

        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.message);
          return throwError(() => e);
        })
      );
  }

  createNewUserSchedule(uid: number): Observable<Schedule> {
    const newUserSchedule: Schedule = {
      uid,
      assignments: [
        {
          day: 'Monday',
          meals: [],
          workouts: [],
          key: 0,
        },
        {
          day: 'Tuesday',
          meals: [],
          workouts: [],
          key: 1,
        },
        {
          day: 'Wednesday',
          meals: [],
          workouts: [],
          key: 2,
        },
        {
          day: 'Thursday',
          meals: [],
          workouts: [],
          key: 3,
        },
        {
          day: 'Friday',
          meals: [],
          workouts: [],
          key: 4,
        },
        {
          day: 'Saturday',
          meals: [],
          workouts: [],
          key: 5,
        },
        {
          day: 'Sunday',
          meals: [],
          workouts: [],
          key: 6,
        },
      ],
    };

    return this.http
      .post<Schedule>(`${this._baseUrl}/schedules`, newUserSchedule)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.message);
          return throwError(() => e);
        })
      );
  }

  private get uid(): number {
    return this.authService.user$.value?.id!;
  }
}
