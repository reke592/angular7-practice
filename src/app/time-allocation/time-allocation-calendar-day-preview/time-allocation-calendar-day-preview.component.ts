import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { TimeAllocationService } from '../time-allocation.service';
import {
  CALENDAR_DAYS_LOADED,
} from '../store/type-events';

const moment = require('moment');

@Component({
  selector: 'time-allocation-calendar-day-preview',
  templateUrl: './time-allocation-calendar-day-preview.component.html',
  styleUrls: ['./time-allocation-calendar-day-preview.component.scss']
})
export class TimeAllocationCalendarDayPreviewComponent implements OnInit, OnDestroy {
  @Input() date: string;
  preview = {};
  isCurrentMonth = false;

  constructor(private service : TimeAllocationService) { }

  ngOnInit() {
    this.service.$store.subscribe(this).on(CALENDAR_DAYS_LOADED, ({state}) => {
      let { [`${this.date}`]: x } = state.calendar_days;
      this.preview = x || {};
      this.isCurrentMonth = state.selected_month == new Date(this.date).getMonth();
    });
  }

  ngOnDestroy() {
    this.service.$store.unsubscribe(this);
  }

  calendarMetaClass() {
    return {
      "calendar-day-meta": true,
      "other-month": !this.isCurrentMonth
    }
  }
}
