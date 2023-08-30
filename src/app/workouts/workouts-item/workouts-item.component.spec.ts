import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsItemComponent } from './workouts-item.component';

describe('WorkoutsItemComponent', () => {
  let component: WorkoutsItemComponent;
  let fixture: ComponentFixture<WorkoutsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutsItemComponent]
    });
    fixture = TestBed.createComponent(WorkoutsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
