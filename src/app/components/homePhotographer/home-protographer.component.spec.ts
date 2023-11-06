import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProtographerComponent } from './home-protographer.component';

describe('HomeProtographerComponent', () => {
  let component: HomeProtographerComponent;
  let fixture: ComponentFixture<HomeProtographerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeProtographerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProtographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
