import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C2oHeaderComponent } from './c2o-header.component';

describe('C2oHeaderComponent', () => {
  let component: C2oHeaderComponent;
  let fixture: ComponentFixture<C2oHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C2oHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(C2oHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
