import { Assignment } from './assignment';

export interface Schedule {
  id: string;
  userId: string;
  assignments: Assignment[];
}

export interface AssignmentData {
  type: string;
  day: string;
  key: number;
}
