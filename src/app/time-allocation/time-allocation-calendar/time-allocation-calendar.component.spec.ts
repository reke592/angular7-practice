import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAllocationCalendarComponent } from './time-allocation-calendar.component';

describe('TimeAllocationCalendarComponent', () => {
  let component: TimeAllocationCalendarComponent;
  let fixture: ComponentFixture<TimeAllocationCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAllocationCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAllocationCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
