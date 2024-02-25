import { Assignment } from './assignment';

export interface Schedule {
  id: string;
  userId: string;
  assignments: Assignment[];
}

export interface ScheduleItem {
  id?: number;
  day?: string;
  meals?: any[];
  workouts?: any[];
  key?: number;
}

export interface AssignmentData {
  type: string;
  day: string;
  key: number;
}
