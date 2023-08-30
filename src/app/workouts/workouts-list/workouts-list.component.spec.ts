import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsListComponent } from './workouts-list.component';

describe('WorkoutsListComponent', () => {
  let component: WorkoutsListComponent;
  let fixture: ComponentFixture<WorkoutsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutsListComponent]
    });
    fixture = TestBed.createComponent(WorkoutsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
