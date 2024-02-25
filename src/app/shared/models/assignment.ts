import { Meal } from './meal';
import { Workout } from './workout';

export interface Assignment {
  id: string;
  scheduleId: string;
  day: string;
  key: number;
  meals: Meal[];
  workouts: Workout[];
}
