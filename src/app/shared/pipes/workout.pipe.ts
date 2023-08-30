import { Pipe, PipeTransform } from '@angular/core';
import { Workout } from '../models/workout';

@Pipe({
  name: 'workout',
})
export class WorkoutPipe implements PipeTransform {
  transform(value: Workout): string {
    if (value.type === 'endurance') {
      return `Distance: ${value.endurance.distance} km, Duration: ${value.endurance.duration} mins`;
    } else {
      return `Weight: ${value.strength.weight} km, Reps: ${value.strength.reps} mins, Sets: ${value.strength.sets}`;
    }
  }
}
