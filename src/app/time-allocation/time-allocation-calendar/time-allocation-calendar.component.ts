import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { TimeAllocationService } from '../time-allocation.service';
import {
  CALENDAR_CARDS_CREATED
  , CALENDAR_DAY_SELECTED
} from '../store/type-events';
import { TimeAllocationCalendarDayPreviewComponent } from '../time-allocation-calendar-day-preview/time-allocation-calendar-day-preview.component';

const moment = require('moment');

@Component({
  selector: 'time-allocation-calendar',
  templateUrl: './time-allocation-calendar.component.html',
  styleUrls: ['./time-allocation-calendar.component.scss']
})
export class TimeAllocationCalendarComponent implements OnInit {

  calendar = [];
  _calendar_days = {};
  _selected_day = {};
  isCalendarDaySelected :boolean = false;
  isCalendarDaysLoaded :boolean = false;

  private _selectedMonth;
  private _today = moment(new Date());

  constructor(private service: TimeAllocationService) { }

  ngOnInit() {
    this.service.$store.subscribe(this).on(CALENDAR_CARDS_CREATED, ({state}) => {
      this._calendar_days = state.calendar_days;
    })

    this.service.$store.subscribe(this).on(CALENDAR_DAY_SELECTED, ({state}) => {
      this._selected_day = state.selected_day;
      this.isCalendarDaySelected = true;
    });

    this._selectedMonth = moment();
    this.createCalendar();
  }

  ngOnDestroy() {
    this.service.$store.unsubscribe(this);
    while(this.calendar.length) {
      this.calendar.pop();
    }
  }

  createCalendar(month_ = undefined, year_ = undefined) {
    // remove component bindings, this will call ngOnDestroy for each created component
    this.calendar = [];
    
    // run in event loop to avoid race conditions
    this.service.$store.delayLoad(() => {
      let month = (month_ || new Date().getMonth()) + 1;
      let year = year_ || new Date().getFullYear();
      let target = new Date(`${year}-${month}-01`);
  
      let start_week = moment(target).startOf('month').week();
      let end_week = start_week + 6;
  
      for(var week = start_week; week != end_week; week++) {
        this.calendar.push({
          week,
          days: Array(7).fill(0).map((n, i) => moment(target).week(week).startOf('week').clone().add(n + i, 'day'))
        })
      }

      this.service.$store.dispatch('navigateCalendarMonth', month - 1);
      this.service.getRange(
        moment(target).week(start_week).startOf('week').clone(),
        moment(target).week(end_week).endOf('week').clone()
      );
    });
  }

  nextMonth() {
    this._selectedMonth = moment(this._selectedMonth).add(1, 'month');
    this.createCalendar(this._selectedMonth.month(), this._selectedMonth.year());
  }

  prevMonth() {
    this._selectedMonth = moment(this._selectedMonth).subtract(1, 'month');
    this.createCalendar(this._selectedMonth.month(), this._selectedMonth.year());
  }

  reset() {
    this._selectedMonth = moment(new Date());
    this.createCalendar(this._selectedMonth.month(), this._selectedMonth.year());
  }

  calendarCardClass(i, day) {
    let isWeekend = !(i % 6) || !(i % 7)
    let isInCurrentMonth = day.month() === this._selectedMonth.month();
    let isToday = this._today.isSame(day, 'date');
    
    return {
      'calendar-card': true,
      'weekend': isWeekend,
      'weekday': !isWeekend,
      'current-day': isToday,
      'current-month': isInCurrentMonth,
      'other-month': !isInCurrentMonth
    }
  }

  test() {
    this.service.$store.dispatch('selectCalendarDay', "2020-08-08");
  }

  calendarDays() {
    return Object.keys(this._calendar_days).map(date => this._calendar_days[date]);
  }
}
