import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPhotographerComponent } from './footer-photographer.component';

describe('FooterPhotographerComponent', () => {
  let component: FooterPhotographerComponent;
  let fixture: ComponentFixture<FooterPhotographerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterPhotographerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
