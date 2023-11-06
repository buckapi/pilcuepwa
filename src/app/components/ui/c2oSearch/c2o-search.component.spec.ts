import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C2oSearchComponent } from './c2o-search.component';

describe('C2oSearchComponent', () => {
  let component: C2oSearchComponent;
  let fixture: ComponentFixture<C2oSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C2oSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(C2oSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
