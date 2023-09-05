import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDaysComponent {
  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  @Input() selected = 0;
  @Output() selectDay = new EventEmitter<number>();

  constructor() {}

  onSelectDay(idx: number): void {
    this.selectDay.emit(idx);
  }
}
