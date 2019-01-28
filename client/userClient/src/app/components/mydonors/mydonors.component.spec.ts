import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydonorsComponent } from './mydonors.component';

describe('MydonorsComponent', () => {
  let component: MydonorsComponent;
  let fixture: ComponentFixture<MydonorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydonorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
