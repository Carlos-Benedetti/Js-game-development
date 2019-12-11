"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keybordController_1 = require("../VaregueJsEngine/keybordController");
const rxjs_1 = require("rxjs");
class SpaceShipController extends keybordController_1.GenericKeybordControls {
    constructor() {
        super(...arguments);
        this._plusTurnRight = new rxjs_1.Subject();
        this._plusTurnLeft = new rxjs_1.Subject();
        this._minusTurnRight = new rxjs_1.Subject();
        this._minusTurnLeft = new rxjs_1.Subject();
        this._minusFoward = new rxjs_1.Subject();
        this._plusFoward = new rxjs_1.Subject();
        this._minusBackward = new rxjs_1.Subject();
        this._plusBackward = new rxjs_1.Subject();
        this._minusShoot = new rxjs_1.Subject();
        this._plusShoot = new rxjs_1.Subject();
    }
    get plusTurnRight() {
        return this._plusTurnRight.asObservable();
    }
    ;
    get minusTurnRight() {
        return this._minusTurnRight.asObservable();
    }
    ;
    get plusTurnLeft() {
        return this._plusTurnLeft.asObservable();
    }
    ;
    get minusTurnLeft() {
        return this._minusTurnLeft.asObservable();
    }
    ;
    get plusFoward() {
        return this._plusFoward.asObservable();
    }
    ;
    get minusForward() {
        return this._minusFoward.asObservable();
    }
    ;
    get plusBackward() {
        return this._plusBackward.asObservable();
    }
    ;
    get minusBackward() {
        return this._minusBackward.asObservable();
    }
    ;
    get plusShoot() {
        return this._plusShoot.asObservable();
    }
    ;
    get minusShoot() {
        return this._minusShoot.asObservable();
    }
    ;
    keyDownHandler(event, down) {
        console.log(event.keyCode);
        if (event.keyCode == 32) {
            event.preventDefault();
            down ? this._plusShoot.next() : this._minusShoot.next();
        }
        if (event.keyCode == 38) {
            event.preventDefault();
            down ? this._plusFoward.next() : this._minusFoward.next();
        }
        else if (event.keyCode == 40) {
            event.preventDefault();
            down ? this._plusBackward.next() : this._minusBackward.next();
        }
        else if (event.keyCode == 37) {
            event.preventDefault();
            down ? this._plusTurnLeft.next() : this._minusTurnLeft.next();
        }
        else if (event.keyCode == 39) {
            event.preventDefault();
            down ? this._plusTurnRight.next() : this._minusTurnRight.next();
        }
    }
}
exports.SpaceShipController = SpaceShipController;
