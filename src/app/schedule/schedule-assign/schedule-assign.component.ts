import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Meal } from 'src/app/shared/models/meal';
import { ScheduleItem } from 'src/app/shared/models/schedule';
import { Workout } from 'src/app/shared/models/workout';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAssignComponent {
  model: any[] = [];

  @Input() meals!: Meal[];
  @Input() workouts!: Workout[];
  @Input() selected = '';
  @Input() data: any;

  @Output() update = new EventEmitter<ScheduleItem>();
  @Output() close = new EventEmitter<boolean>();

  constructor() {}

  getRoute(name: string): string {
    return `../${name.toLowerCase()}/new`;
  }

  trackMealsById(idx: number, meal: Meal): number {
    return meal.id!;
  }

  trackWorkoutsById(idx: number, workout: Workout): string {
    return workout.id;
  }

  onChange(event: any) {
    if (event.checked) {
      this.model.push({
        name: event.source.value,
      });
    } else {
      this.model = this.model.filter((el) => el.name !== event.source.value);
    }
  }

  onUpdateSchedule(): void {
    let updatedSchedule: ScheduleItem = {};

    if (this.selected === 'Meals') updatedSchedule = { meals: this.model };
    else updatedSchedule = { workouts: this.model };

    this.update.emit(updatedSchedule);
  }

  onCloseModal(): void {
    this.close.emit(false);
  }
}
