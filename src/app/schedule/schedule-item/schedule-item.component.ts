import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
export class ScheduleItemComponent implements OnInit {
  open = false;
  selectedType = '';
  day = '';
  key = 0;
  sortedAssignments: any[] = [];

  @Input() schedule!: Schedule;
  @Input() meals!: Meal[];
  @Input() workouts!: Workout[];

  @Output() update = new EventEmitter<ScheduleItem>();

  constructor() {}

  ngOnInit(): void {
    this.sortedAssignments = Array.from(this.schedule.assignments).sort(
      (a: any, b: any) => a.key - b.key
    );
  }

  toggleModal(data: AssignmentData): void {
    const { type, day, key }: AssignmentData = data;
    this.selectedType = type;
    this.day = day;
    this.key = key;
    this.open = !this.open;
  }

  onUpdateSchedule(scheduleData: ScheduleItem): void {
    const updatedSchedule: ScheduleItem | any = {
      assignments: [
        {
          meals: this.sortedAssignments[this.key].meals,
          workouts: this.sortedAssignments[this.key].workouts,
          day: this.day,
          key: this.key,
          ...scheduleData,
        },

        ...this.schedule.assignments.filter(
          (schedule) => schedule.day !== this.day
        ),
      ],

      id: this.schedule.id,
    };

    this.update.emit(updatedSchedule);
  }

  trackMealByName(idx: number, meal: Meal): string {
    return meal.name;
  }

  trackWorkoutByName(idx: number, workout: Workout): string {
    return workout.name;
  }
}
