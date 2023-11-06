import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobDistClientsComponent } from './mob-dist-clients.component';

describe('MobDistClientsComponent', () => {
  let component: MobDistClientsComponent;
  let fixture: ComponentFixture<MobDistClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobDistClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobDistClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
