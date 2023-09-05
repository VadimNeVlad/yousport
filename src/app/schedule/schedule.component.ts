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
  scheduleList$ = new Observable<Schedule[]>();
  meals$ = new Observable<Meal[]>();
  workouts$ = new Observable<Workout[]>();
  unsubscribe$ = new Subject<void>();

  constructor(
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit(): void {
    this.getSchedule();
    this.getMeals();
    this.getWorkouts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getSchedule(): void {
    this.scheduleList$ = this.scheduleService.getSchedule();
  }

  getMeals(): void {
    this.meals$ = this.mealsService.getMeals();
  }

  getWorkouts(): void {
    this.workouts$ = this.workoutsService.getWorkouts();
  }

  updateSchedule(scheduleItem: ScheduleItem): void {
    this.scheduleService
      .updateSchedule(scheduleItem)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.getSchedule());
  }
}
