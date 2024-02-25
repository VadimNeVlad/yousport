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

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getSchedule(): Observable<Schedule> {
    return this.http.get<Schedule>(`${this._baseUrl}/schedule`).pipe(
      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.error.message);
        return throwError(() => e);
      })
    );
  }

  updateSchedule(scheduleItem: any): Observable<ScheduleItem> {
    const updatedSchedule: Schedule = {
      ...scheduleItem,
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
}
