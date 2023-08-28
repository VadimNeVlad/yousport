import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
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
export class MealFormComponent implements OnInit {
  @Output() submited = new EventEmitter<Meal>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      ingredients: this.fb.array([new FormControl('', Validators.required)]),
    });
  }

  onSubmit(): void {
    if (this.form.valid) this.submited.emit(this.form.value);
  }

  addIngredient(): void {
    this.ingredients.push(new FormControl('', Validators.required));
  }

  removeIngredient(idx: number): void {
    this.ingredients.removeAt(idx);
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }
}
