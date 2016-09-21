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
            template: "\n\n    <h1>Leaderboard</h1>\n\n    <table>\n      <tr>\n        <th>Name</th>\n        <th>End Time</th>\n        <th>Moves</th>\n      </tr>\n      <tr *ngFor=\"let score of scores\">\n        <td>{{score.nickname}}</td>\n        <td>{{score.time_left | date:'mm:ss'}}</td>\n        <td>{{score.score}}</td>\n      </tr>\n    </table>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], LeaderboardComponent);
    return LeaderboardComponent;
}());
exports.LeaderboardComponent = LeaderboardComponent;
//# sourceMappingURL=leaderboard.component.js.map