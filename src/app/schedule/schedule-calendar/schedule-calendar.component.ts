import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDayIndex = 0;
  selectedDay!: Date;
  selectedWeek!: Date;
  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks and Drinks' },
  ];

  @Input() set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }
  @Output() changeDate = new EventEmitter<Date>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedDayIndex = this.getToday(new Date(this.selectedDay));
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  onChange(weekOffset: number): void {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);

    this.changeDate.emit(startDate);
  }

  selectDay(idx: number): void {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + idx);
    this.changeDate.emit(selectedDay);
  }

  private getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private getToday(date: Date): number {
    let today = date.getDay() - 1;
    if (today < 0) today = 6;
    return today;
  }
}
