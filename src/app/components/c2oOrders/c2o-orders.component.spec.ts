import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C2oOrdersComponent } from './c2o-orders.component';

describe('C2oOrdersComponent', () => {
  let component: C2oOrdersComponent;
  let fixture: ComponentFixture<C2oOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C2oOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(C2oOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
