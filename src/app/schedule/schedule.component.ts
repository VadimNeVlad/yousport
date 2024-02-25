import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ScheduleService } from '../shared/services/schedule.service';
import { Schedule, ScheduleItem } from '../shared/models/schedule';
import { MealsService } from '../shared/services/meals.service';
import { WorkoutsService } from '../shared/services/workouts.service';
import { Meal } from '../shared/models/meal';
import { Workout } from '../shared/models/workout';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  schedule$ = new Observable<Schedule>();
  unsubscribe$ = new Subject<void>();

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.getSchedule();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getSchedule(): void {
    this.schedule$ = this.scheduleService.getSchedule();
  }

  updateSchedule(scheduleItem: ScheduleItem): void {
    this.scheduleService
      .updateSchedule(scheduleItem)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.getSchedule());
  }
}
