export interface ICalendarDetail {
    transaction_no: any;            // primary key of data aggregation
    date: string;                   // date show in calendar metadata
    allocations: number;            // count of tasks
    remarks: string;                // any
    is_dirty: boolean;              // upon editing details
}
