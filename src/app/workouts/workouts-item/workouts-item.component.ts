import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Workout } from 'src/app/shared/models/workout';

@Component({
  selector: 'app-workouts-item',
  templateUrl: './workouts-item.component.html',
  styleUrls: ['./workouts-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutsItemComponent {
  toggled = false;

  @Input() workout!: Workout;
  @Output() deleteWorkout = new EventEmitter<number>();

  constructor() {}

  onDeleteWorkout(workoutId: number): void {
    this.deleteWorkout.emit(workoutId);
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }
}
