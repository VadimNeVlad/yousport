import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Assignment } from 'src/app/shared/models/assignment';
import { Meal } from 'src/app/shared/models/meal';
import {
  AssignmentData,
  Schedule,
  ScheduleItem,
} from 'src/app/shared/models/schedule';
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
  sortedAssignments: any[] = [];

  @Input() assignment!: Assignment;

  @Output() update = new EventEmitter<ScheduleItem>();

  constructor() {}

  toggleModal(data: AssignmentData): void {
    const { type, day, key }: AssignmentData = data;
    this.selectedType = type;
    this.day = day;
    this.key = key;
    this.open = !this.open;
  }

  onUpdateSchedule(scheduleData: ScheduleItem): void {
    // const updatedSchedule: ScheduleItem | any = {
    //   assignments: [
    //     {
    //       meals: this.sortedAssignments[this.key].meals,
    //       workouts: this.sortedAssignments[this.key].workouts,
    //       day: this.day,
    //       key: this.key,
    //       ...scheduleData,
    //     },
    //     ...this.assignments.filter(
    //       (schedule) => schedule.day !== this.day
    //     ),
    //   ],
    //   id: this.schedule.id,
    // };
    // this.update.emit(updatedSchedule);
  }

  trackMealByName(idx: number, meal: Meal): string {
    return meal.name;
  }

  trackWorkoutByName(idx: number, workout: Workout): string {
    return workout.name;
  }
}
