import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlLayoutComponent } from './control-layout.component';

describe('ControlLayoutComponent', () => {
  let component: ControlLayoutComponent;
  let fixture: ComponentFixture<ControlLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
