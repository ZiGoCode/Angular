import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MamberCreateComponent } from './mamber-create.component';

describe('MamberCreateComponent', () => {
  let component: MamberCreateComponent;
  let fixture: ComponentFixture<MamberCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MamberCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MamberCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
