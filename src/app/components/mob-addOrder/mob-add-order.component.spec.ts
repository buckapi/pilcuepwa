import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobAddOrderComponent } from './mob-add-order.component';

describe('MobAddOrderComponent', () => {
  let component: MobAddOrderComponent;
  let fixture: ComponentFixture<MobAddOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobAddOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
