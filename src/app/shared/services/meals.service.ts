import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Meal } from '../models/meal';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  private _baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this._baseUrl}/meals`).pipe(
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
    return this.http.post<Meal>(`${this._baseUrl}/meals`, meal).pipe(
      tap(() => {
        this.toastr.success('Meal added successfully');
        this.router.navigateByUrl('/meals');
      }),

      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.message);
        return throwError(() => e);
      })
    );
  }

  updateMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this._baseUrl}/meals/${meal.id}`, meal).pipe(
      tap(() => {
        this.router.navigateByUrl('/meals');
        this.toastr.success('Meal changed successfully');
      }),

      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.message);
        return throwError(() => e);
      })
    );
  }

  deleteMeal(mealId: string): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/meals/${mealId}`).pipe(
      tap(() => {
        this.router.navigateByUrl('/meals');
        this.toastr.success('Meal deleted successfully');
      }),

      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.message);
        return throwError(() => e);
      })
    );
  }
}
