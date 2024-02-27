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
import { Workout } from 'src/app/shared/models/workout';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAssignComponent implements OnInit {
  model: any[] = [];

  @Input() assignment!: Assignment;
  @Input() meals!: Meal[];
  @Input() workouts!: Workout[];
  @Input() selected = '';

  @Output() update = new EventEmitter<Partial<Assignment>>();
  @Output() close = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    const arr =
      this.assignment[this.selected === 'Meals' ? 'meals' : 'workouts'];
    this.model = arr.map((el) => ({ id: el.id }));
  }

  onChange(event: any) {
    if (event.checked) {
      this.model.push({
        id: event.source.value,
      });
    } else {
      this.model = this.model.filter((el) => el.id !== event.source.value);
    }
  }

  onUpdateSchedule(): void {
    const updatedSchedule: Partial<Assignment> =
      this.selected === 'Meals'
        ? { meals: this.model }
        : { workouts: this.model };

    this.update.emit(updatedSchedule);
  }

  onCloseModal(): void {
    this.close.emit(false);
  }

  isChecked(id: string): boolean {
    const arr =
      this.assignment[this.selected === 'Meals' ? 'meals' : 'workouts'];
    return arr.some((el) => el.id === id);
  }

  getRoute(name: string): string {
    return `../${name.toLowerCase()}/new`;
  }

  trackById(idx: number, item: Workout | Meal): string {
    return item.id;
  }
}
