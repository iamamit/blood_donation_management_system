import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptorpageComponent } from './acceptorpage.component';

describe('AcceptorpageComponent', () => {
  let component: AcceptorpageComponent;
  let fixture: ComponentFixture<AcceptorpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptorpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptorpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
