import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Meal } from 'src/app/shared/models/meal';

@Component({
  selector: 'app-meals-item',
  templateUrl: './meals-item.component.html',
  styleUrls: ['./meals-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsItemComponent {
  toggled = false;

  @Input() meal!: Meal;
  @Output() deleteMeal = new EventEmitter<number>();

  constructor() {}

  toggle(): void {
    this.toggled = !this.toggled;
  }

  onDeleteMeal(mealId: number): void {
    this.deleteMeal.emit(mealId);
  }
}
