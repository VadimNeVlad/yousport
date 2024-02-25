import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';
import { MealsService } from 'src/app/shared/services/meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, OnDestroy {
  mealId = '';

  meal$ = new Observable<Meal>();
  unsubscribe$ = new Subject<void>();

  constructor(
    private mealService: MealsService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.mealId = this.route.snapshot.paramMap.get('id') as string;

    if (this.mealId) this.getMeal();
  }

  getMeal(): void {
    this.meal$ = this.mealService.getMeal(this.mealId);
  }

  addMeal(meal: Meal): void {
    this.mealService
      .addMeal(meal)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  updateMeal(meal: Meal): void {
    this.mealService
      .updateMeal(meal)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  deleteMeal(mealId: string): void {
    this.mealService
      .deleteMeal(mealId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }
}
