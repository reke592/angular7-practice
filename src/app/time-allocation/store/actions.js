const moment = require('moment');
const {
  CREATE_CALENDAR_CARDS
  , LOAD_CALENDAR_DAYS
  , SELECT_CALENDAR_DAY,
  NAVIGATE_CALENDAR_MONTH
} = require('./type-mutations');

const {
  CALENDAR_CARDS_CREATED
  , CALENDAR_DAYS_LOADED
  , CALENDAR_DAY_SELECTED,
  CALENDAR_MONTH_NAVIGATED,
} = require('./type-events');

const createCalendarCards = async function({ state, payload, commit, emit }) {
  start_date = moment(payload.from_date);
  end_date = moment(payload.to_date);
  while(start_date.isBefore(end_date)) {
    await commit(CREATE_CALENDAR_CARDS, start_date.format("YYYY-MM-DD"));
    start_date.add(1, 'day');
  }
  emit(CALENDAR_CARDS_CREATED);
}

const loadCalendarDays = async function({ state, payload, commit, emit }) {
  await commit(LOAD_CALENDAR_DAYS, payload);
  emit(CALENDAR_DAYS_LOADED);
}

const selectCalendarDay = async function({ state, payload, commit, emit }) {
  await commit(SELECT_CALENDAR_DAY, payload);
  emit(CALENDAR_DAY_SELECTED);
}

const navigateCalendarMonth = async function({ state, payload, commit, emit }) {
  await commit(NAVIGATE_CALENDAR_MONTH, payload);
  emit(CALENDAR_MONTH_NAVIGATED);
}

exports.createCalendarCards = createCalendarCards;
exports.loadCalendarDays = loadCalendarDays;
exports.selectCalendarDay = selectCalendarDay;
exports.navigateCalendarMonth = navigateCalendarMonth;