import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLikeComponent } from './nav-like.component';

describe('NavLikeComponent', () => {
  let component: NavLikeComponent;
  let fixture: ComponentFixture<NavLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavLikeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
