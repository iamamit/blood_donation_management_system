import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorpageComponent } from './donorpage.component';

describe('DonorpageComponent', () => {
  let component: DonorpageComponent;
  let fixture: ComponentFixture<DonorpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
