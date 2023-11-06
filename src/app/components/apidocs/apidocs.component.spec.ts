import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApidocsComponent } from './apidocs.component';

describe('ApidocsComponent', () => {
  let component: ApidocsComponent;
  let fixture: ComponentFixture<ApidocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApidocsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApidocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
