import { Component, OnInit } from '@angular/core';
import { TimeAllocationService } from '../time-allocation.service';

@Component({
  selector: 'app-time-allocation-view',
  templateUrl: './time-allocation-view.component.html',
  styleUrls: ['./time-allocation-view.component.scss']
})
export class TimeAllocationViewComponent implements OnInit {

  constructor(private service: TimeAllocationService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
