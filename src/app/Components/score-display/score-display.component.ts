import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ArithmeticProblem } from '../../models/arithmetic-problem.model';

@Component({
  selector: 'app-score-display',
  templateUrl: './score-display.component.html',
  styleUrl: './score-display.component.css'
})
export class ScoreDisplayComponent implements OnInit {
  
  isAnswerCorrect: boolean[] = [true, false, true, false,true, false, true, false, false, true]

  score: number = 0;
  sessionProblems: ArithmeticProblem[] = [];
  sessionAnswerMarking: boolean[] = [];
  
 constructor(private route: ActivatedRoute,private router: Router){}
 
 
  ngOnInit(): void {
    // Retrieve the score parameter from the URL
    this.route.queryParams.subscribe(params =>{
      this.score = params['score']

      const serializedProblems = params['sessionProblems'];
      if (serializedProblems) {
        this.sessionProblems = JSON.parse(decodeURIComponent(serializedProblems));
      }

      const serializedAnswerMarking = decodeURIComponent(params['sessionAnswerMarking']);
if (serializedAnswerMarking) {
  this.sessionAnswerMarking = JSON.parse(serializedAnswerMarking);
}

    });

    }

    restart() : void{
      //sweet alert to confirm restarting the drill
      Swal.fire({
        title: "Are you sure?",
        text: "You want to restart the drill",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Restart"
      }).then((result) => {
        if (!result.isConfirmed) {
          this.router.navigateByUrl(`/arithmetic-problem/score-display?score=${this.score}`);
        }

      });

        this.router.navigateByUrl('/arithmetic-problem')
    }

    exit():void{

       //sweet alert to confirm exit the drill
       Swal.fire({
        title: "Are you sure?",
        text: "You want to exit this session.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "yes, exit"
      }).then((result) => {
        if (!result.isConfirmed) {
          this.router.navigateByUrl(`/arithmetic-problem/score-display?score=${this.score}`);
        }
        else{
          Swal.fire({
            title: "Exited!",
            text: "You have successfully exited the session.",
            icon: "success"
          });
        }

      });
      this.router.navigateByUrl('arithmetic-problem/score-display/exit')
    }

    showAnswers(): void {
      let reportText = '';

      //this traverse through session problems and also the answer marking
      for (let i = 0; i < this.sessionProblems.length; i++) {
        const problem = this.sessionProblems[i];
        const isCorrect = this.sessionAnswerMarking[i];
        reportText += `<div>${problem.operand1} ${problem.operator} ${problem.operand2} = ? : <i class="fa fa-${isCorrect ? 'check' : 'times'}" style="color:${isCorrect ? 'green' : 'red'};" aria-hidden="true"></i></div>`;
        
      }
      
    
// Determine the color based on the score
let scoreColor: string;
if (this.score < 5) {
  scoreColor = 'red'; // Less than 5 - green
} else if (this.score >= 5 && this.score < 8) {
  scoreColor = '#ffc300'; // Between 5 and 8 - current color
} else {
  scoreColor = 'green'; // Greater than or equal to 8 - red
}

// Score display with dynamically determined color
let scoreDisplay = `<p style="margin-top: 15px; font-weight: bolder;">Total: <span style="color: ${scoreColor};"> ${this.score} /10</span></p>`;


      Swal.fire({
        title: "Report Card:",
        html: reportText + scoreDisplay ,
        
      });
    }
    
    
  
}
