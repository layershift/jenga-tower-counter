import {Component, OnInit} from '@angular/core';
import {LeaderboardComponent}   from './leaderboard.component';
import {Input} from '@angular/core';
import {ScoreModel}   from './score.model';
import {Observable} from 'rxjs/Rx';
import {TimerModel}   from './timer.model';
import {SoundsModel}   from './sounds.model';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';

@Component({
  host: {
    '(document:keyup)': 'documentKeyUp($event)',
    '(document:keypress)': 'documentKeyPress($event)'
  },
  selector: 'my-app',
  template: `
    <h1>Score Counter</h1>

    <div class="container" [hidden]='nameAdded'>
      <form (submit)="enteredName()">
        <div class="form-group">
          <label for="name">Enter your email:</label>
          <input name="jenga_email" type="email" [(ngModel)]="user.email" type="text" class="form-control" autocomplete='off' required />
          <div *ngIf="user.email && user.email.indexOf('@') < 1" class="alert alert-danger">
            Email is required
          </div>
        </div>
        <div class="form-group">
          <label for="alterEgo">Name</label>
          <input name="nickname" [(ngModel)]="user.nickname" type="text" class="form-control" required />
        </div>

        Join EAP:
        <input name="joineap" [(ngModel)]="user.joineap" type="checkbox" class="form-control" required />

        Join launch notification list:
        <input name="launchnotify" [(ngModel)]="user.launchnotify" type="checkbox" class="form-control" required />

        <button type="submit" class="btn btn-default">Submit</button>
      </form>
    </div>

    <div [hidden]='finished || !nameAdded'>
      <h2 [hidden]="countDown < 1">{{countDown | date:'mm:ss'}}</h2>
      <h2 [hidden]="countDown >= 1">Finished</h2>

      <h2>{{user.moves}}</h2>

      <button [hidden]='has_crashed' (click)="addMove()">+</button>
      <button [hidden]='has_crashed' [hidden]="moves == 0" (click)="crash()">crash</button>
    </div>

    <div [hidden]='!finished'>
      <div>
        <h2>You stacked {{user.moves}}</h2>

        <h2 [hidden]='user.time_left == 0'>But crashed with {{user.time_left | date:'mm:ss'}} left</h2>
      </div>

      <leaderboard [scores]="scoreboard" [hidden]='!nameAdded'></leaderboard>

      <button (click)="reset()">reset</button>
    </div>
  `
})
export class AppComponent implements OnInit {
  moved = false;
  crashed = false;
  resetted = false;
  finished = false;

  user:ScoreModel;

  scoreboard = [];

  started = false;

  countFrom = 5 * 6000;
  countDown = this.countFrom;
  timerModel = new TimerModel();
  timer = Observable.timer(0,500);
  timerSub = null;

  nameAdded = false;

  sounds:SoundsModel;

  startTimer() {
    this.timerModel.startTime = Date.now()
    this.timerSub = this.timer.subscribe( event => this.tick(this)) ;
  }

  tick(t){
    if (t.countDown < 1){
      this.user.time_left = Math.max(0,t.countDown);
      t.timerSub.unsubscribe();
      t.finished = true;
      this.sounds.gong.play();
      this.saveScore();
    } else {
      if (t.countDown > 0){
        var seconds_left = t.countFrom - (Date.now() - t.timerModel.startTime);
        t.countDown = seconds_left;
        t.timerModel.counter++;
      }
    }
  }

  addMove(){
    if (this.nameAdded){
      this.user.moves++
      //this.sounds.coin.play();

      if (this.user.moves == 1){
        this.startTimer();
      }
    }
  }

  documentKeyPress(event: KeyboardEvent){
    if(event.keyCode === 32){
      this.sounds.powerup.play();
    }
  }

  documentKeyUp(event: KeyboardEvent){
    if(event.keyCode === 13){
      this.addMove();
    }
    if(event.keyCode === 27){
      this.crash();
    }
  }

  crash(){
    if (!this.finished){ // can't keep crashing
      this.finished = true;
      this.user.time_left = Math.max(0,this.countDown);

      if (this.timerSub){
        this.timerSub.unsubscribe();
      }

      this.sounds.explosion.play();
      this.saveScore();
    }
  }

  reset(){
    this.moved = false;
    this.resetted = !this.resetted;
    this.finished = false;
    this.user = new ScoreModel();
    this.user.moves = 0;
    this.countDown = this.countFrom;
    this.nameAdded = false;
  }

  ngOnInit(){
    while(scoreboard==null){
      var scoreboard = JSON.parse(window.localStorage.getItem('scoreboard'));
      if (scoreboard == null){
        window.localStorage.setItem('scoreboard','[]')
      }
    }

    this.scoreboard = scoreboard.sort(function(a, b){ return b.score - a.score });

    this.user = new ScoreModel();
    this.user.moves = 0;

    this.sounds = new SoundsModel();
    this.sounds.gong = new Audio('dist/gong.wav');
    this.sounds.powerup = new Audio('dist/powerup.wav');
    this.sounds.coin = new Audio('dist/coin.wav');
    this.sounds.explosion = new Audio('dist/explosion.wav');
  }

  enteredName(){
    this.nameAdded = true;
  }

  saveScore(){
    var user = {
      email: this.user.email,
      nickname: this.user.nickname,
      time_left: this.user.time_left,
      score: this.user.moves,
      joineap:  this.user.joineap,
      launchnotify: this.user.launchnotify
    }

    // add user to scoreboard
    this.scoreboard.push(user);
    this.scoreboard = this.scoreboard.sort((n1,n2) => n2.score - n1.score);

    // serialize scoreboard to localStorage
    window.localStorage.setItem('scoreboard', JSON.stringify(this.scoreboard));
  }

}