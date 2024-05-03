import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArithmeticProblemComponent } from './arithmetic-problem.component';

describe('ArithmeticProblemComponent', () => {
  let component: ArithmeticProblemComponent;
  let fixture: ComponentFixture<ArithmeticProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArithmeticProblemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArithmeticProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
