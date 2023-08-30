import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment/environment';
import { AuthService } from './auth.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Workout } from '../models/workout';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  private _baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this._baseUrl}/workouts`).pipe(
      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.message);
        return throwError(() => e);
      })
    );
  }

  getWorkout(workoutId: string): Observable<Workout> {
    return this.http
      .get<Workout>(`${this._baseUrl}/workouts/${workoutId}`)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.message);
          return throwError(() => e);
        })
      );
  }

  addWorkout(workout: Workout): Observable<Workout> {
    const updatedWorkout: Workout = {
      ...workout,
      uid: this.authService.user$.value?.id,
      timestamp: Date.now(),
    };

    return this.http
      .post<Workout>(`${this._baseUrl}/workouts`, updatedWorkout)
      .pipe(
        map((workout: Workout) => {
          this.toastr.success('Workout added successfully');
          this.router.navigateByUrl('/workouts');
          return workout;
        }),

        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.message);
          return throwError(() => e);
        })
      );
  }

  updateWorkout(workout: Workout): Observable<Workout> {
    return this.http
      .patch<Workout>(`${this._baseUrl}/workouts/${workout.id}`, workout)
      .pipe(
        map((workout: Workout) => {
          this.toastr.success('Workout changed successfully');
          this.router.navigateByUrl('/workouts');
          return workout;
        }),

        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.message);
          return throwError(() => e);
        })
      );
  }

  deleteWorkout(workoutId: number): Observable<void> {
    return this.http
      .delete<void>(`${this._baseUrl}/workouts/${workoutId}`)
      .pipe(
        map(() => {
          this.toastr.success(`Workout deleted successfully`);
          this.router.navigateByUrl('/workouts');
        }),

        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.message);
          return throwError(() => e);
        })
      );
  }
}
