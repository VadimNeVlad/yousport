import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleControlsComponent {
  offset = 0;

  @Input() selectedDate!: Date;
  @Output() moveDate = new EventEmitter<number>();

  constructor() {}

  onMoveDate(offset: number): void {
    this.offset = offset;
    this.moveDate.emit(offset);
  }
}
