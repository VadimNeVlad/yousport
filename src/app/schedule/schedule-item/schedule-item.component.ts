import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Assignment } from 'src/app/shared/models/assignment';
import { Meal } from 'src/app/shared/models/meal';
import { AssignmentData } from 'src/app/shared/models/schedule';
import { Workout } from 'src/app/shared/models/workout';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleItemComponent {
  open = false;
  selectedType = '';
  day = '';
  key = 0;

  @Input() assignment!: Assignment;
  @Input() workouts: Workout[] = [];
  @Input() meals: Meal[] = [];

  @Output() update = new EventEmitter<Partial<Assignment>>();

  constructor() {}

  toggleModal(data: AssignmentData): void {
    const { type, day, key }: AssignmentData = data;
    this.selectedType = type;
    this.day = day;
    this.key = key;
    this.open = !this.open;
  }

  onUpdateSchedule(data: Partial<Assignment>): void {
    const scheduleData = {
      ...data,
      id: this.assignment.id,
    };

    this.update.emit(scheduleData);
  }

  trackById(idx: number, item: Workout | Meal): string {
    return item.id;
  }

  getCurrentDay(): boolean {
    return new Date().getDay() === this.assignment.key + 1;
  }
}
