import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals.component';
import { MealComponent } from './meal/meal.component';
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
        path: 'new',
        component: MealComponent,
      },
      {
        path: ':id',
        component: MealComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
