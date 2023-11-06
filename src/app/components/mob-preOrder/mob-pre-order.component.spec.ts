import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobPreOrderComponent } from './mob-pre-order.component';

describe('MobPreOrderComponent', () => {
  let component: MobPreOrderComponent;
  let fixture: ComponentFixture<MobPreOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobPreOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobPreOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
