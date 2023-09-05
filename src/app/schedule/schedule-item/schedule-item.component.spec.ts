import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleItemComponent } from './schedule-item.component';

describe('ScheduleItemComponent', () => {
  let component: ScheduleItemComponent;
  let fixture: ComponentFixture<ScheduleItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleItemComponent]
    });
    fixture = TestBed.createComponent(ScheduleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
