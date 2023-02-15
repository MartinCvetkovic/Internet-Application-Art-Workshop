import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingWorkshopsComponent } from './pending-workshops.component';

describe('PendingWorkshopsComponent', () => {
  let component: PendingWorkshopsComponent;
  let fixture: ComponentFixture<PendingWorkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingWorkshopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
