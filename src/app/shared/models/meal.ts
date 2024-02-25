export interface Meal {
  id: string;
  name: string;
  userId: string;
  ingredients: string[];
  assignmentId?: string;
}
