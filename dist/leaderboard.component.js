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
var core_2 = require('@angular/core');
var LeaderboardComponent = (function () {
    function LeaderboardComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LeaderboardComponent.prototype, "scores", void 0);
    LeaderboardComponent = __decorate([
        core_2.Component({
            selector: 'leaderboard',
            template: "\n<table class=\"mdl-data-table mdl-js-data-table mdl-shadow--2dp\" style=\"height: 290px;\">\n  <thead>\n    <tr>\n      <th class=\"mdl-data-table__cell--non-numeric\">Name</th>\n      <th>End Time</th>\n      <th>Moves</th>\n    </tr>\n  </thead>\n  <tbody style=\"color: #777777;\">\n    <tr *ngFor=\"let score of scores.slice(0,5)\">\n      <td class=\"mdl-data-table__cell--non-numeric\">{{score.nickname}}</td>\n      <td>{{score.time_left | date:'mm:ss'}}</td>\n      <td>{{score.score}}</td>\n    </tr>\n  </tbody>\n</table>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], LeaderboardComponent);
    return LeaderboardComponent;
}());
exports.LeaderboardComponent = LeaderboardComponent;
//# sourceMappingURL=leaderboard.component.js.map