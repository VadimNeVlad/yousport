import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment/environment';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Workout } from '../models/workout';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  private _baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this._baseUrl}/workouts`).pipe(
      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.error.message);
        return throwError(() => e);
      })
    );
  }

  getWorkout(workoutId: string): Observable<Workout> {
    return this.http
      .get<Workout>(`${this._baseUrl}/workouts/${workoutId}`)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.error.message);
          return throwError(() => e);
        })
      );
  }

  addWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this._baseUrl}/workouts`, workout).pipe(
      tap(() => {
        this.toastr.success('Workout added successfully');
        this.router.navigateByUrl('/workouts');
      }),

      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.error.message);
        return throwError(() => e);
      })
    );
  }

  updateWorkout(workout: Workout): Observable<Workout> {
    return this.http
      .put<Workout>(`${this._baseUrl}/workouts/${workout.id}`, workout)
      .pipe(
        tap(() => {
          this.toastr.success('Workout changed successfully');
          this.router.navigateByUrl('/workouts');
        }),

        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.error.message);
          return throwError(() => e);
        })
      );
  }

  deleteWorkout(workoutId: string): Observable<void> {
    return this.http
      .delete<void>(`${this._baseUrl}/workouts/${workoutId}`)
      .pipe(
        tap(() => {
          this.toastr.success(`Workout deleted successfully`);
          this.router.navigateByUrl('/workouts');
        }),

        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.error.message);
          return throwError(() => e);
        })
      );
  }
}
