import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAllocationViewComponent } from './time-allocation-view.component';

describe('TimeAllocationViewComponent', () => {
  let component: TimeAllocationViewComponent;
  let fixture: ComponentFixture<TimeAllocationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAllocationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAllocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
