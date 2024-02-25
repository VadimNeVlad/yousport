import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Workout } from 'src/app/shared/models/workout';
import { WorkoutsService } from 'src/app/shared/services/workouts.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workoutId = '';

  workout$ = new Observable<Workout>();
  unsubscribe$ = new Subject<void>();

  constructor(
    private workoutsService: WorkoutsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.workoutId = this.route.snapshot.paramMap.get('id') as string;
    if (this.workoutId) this.getWorkout();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getWorkout(): void {
    this.workout$ = this.workoutsService.getWorkout(this.workoutId);
  }

  addWorkout(workout: Workout): void {
    this.workoutsService
      .addWorkout(workout)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  updateWorkout(workout: Workout): void {
    this.workoutsService
      .updateWorkout(workout)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  deleteWorkout(workoutId: string): void {
    this.workoutsService
      .deleteWorkout(workoutId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }
}
