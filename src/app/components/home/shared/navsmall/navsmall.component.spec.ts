import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavsmallComponent } from './navsmall.component';

describe('NavsmallComponent', () => {
  let component: NavsmallComponent;
  let fixture: ComponentFixture<NavsmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavsmallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavsmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
