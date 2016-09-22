import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { LeaderboardComponent }   from './leaderboard.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [
    AppComponent,
    LeaderboardComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }