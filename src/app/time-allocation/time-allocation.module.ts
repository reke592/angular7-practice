import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeAllocationRoutingModule } from './time-allocation-routing.module';
import { TimeAllocationViewComponent } from './time-allocation-view/time-allocation-view.component';
import { TimeAllocationService } from './time-allocation.service';
import { TimeAllocationCalendarComponent } from './time-allocation-calendar/time-allocation-calendar.component';
import { TimeAllocationCalendarDayPreviewComponent } from './time-allocation-calendar-day-preview/time-allocation-calendar-day-preview.component';

@NgModule({
  declarations: [TimeAllocationViewComponent, TimeAllocationCalendarComponent, TimeAllocationCalendarDayPreviewComponent],
  imports: [
    CommonModule,
    TimeAllocationRoutingModule
  ],
  exports: [
    TimeAllocationViewComponent,
    TimeAllocationRoutingModule
  ],
  providers: [TimeAllocationService]
})
export class TimeAllocationModule { }
