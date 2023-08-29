import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Meal } from 'src/app/shared/models/meal';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealFormComponent implements OnChanges {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([new FormControl('', Validators.required)]),
  });

  exist = false;
  toggled = false;

  @Input() meal!: Meal;
  @Output() submitMeal = new EventEmitter<Meal>();
  @Output() updateMeal = new EventEmitter<Meal>();
  @Output() deleteMeal = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.meal && this.meal.name) {
      const value = this.meal;
      this.exist = true;

      this.emptyIngredients();
      this.form.patchValue(value);

      if (value.ingredients) {
        for (let item of value.ingredients) {
          this.ingredients.push(new FormControl(item, Validators.required));
        }
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) this.submitMeal.emit(this.form.value);
  }

  addIngredient(): void {
    this.ingredients.push(new FormControl('', Validators.required));
  }

  removeIngredient(idx: number): void {
    this.ingredients.removeAt(idx);
  }

  emptyIngredients(): void {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  onUpdate(): void {
    if (this.form.valid) {
      const mealid = this.meal.id;
      const updatedMeal: Meal = {
        ...this.form.value,
        id: mealid,
      };

      this.updateMeal.emit(updatedMeal);
    }
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }

  onDeleteMeal(mealId: number): void {
    this.deleteMeal.emit(mealId);
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }
}
