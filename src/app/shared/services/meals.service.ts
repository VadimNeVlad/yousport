import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Meal } from '../models/meal';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  private _baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  getMeals(): Observable<Meal[]> {
    return this.http
      .get<Meal[]>(`${this._baseUrl}/meals/?uid=${this.uid}`)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.message);
          return throwError(() => e);
        })
      );
  }

  getMeal(mealId: string): Observable<Meal> {
    return this.http.get<Meal>(`${this._baseUrl}/meals/${mealId}`).pipe(
      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.message);
        return throwError(() => e);
      })
    );
  }

  addMeal(meal: Meal): Observable<Meal> {
    const updatedMeal: Meal = {
      ...meal,
      uid: this.uid,
      timestamp: Date.now(),
    };

    return this.http.post<Meal>(`${this._baseUrl}/meals`, updatedMeal).pipe(
      map((meal: Meal) => {
        this.toastr.success('Meal added successfully');
        this.router.navigateByUrl('/meals');
        return meal;
      }),

      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.message);
        return throwError(() => e);
      })
    );
  }

  deleteMeal(mealId: number): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/meals/${mealId}`).pipe(
      map(() => {
        this.router.navigateByUrl('/meals');
        this.toastr.success('Meal deleted successfully');
      }),

      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.message);
        return throwError(() => e);
      })
    );
  }

  updateMeal(meal: Meal): Observable<Meal> {
    return this.http
      .patch<Meal>(`${this._baseUrl}/meals/${meal.id}`, meal)
      .pipe(
        map((meal: Meal) => {
          this.router.navigateByUrl('/meals');
          this.toastr.success('Meal changed successfully');
          return meal;
        }),

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
