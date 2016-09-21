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
var core_3 = require('@angular/core');
var MovesComponent = (function () {
    function MovesComponent() {
        this.moved = new core_2.EventEmitter();
        this.crashed = new core_2.EventEmitter();
        this.has_crashed = false;
    }
    MovesComponent.prototype.addMove = function () {
        this.moves++;
        if (this.moves == 1) {
            this.moved.emit(this.moves);
        }
    };
    MovesComponent.prototype.ngOnChanges = function (map) {
        if (map.resetted && map.resetted.currentValue == true) {
            this.moves = 0;
            this.has_crashed = false;
        }
    };
    MovesComponent.prototype.crash = function () {
        this.has_crashed = true;
        this.crashed.emit(this.moves);
    };
    __decorate([
        core_3.Input(), 
        __metadata('design:type', Object)
    ], MovesComponent.prototype, "moves", void 0);
    __decorate([
        core_3.Input(), 
        __metadata('design:type', Object)
    ], MovesComponent.prototype, "resetted", void 0);
    MovesComponent = __decorate([
        core_1.Component({
            selector: 'moves',
            template: "\n    <h2>{{moves}}</h2>\n\n    <button [hidden]='has_crashed' (click)=\"addMove()\">+</button>\n    <button [hidden]='has_crashed' [hidden]=\"moves == 0\" (click)=\"crash()\">crash</button>\n\n    {{has_crashed}}/{{moves}}\n\n  ",
            outputs: ['moved', 'crashed']
        }), 
        __metadata('design:paramtypes', [])
    ], MovesComponent);
    return MovesComponent;
}());
exports.MovesComponent = MovesComponent;
//# sourceMappingURL=moves.component.js.map