import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutsRoutingModule } from './workouts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutsComponent } from './workouts.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutTypeComponent } from './workout-type/workout-type.component';
import { WorkoutsItemComponent } from './workouts-item/workouts-item.component';

@NgModule({
  declarations: [
    WorkoutsComponent,
    WorkoutsListComponent,
    WorkoutComponent,
    WorkoutFormComponent,
    WorkoutTypeComponent,
    WorkoutsItemComponent,
  ],
  imports: [
    CommonModule,
    WorkoutsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class WorkoutsModule {}
