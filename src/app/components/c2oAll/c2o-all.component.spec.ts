import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C2oAllComponent } from './c2o-all.component';

describe('C2oAllComponent', () => {
  let component: C2oAllComponent;
  let fixture: ComponentFixture<C2oAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C2oAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(C2oAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
