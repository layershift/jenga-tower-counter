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
var TimerComponent = (function () {
    function TimerComponent() {
        this.finished = new core_3.EventEmitter();
    }
    TimerComponent.prototype.tick = function (t) {
        if (t.countDown < 1) {
            t.timerSub.unsubscribe();
            t.finished.emit(seconds_left);
        }
        else {
            var seconds_left = this.countFrom - (Date.now() - t.timerModel.startTime);
            t.countDown = seconds_left;
            t.timerModel.counter++;
        }
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], TimerComponent.prototype, "start", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], TimerComponent.prototype, "crash", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], TimerComponent.prototype, "reset", void 0);
    TimerComponent = __decorate([
        core_1.Component({
            selector: 'timer',
            template: "\n\n  ",
            outputs: ['finished']
        }), 
        __metadata('design:paramtypes', [])
    ], TimerComponent);
    return TimerComponent;
}());
exports.TimerComponent = TimerComponent;
//# sourceMappingURL=timer.component.js.map