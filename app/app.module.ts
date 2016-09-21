import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { TimerComponent }   from './timer.component';
import { MovesComponent }   from './moves.component';
import { LeaderboardComponent }   from './leaderboard.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [
    AppComponent,
    TimerComponent,
    MovesComponent,
    LeaderboardComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }