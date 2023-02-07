import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendedWorkshopsComponent } from './attended-workshops.component';

describe('AttendedWorkshopsComponent', () => {
  let component: AttendedWorkshopsComponent;
  let fixture: ComponentFixture<AttendedWorkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendedWorkshopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendedWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
