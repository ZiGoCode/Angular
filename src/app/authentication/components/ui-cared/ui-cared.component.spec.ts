import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCaredComponent } from './ui-cared.component';

describe('UiCaredComponent', () => {
  let component: UiCaredComponent;
  let fixture: ComponentFixture<UiCaredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiCaredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
