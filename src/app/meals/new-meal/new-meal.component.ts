import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';
import { MealsService } from 'src/app/shared/services/meals.service';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.scss'],
})
export class NewMealComponent implements OnDestroy {
  unsubscribe$ = new Subject<void>();

  constructor(private mealService: MealsService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addMeal(meal: Meal): void {
    this.mealService
      .addMeal(meal)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }
}
