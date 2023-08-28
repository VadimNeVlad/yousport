import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';
import { MealsComponent } from './meals.component';
import { SharedModule } from '../shared/shared.module';
import { NewMealComponent } from './new-meal/new-meal.component';
import { MealsListComponent } from './meals-list/meals-list.component';
import { MealFormComponent } from './meal-form/meal-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MealsItemComponent } from './meals-item/meals-item.component';

@NgModule({
  declarations: [
    MealsComponent,
    NewMealComponent,
    MealsListComponent,
    MealFormComponent,
    MealsItemComponent,
  ],
  imports: [
    CommonModule,
    MealsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class MealsModule {}
