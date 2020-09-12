const Store = require('../lib/Store');
const {
  LOAD_CALENDAR_DAYS
  , SELECT_CALENDAR_DAY,
  CREATE_CALENDAR_CARDS,
  NAVIGATE_CALENDAR_MONTH
} = require('./type-mutations');

const actions = require('./actions');

// initial state
const state = {
    calendar_days: {
        // "YYYY-MM-DD": ICalendarDetail
    },
    unsaved: {
        // "YYYY-MM-DD": [ ITimeAllocationDetail ... ]
    },
    
    selected_day: {}, // ICalendarDetail

    selected_month: undefined
}


const mutations = {
    [CREATE_CALENDAR_CARDS] ({ state, payload }) {
        let date = payload;
        if(!state.calendar_days[date]) {
            state.calendar_days[date] = {                 // @see ICalendarDetail
                date,                               // date to shown in calendar metadata
                allocations: 0,                     // count of rows in tbl_time_allocation_details
                approval_status_id: undefined,      // project if already filed
                transaction_no: undefined,          // project the transaction number
                remarks: "",                        // upon validation: mismatched, matched, unsaved
                is_dirty: false                     // upon editing details
            }
        }
    },
    [LOAD_CALENDAR_DAYS] ({ state, payload }) {
        payload.map(data => {
            state.calendar_days[data.date] = data;
        });
    },
    [SELECT_CALENDAR_DAY] ({ state, payload }) {
        state.selected_day = state.calendar_days[payload];
    },
    [NAVIGATE_CALENDAR_MONTH] ({ state, payload }) {
        state.selected_month = payload;
    }
}

module.exports = new Store({ state, actions, mutations });
