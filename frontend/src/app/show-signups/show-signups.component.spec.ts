import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSignupsComponent } from './show-signups.component';

describe('ShowSignupsComponent', () => {
  let component: ShowSignupsComponent;
  let fixture: ComponentFixture<ShowSignupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSignupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSignupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
