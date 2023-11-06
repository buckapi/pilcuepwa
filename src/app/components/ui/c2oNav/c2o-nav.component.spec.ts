import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C2oNavComponent } from './c2o-nav.component';

describe('C2oNavComponent', () => {
  let component: C2oNavComponent;
  let fixture: ComponentFixture<C2oNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C2oNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(C2oNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
