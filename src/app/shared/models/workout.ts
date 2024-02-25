import { Endurance } from './endurance';
import { Strength } from './strength';

export interface Workout {
  id: string;
  name: string;
  type: string;
  userId: string;
  strength: Strength;
  endurance: Endurance;
  assignmentId?: string;
}
