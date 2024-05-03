import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructionsComponent } from './Components/instructions/instructions.component';
import { ArithmeticProblemComponent } from './Components/arithmetic-problem/arithmetic-problem.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ScoreDisplayComponent } from './Components/score-display/score-display.component';
import { ExitComponent } from './Components/exit/exit.component';

const routes: Routes = [
  
  {
    path: '',
    component: InstructionsComponent
  },
  {
    path:'arithmetic-problem',
    component: ArithmeticProblemComponent
  },
  {
    path: 'arithmetic-problem/score-display',
    component: ScoreDisplayComponent
  },
  {
    path: 'arithmetic-problem/score-display/exit',
    component: ExitComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
