import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeAllocationViewComponent } from './time-allocation-view/time-allocation-view.component';

const routes: Routes = [
  {
    path: 'time-allocation',
    component: TimeAllocationViewComponent,
    children: [
      {
        path: ':date',
        component: TimeAllocationViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeAllocationRoutingModule { }
