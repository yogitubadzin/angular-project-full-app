import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFinishComponent } from './cart-finish.component';

describe('CartFinishComponent', () => {
  let component: CartFinishComponent;
  let fixture: ComponentFixture<CartFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
