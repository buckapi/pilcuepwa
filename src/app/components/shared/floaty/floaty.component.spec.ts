import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatyComponent } from './floaty.component';

describe('FloatyComponent', () => {
  let component: FloatyComponent;
  let fixture: ComponentFixture<FloatyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
