import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Schedule } from '../models/schedule';
import { Assignment } from '../models/assignment';

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

  updateSchedule(scheduleItem: any): Observable<Partial<Assignment>> {
    return this.http
      .put<Partial<Assignment>>(`${this._baseUrl}/schedule`, scheduleItem)
      .pipe(
        tap(() => {
          this.toastr.success('Schedule changed successfully');
        }),

        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.message);
          return throwError(() => e);
        })
      );
  }
}
