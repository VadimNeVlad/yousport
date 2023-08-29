import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals.component';
import { NewMealComponent } from './new-meal/new-meal.component';
import { MealsListComponent } from './meals-list/meals-list.component';

const routes: Routes = [
  {
    path: '',
    component: MealsComponent,
    children: [
      {
        path: '',
        component: MealsListComponent,
      },
      {
        path: 'meals/new',
        component: NewMealComponent,
      },
      {
        path: 'meals/:id',
        component: NewMealComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
