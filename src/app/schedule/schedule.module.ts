import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './schedule-days/schedule-days.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';
import { ScheduleAssignComponent } from './schedule-assign/schedule-assign.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleControlsComponent,
    ScheduleDaysComponent,
    ScheduleItemComponent,
    ScheduleAssignComponent,
  ],
  imports: [CommonModule, ScheduleRoutingModule, SharedModule, FormsModule],
})
export class ScheduleModule {}
