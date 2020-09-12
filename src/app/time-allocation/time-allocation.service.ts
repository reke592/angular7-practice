import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { ICalendarDetail } from './interface/calendar-detail';

const moment = require('moment');
const store = require('./store');

@Injectable()
export class TimeAllocationService {

  _past : Date;
  _future: Date;
  _today = new Date();
  _calendar_days : {};
  $store = store;

  constructor(private http: HttpClient) { }

  getRange(from, to) {
    setTimeout(() => {
      this.http.get<ICalendarDetail[]>('/assets/stub_calendar_today.json')
      .subscribe(async response => {
        await this.$store.dispatch('loadCalendarDays', response);
      });    
    }, 250)
  }
}
