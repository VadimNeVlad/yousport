import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Workout } from 'src/app/shared/models/workout';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutFormComponent implements OnChanges {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    type: 'strength',
    strength: this.fb.group({
      reps: null,
      sets: null,
      weight: null,
    }),
    endurance: this.fb.group({
      distance: null,
      duration: null,
    }),
  });

  exist = false;
  toggled = false;

  @Input() workout!: Workout;
  @Output() submitWorkout = new EventEmitter<Workout>();
  @Output() updateWorkout = new EventEmitter<Workout>();
  @Output() deleteWorkout = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workout && this.workout.name) {
      const value = this.workout;
      this.exist = true;

      this.form.patchValue(value);
    }
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }

  onSubmitWorkout(): void {
    if (this.form.valid) this.submitWorkout.emit(this.form.value);
  }

  onUpdateWorkout(): void {
    if (this.form.valid) {
      const updatedMeal: Workout = {
        ...this.form.value,
        id: this.workout.id,
      };

      this.updateWorkout.emit(updatedMeal);
    }
  }

  onDeleteWorkout(workoutId: string): void {
    this.deleteWorkout.emit(workoutId);
  }

  get placeholder(): string {
    return `e.g. ${
      this.form.get('type')?.value === 'strength' ? 'Benchpress' : 'Treadmill'
    }`;
  }
}
