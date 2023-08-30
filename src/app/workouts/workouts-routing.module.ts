import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutsComponent } from './workouts.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsComponent,
    children: [
      {
        path: '',
        component: WorkoutsListComponent,
      },
      {
        path: 'new',
        component: WorkoutComponent,
      },
      {
        path: ':id',
        component: WorkoutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsRoutingModule {}
