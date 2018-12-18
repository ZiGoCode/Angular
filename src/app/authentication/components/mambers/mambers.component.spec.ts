import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MambersComponent } from './mambers.component';

describe('MambersComponent', () => {
  let component: MambersComponent;
  let fixture: ComponentFixture<MambersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MambersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MambersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
