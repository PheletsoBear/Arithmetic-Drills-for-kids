import { Injectable } from '@angular/core';
import { ArithmeticProblem } from '../models/arithmetic-problem.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemServiceService {




  constructor() { }

  generateProblem(): ArithmeticProblem {
    const operators = ['+', '-', '×', '÷'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let operand1: number = 0;
    let operand2: number = 0;

    if (operator === '+' || operator === '-') {
      operand1 = Math.floor(Math.random() * 50);
      operand2 = Math.floor(Math.random() * 50);
    } 
    else if (operator === '×') {
      operand1 = Math.floor(Math.random() * 13) ;
      operand2 = Math.floor(Math.random() * 13);
    } 
    else if (operator === '÷') {
      operand2 = Math.floor(Math.random() * 12) + 1;
      operand1 = Math.floor(Math.random() * (12 / operand2 + 1)); // Restrict operand1 based on operand2
    }
    

    return { operand1, operand2, operator };
  }
}
