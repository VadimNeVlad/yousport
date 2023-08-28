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
    return this.http.get<Meal[]>(`${this._baseUrl}/meals`).pipe(
      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.message);
        return throwError(() => e);
      })
    );
  }

  addMeal(meal: Meal): Observable<Meal> {
    const uid = this.authService.user$.value?.id;

    const updatedMeal: Meal = {
      ...meal,
      uid,
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
        this.toastr.success('Meal deleted successfully');
      }),

      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.message);
        return throwError(() => e);
      })
    );
  }
}
