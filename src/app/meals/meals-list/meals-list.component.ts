import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';
import { MealsService } from 'src/app/shared/services/meals.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
})
export class MealsListComponent implements OnInit, OnDestroy {
  meals$ = new Observable<Meal[]>();
  unsubscribe$ = new Subject<void>();

  constructor(private mealsServise: MealsService) {}

  ngOnInit(): void {
    this.getMeals();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  trackById(idx: number, meal: Meal): string {
    return meal.id;
  }

  getMeals(): void {
    this.meals$ = this.mealsServise.getMeals();
  }

  deleteMeal(mealId: string): void {
    this.mealsServise
      .deleteMeal(mealId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.getMeals());
  }
}
