import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';
import { ScheduleAssignComponent } from './schedule-assign/schedule-assign.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleItemComponent,
    ScheduleAssignComponent,
  ],
  imports: [CommonModule, ScheduleRoutingModule, SharedModule, FormsModule],
})
export class ScheduleModule {}
