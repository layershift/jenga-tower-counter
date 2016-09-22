import {Component, OnInit} from '@angular/core';
import {LeaderboardComponent}   from './leaderboard.component';
import {Input} from '@angular/core';
import {ScoreModel}   from './score.model';
import {Observable} from 'rxjs/Rx';
import {TimerModel}   from './timer.model';

@Component({
  selector: 'my-app',
  template: `
    <h1>Score Counter</h1>

    <div [hidden]='finished'>
      <h2 [hidden]="countDown < 1">{{countDown | date:'mm:ss'}}</h2>
      <h2 [hidden]="countDown >= 1">Finished</h2>

      <h2>{{winner.moves}}</h2>

      <button [hidden]='has_crashed' (click)="addMove()">+</button>
      <button [hidden]='has_crashed' [hidden]="moves == 0" (click)="crash()">crash</button>
    </div>

    <br/>

    <div [hidden]='!finished'>
      <h2>You stacked {{winner.moves}}</h2>
      <h2 [hidden]='countDown == 0'>But crashed with {{countDown | date:'mm:ss'}} left</h2>

      <div class="container">
          <form (submit)="enteredName()">
            <div class="form-group">
              <label for="name">Enter your email:</label>
              <input name="email" [(ngModel)]="winner.email" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="alterEgo">Nickname</label>
              <input name="nickname" [(ngModel)]="winner.nickname" type="text" class="form-control" />
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
          </form>
      </div>

      <leaderboard [scores]="scoreboard"></leaderboard>

      <button (click)="reset()">reset</button>
    </div>
  `
})
export class AppComponent implements OnInit {
  moved = false;
  crashed = false;
  resetted = false;
  finished = false;

  winner:ScoreModel;

  scoreboard = [];

  started = false;

  countFrom = 5 * 6000;
  countDown = this.countFrom;
  timerModel = new TimerModel();
  timer = Observable.timer(0,500);
  timerSub = null;

  startTimer() {
    this.timerModel.startTime = Date.now()
    this.timerSub = this.timer.subscribe( event => this.tick(this)) ;
  }

  tick(t){
    if (t.countDown < 1){
      t.timerSub.unsubscribe();
      t.finished = true;
    } else {
      var seconds_left = this.countFrom - (Date.now() - t.timerModel.startTime);
      t.countDown = seconds_left;
      t.timerModel.counter++;
    }
  }

  addMove(){
    this.winner.moves++

    if (this.winner.moves == 1){
      this.startTimer();
    }
  }

  crash(){
    this.finished = true;
    this.winner.time_left = this.countDown;

    if (this.timerSub){
      this.timerSub.unsubscribe();
    }
  }

  onMoved(e){
    this.moved = true;
  }

  reset(){
    this.moved = false;
    this.resetted = !this.resetted;
    this.finished = false;
    this.winner = new ScoreModel();
    this.winner.moves = 0;
    this.countDown = this.countFrom;
  }

  ngOnInit(){
    while(scoreboard==null){
      var scoreboard = JSON.parse(window.localStorage.getItem('scoreboard'));
      if (scoreboard == null){
        window.localStorage.setItem('scoreboard','[]')
      }
    }

    this.scoreboard = scoreboard.sort(function(a, b){ return b.score - a.score });

    this.winner = new ScoreModel();
    this.winner.moves = 0;
  }

  enteredName(){
    // setup the user
    var user = {
      email: this.winner.email,
      nickname: this.winner.nickname,
      time_left: this.winner.time_left,
      score: this.winner.moves
    };

    // add user to scoreboard
    this.scoreboard.push(user);
    this.scoreboard = this.scoreboard.sort((n1,n2) => n2.score - n1.score);

    // serialize scoreboard to localStorage
    window.localStorage.setItem('scoreboard', JSON.stringify(this.scoreboard));
  }

}