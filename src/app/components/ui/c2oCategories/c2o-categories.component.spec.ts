import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C2oCategoriesComponent } from './c2o-categories.component';

describe('C2oCategoriesComponent', () => {
  let component: C2oCategoriesComponent;
  let fixture: ComponentFixture<C2oCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C2oCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(C2oCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
