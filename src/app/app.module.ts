import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstructionsComponent } from './Components/instructions/instructions.component';
import { ArithmeticProblemComponent } from './Components/arithmetic-problem/arithmetic-problem.component';
import { ScoreDisplayComponent } from './Components/score-display/score-display.component';
import { ExitComponent } from './Components/exit/exit.component';
import { NavLikeComponent } from './Components/nav-like/nav-like.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InstructionsComponent,
    ArithmeticProblemComponent,
    ScoreDisplayComponent,
    ExitComponent,
    NavLikeComponent,
    NotFoundComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
