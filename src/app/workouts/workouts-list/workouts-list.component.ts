import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workout } from 'src/app/shared/models/workout';
import { Observable, Subject, takeUntil } from 'rxjs';
import { WorkoutsService } from 'src/app/shared/services/workouts.service';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent implements OnInit, OnDestroy {
  workouts$ = new Observable<Workout[]>();
  unsubscribe$ = new Subject<void>();

  constructor(private workoutsService: WorkoutsService) {}

  ngOnInit(): void {
    this.getWorkouts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getWorkouts(): void {
    this.workouts$ = this.workoutsService.getWorkouts();
  }

  deleteWorkout(workoutId: string): void {
    this.workoutsService
      .deleteWorkout(workoutId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.getWorkouts());
  }

  trackById(idx: number, workout: Workout): string {
    return workout.id;
  }
}
