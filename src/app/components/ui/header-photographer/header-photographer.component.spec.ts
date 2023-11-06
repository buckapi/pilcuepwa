import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPhotographerComponent } from './header-photographer.component';

describe('HeaderPhotographerComponent', () => {
  let component: HeaderPhotographerComponent;
  let fixture: ComponentFixture<HeaderPhotographerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPhotographerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
