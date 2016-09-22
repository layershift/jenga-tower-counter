"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var score_model_1 = require('./score.model');
var Rx_1 = require('rxjs/Rx');
var timer_model_1 = require('./timer.model');
var sounds_model_1 = require('./sounds.model');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/throttleTime');
var AppComponent = (function () {
    function AppComponent() {
        this.moved = false;
        this.crashed = false;
        this.resetted = false;
        this.finished = false;
        this.scoreboard = [];
        this.started = false;
        this.countFrom = 5 * 6000;
        this.countDown = this.countFrom;
        this.timerModel = new timer_model_1.TimerModel();
        this.timer = Rx_1.Observable.timer(0, 500);
        this.timerSub = null;
        this.nameAdded = false;
    }
    AppComponent.prototype.startTimer = function () {
        var _this = this;
        this.timerModel.startTime = Date.now();
        this.timerSub = this.timer.subscribe(function (event) { return _this.tick(_this); });
    };
    AppComponent.prototype.tick = function (t) {
        if (t.countDown < 1) {
            this.user.time_left = Math.max(0, t.countDown);
            t.timerSub.unsubscribe();
            t.finished = true;
            this.sounds.gong.play();
            this.saveScore();
        }
        else {
            if (t.countDown > 0) {
                var seconds_left = t.countFrom - (Date.now() - t.timerModel.startTime);
                t.countDown = seconds_left;
                t.timerModel.counter++;
            }
        }
    };
    AppComponent.prototype.addMove = function () {
        if (this.nameAdded) {
            this.user.moves++;
            //this.sounds.coin.play();
            if (this.user.moves == 1) {
                this.startTimer();
            }
        }
    };
    AppComponent.prototype.documentKeyPress = function (event) {
        if (event.keyCode === 32) {
            this.sounds.powerup.play();
        }
    };
    AppComponent.prototype.documentKeyUp = function (event) {
        if (event.keyCode === 13) {
            this.addMove();
        }
        if (event.keyCode === 27) {
            this.crash();
        }
    };
    AppComponent.prototype.crash = function () {
        if (!this.finished) {
            this.finished = true;
            this.user.time_left = Math.max(0, this.countDown);
            if (this.timerSub) {
                this.timerSub.unsubscribe();
            }
            this.sounds.explosion.play();
            this.saveScore();
        }
    };
    AppComponent.prototype.reset = function () {
        this.moved = false;
        this.resetted = !this.resetted;
        this.finished = false;
        this.user = new score_model_1.ScoreModel();
        this.user.moves = 0;
        this.countDown = this.countFrom;
        this.nameAdded = false;
    };
    AppComponent.prototype.ngOnInit = function () {
        while (scoreboard == null) {
            var scoreboard = JSON.parse(window.localStorage.getItem('scoreboard'));
            if (scoreboard == null) {
                window.localStorage.setItem('scoreboard', '[]');
            }
        }
        this.scoreboard = scoreboard.sort(function (a, b) { return b.score - a.score; });
        this.user = new score_model_1.ScoreModel();
        this.user.moves = 0;
        this.sounds = new sounds_model_1.SoundsModel();
        this.sounds.gong = new Audio('dist/gong.wav');
        this.sounds.powerup = new Audio('dist/powerup.wav');
        this.sounds.coin = new Audio('dist/coin.wav');
        this.sounds.explosion = new Audio('dist/explosion.wav');
    };
    AppComponent.prototype.enteredName = function () {
        this.nameAdded = true;
    };
    AppComponent.prototype.saveScore = function () {
        var user = {
            email: this.user.email,
            nickname: this.user.nickname,
            time_left: this.user.time_left,
            score: this.user.moves,
            joineap: this.user.joineap,
            launchnotify: this.user.launchnotify
        };
        // add user to scoreboard
        this.scoreboard.push(user);
        this.scoreboard = this.scoreboard.sort(function (n1, n2) { return n2.score - n1.score; });
        // serialize scoreboard to localStorage
        window.localStorage.setItem('scoreboard', JSON.stringify(this.scoreboard));
    };
    AppComponent = __decorate([
        core_1.Component({
            host: {
                '(document:keyup)': 'documentKeyUp($event)',
                '(document:keypress)': 'documentKeyPress($event)'
            },
            selector: 'my-app',
            template: "\n    <h1>Score Counter</h1>\n\n    <div class=\"container\" [hidden]='nameAdded'>\n      <form (submit)=\"enteredName()\">\n        <div class=\"form-group\">\n          <label for=\"name\">Enter your email:</label>\n          <input name=\"jenga_email\" type=\"email\" [(ngModel)]=\"user.email\" type=\"text\" class=\"form-control\" autocomplete='off' required />\n          <div *ngIf=\"user.email && user.email.indexOf('@') < 1\" class=\"alert alert-danger\">\n            Email is required\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"alterEgo\">Name</label>\n          <input name=\"nickname\" [(ngModel)]=\"user.nickname\" type=\"text\" class=\"form-control\" required />\n        </div>\n\n        Join EAP:\n        <input name=\"joineap\" [(ngModel)]=\"user.joineap\" type=\"checkbox\" class=\"form-control\" required />\n\n        Join launch notification list:\n        <input name=\"launchnotify\" [(ngModel)]=\"user.launchnotify\" type=\"checkbox\" class=\"form-control\" required />\n\n        <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n      </form>\n    </div>\n\n    <div [hidden]='finished || !nameAdded'>\n      <h2 [hidden]=\"countDown < 1\">{{countDown | date:'mm:ss'}}</h2>\n      <h2 [hidden]=\"countDown >= 1\">Finished</h2>\n\n      <h2>{{user.moves}}</h2>\n\n      <button [hidden]='has_crashed' (click)=\"addMove()\">+</button>\n      <button [hidden]='has_crashed' [hidden]=\"moves == 0\" (click)=\"crash()\">crash</button>\n    </div>\n\n    <div [hidden]='!finished'>\n      <div>\n        <h2>You stacked {{user.moves}}</h2>\n\n        <h2 [hidden]='user.time_left == 0'>But crashed with {{user.time_left | date:'mm:ss'}} left</h2>\n      </div>\n\n      <leaderboard [scores]=\"scoreboard\" [hidden]='!nameAdded'></leaderboard>\n\n      <button (click)=\"reset()\">reset</button>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map