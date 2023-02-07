import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveWorkshopsComponent } from './active-workshops.component';

describe('ActiveWorkshopsComponent', () => {
  let component: ActiveWorkshopsComponent;
  let fixture: ComponentFixture<ActiveWorkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveWorkshopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
