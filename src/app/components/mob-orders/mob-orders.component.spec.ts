import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobOrdersComponent } from './mob-orders.component';

describe('MobOrdersComponent', () => {
  let component: MobOrdersComponent;
  let fixture: ComponentFixture<MobOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
