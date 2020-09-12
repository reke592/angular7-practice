import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAllocationCalendarDayPreviewComponent } from './time-allocation-calendar-day-preview.component';

describe('TimeAllocationCalendarDayPreviewComponent', () => {
  let component: TimeAllocationCalendarDayPreviewComponent;
  let fixture: ComponentFixture<TimeAllocationCalendarDayPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAllocationCalendarDayPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAllocationCalendarDayPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
