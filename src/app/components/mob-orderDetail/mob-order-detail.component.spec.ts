import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobOrderDetailComponent } from './mob-order-detail.component';

describe('MobOrderDetailComponent', () => {
  let component: MobOrderDetailComponent;
  let fixture: ComponentFixture<MobOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobOrderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
