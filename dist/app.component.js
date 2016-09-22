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
    }
    AppComponent.prototype.startTimer = function () {
        var _this = this;
        this.timerModel.startTime = Date.now();
        this.timerSub = this.timer.subscribe(function (event) { return _this.tick(_this); });
    };
    AppComponent.prototype.tick = function (t) {
        if (t.countDown < 1) {
            t.timerSub.unsubscribe();
            t.finished = true;
        }
        else {
            var seconds_left = this.countFrom - (Date.now() - t.timerModel.startTime);
            t.countDown = seconds_left;
            t.timerModel.counter++;
        }
    };
    AppComponent.prototype.addMove = function () {
        this.winner.moves++;
        if (this.winner.moves == 1) {
            this.startTimer();
        }
    };
    AppComponent.prototype.documentKeyUp = function (event) {
        if (event.keyCode === 13) {
        }
    };
    AppComponent.prototype.crash = function () {
        this.finished = true;
        this.winner.time_left = this.countDown;
        if (this.timerSub) {
            this.timerSub.unsubscribe();
        }
    };
    AppComponent.prototype.onMoved = function (e) {
        this.moved = true;
    };
    AppComponent.prototype.reset = function () {
        this.moved = false;
        this.resetted = !this.resetted;
        this.finished = false;
        this.winner = new score_model_1.ScoreModel();
        this.winner.moves = 0;
        this.countDown = this.countFrom;
    };
    AppComponent.prototype.ngOnInit = function () {
        while (scoreboard == null) {
            var scoreboard = JSON.parse(window.localStorage.getItem('scoreboard'));
            if (scoreboard == null) {
                window.localStorage.setItem('scoreboard', '[]');
            }
        }
        this.scoreboard = scoreboard.sort(function (a, b) { return b.score - a.score; });
        this.winner = new score_model_1.ScoreModel();
        this.winner.moves = 0;
    };
    AppComponent.prototype.enteredName = function () {
        // setup the user
        var user = {
            email: this.winner.email,
            nickname: this.winner.nickname,
            time_left: this.winner.time_left,
            score: this.winner.moves
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
                '(document:keyup)': 'documentKeyUp($event)'
            },
            selector: 'my-app',
            template: "\n    <h1>Score Counter</h1>\n\n    <div [hidden]='finished'>\n      <h2 [hidden]=\"countDown < 1\">{{countDown | date:'mm:ss'}}</h2>\n      <h2 [hidden]=\"countDown >= 1\">Finished</h2>\n\n      <h2>{{winner.moves}}</h2>\n\n      <button [hidden]='has_crashed' (click)=\"addMove()\">+</button>\n      <button [hidden]='has_crashed' [hidden]=\"moves == 0\" (click)=\"crash()\">crash</button>\n    </div>\n\n    <br/>\n\n    <div [hidden]='!finished'>\n      <h2>You stacked {{winner.moves}}</h2>\n      <h2 [hidden]='countDown == 0'>But crashed with {{countDown | date:'mm:ss'}} left</h2>\n\n      <div class=\"container\">\n          <form (submit)=\"enteredName()\">\n            <div class=\"form-group\">\n              <label for=\"name\">Enter your email:</label>\n              <input name=\"email\" [(ngModel)]=\"winner.email\" type=\"text\" class=\"form-control\" required>\n            </div>\n            <div class=\"form-group\">\n              <label for=\"alterEgo\">Nickname</label>\n              <input name=\"nickname\" [(ngModel)]=\"winner.nickname\" type=\"text\" class=\"form-control\" />\n            </div>\n            <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n          </form>\n      </div>\n\n      <leaderboard [scores]=\"scoreboard\"></leaderboard>\n\n      <button (click)=\"reset()\">reset</button>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map