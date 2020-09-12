export interface ITimeAllocationDetail {
    id: number;             // primary key
    company_id: number;     // ref for company details
    employee_id: number;    // ref for employee details
    client_id: number;      // ref for client details
    client_name: any;
    task: any;
    job_code: any;
    dt_started: any;
    dt_finished: any;
    dt_due: any;
}
