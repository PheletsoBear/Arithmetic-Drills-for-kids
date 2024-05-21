
import { Component, HostListener, OnInit } from '@angular/core';
import { ArithmeticProblem } from '../../models/arithmetic-problem.model';
import { ProblemServiceService } from '../../services/problem-service.service';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-arithmetic-problem',
  templateUrl: './arithmetic-problem.component.html',
  styleUrl: './arithmetic-problem.component.css'
})
export class ArithmeticProblemComponent implements OnInit {
  currentProblem: ArithmeticProblem = { operand1: 0, operand2: 0, operator: '+' };
  sessionProblems: ArithmeticProblem[] = [];
  questionNumber: number =1
  currentIndex: number = 0;
  userAnswers: number[] = [];
  score: number = 0;
  remainingQuestions: number = 9;
  userAnswer: string = '';
  emptyInput: boolean = true;
  invalidInput: boolean = false;
  inputTouched = false;
  isAnswerCorrect: boolean = false;
  isAnswerSubmitted: boolean = false;
  sessionAnswerMarking: boolean[] = []

  constructor(private problemService: ProblemServiceService, private router:Router, private location: Location) { }

  ngOnInit(): void {
    this.startSession();

  
       
       // Listen for the popstate event
       window.onpopstate = function(event) {
        // Disable the forward button
        window.history.forward();
        

      };
    

     
      
  }
  


  startSession(): void {
    this.sessionProblems = Array.from({ length: 10}, () => this.problemService.generateProblem());
    this.currentProblem = this.sessionProblems[this.currentIndex];

    // Serialize each object in the sessionProblems array individually

   this.sessionProblems = this.sessionProblems.map(problem => ({ ...problem })); //session problem array

   
  }


  submitAnswer(): void {

    let expectedAnswer: number;
    this.isAnswerSubmitted = true; 

    switch (this.currentProblem.operator) {
      case '+':
        expectedAnswer = this.currentProblem.operand1 + this.currentProblem.operand2;
        break;
      case '-':
        expectedAnswer = this.currentProblem.operand1 - this.currentProblem.operand2;
        break;
      case '×':
        expectedAnswer = this.currentProblem.operand1 * this.currentProblem.operand2;
        break;
      case '÷':
        expectedAnswer = Number((this.currentProblem.operand1 / this.currentProblem.operand2).toFixed(2)); //round-off to two decimals and parse back to number
        break;
      default:
        throw new Error('Unsupported operator');// just precaution 
    }

    const userAnswerNumber = Number(this.userAnswer);

    if (userAnswerNumber === expectedAnswer) {
      this.score++;
      this.isAnswerCorrect = true
    }
 
    this.userAnswers.push(userAnswerNumber); // Adds user's answer to the userAnswers array
    this.sessionAnswerMarking.push(this.isAnswerCorrect)
   
    setTimeout(() => {
      this.moveToNextProblem();
     
    }, 1800);
    setTimeout(() => {
      
      //Reset the input fields after each submission
      this.isAnswerCorrect = false
       this.emptyInput = true;
      this.invalidInput = false;
     this.inputTouched = false;
       this.userAnswer = ''; // Reset the input field
       this.isAnswerSubmitted = false; 
    }, 1800);


  
  }

  moveToNextProblem(): void {
    this.currentIndex++;
    this.questionNumber++
    if (this.currentIndex < this.sessionProblems.length) {
      this.currentProblem = this.sessionProblems[this.currentIndex];
      this.remainingQuestions--;
      
    }
    else {
      // End of session, calculate and reset input fields

      Swal.fire({
        title: "Submited!",
        text: "Your answers have been submitted.",
        icon: "success"
       })

       // Serializing session Problems array into a string
       const serializedProblems = JSON.stringify(this.sessionProblems);
      const serializedAnswerMarking = JSON.stringify(this.sessionAnswerMarking);
      const serializedUserAnswers = JSON.stringify(this.userAnswers)

       // Navigating to the target route with both score and session Problems as query parameters
       this.router.navigateByUrl(`/arithmetic-problem/score-display?score=${this.score}&sessionProblems=${encodeURIComponent(serializedProblems)}&sessionAnswerMarking=${encodeURIComponent(serializedAnswerMarking)}&userAnswers=${encodeURIComponent(serializedUserAnswers)}`);
     
      

       // Reset session
      this.currentIndex = 1;
      this.userAnswers = [];
      this.score = 0;
      this.startSession();
      this.remainingQuestions = 9;
      this.score = 0;
      this.userAnswer = '';
      this.sessionAnswerMarking = []
    }
  }


  validateInput(): void {
    this.emptyInput = this.userAnswer === '';
    this.invalidInput = isNaN(Number(this.userAnswer));
    this.inputTouched = true;
   
     
  
  }
  
//flags alert when user tries refreshing the page when on session

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    // Cancel the event
    $event.returnValue = true;

    // Display alert when the page is refreshed
    alert();
  }


  

}
