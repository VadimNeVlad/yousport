export interface Schedule {
  id?: number;
  uid?: number;
  assignments: ScheduleItem[];
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
