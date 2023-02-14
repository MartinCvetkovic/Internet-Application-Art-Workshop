import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkshopsComponent } from './manage-workshops.component';

describe('ManageWorkshopsComponent', () => {
  let component: ManageWorkshopsComponent;
  let fixture: ComponentFixture<ManageWorkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageWorkshopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
