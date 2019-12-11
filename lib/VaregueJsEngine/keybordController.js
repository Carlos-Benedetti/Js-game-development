"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class GenericKeybordControls {
    constructor() {
        this._plusUp = new rxjs_1.Subject();
        this._plusDown = new rxjs_1.Subject();
        this._plusLeft = new rxjs_1.Subject();
        this._plusRight = new rxjs_1.Subject();
        this._minusUp = new rxjs_1.Subject();
        this._minusDown = new rxjs_1.Subject();
        this._minusLeft = new rxjs_1.Subject();
        this._minusRight = new rxjs_1.Subject();
    }
    async load() {
        await this.startListeningToKeybord();
        return;
    }
    stopListeningToKeybord() {
        throw new Error("Method not implemented.");
    }
    get plusUp() {
        return this._plusUp.asObservable();
    }
    ;
    get plusDown() {
        return this._plusDown.asObservable();
    }
    ;
    get plusLeft() {
        return this._plusLeft.asObservable();
    }
    ;
    get plusRight() {
        return this._plusRight.asObservable();
    }
    ;
    get minusUp() {
        return this._minusUp.asObservable();
    }
    ;
    get minusDown() {
        return this._minusDown.asObservable();
    }
    ;
    get minusLeft() {
        return this._minusLeft.asObservable();
    }
    ;
    get minusRight() {
        return this._minusRight.asObservable();
    }
    ;
    async startListeningToKeybord() {
        document.addEventListener('keydown', (e) => { this.keyDownHandler(e, true); }, false);
        document.addEventListener('keyup', (e) => { this.keyDownHandler(e, false); }, false);
    }
    keyDownHandler(event, down) {
        if (event.keyCode == 39) {
            event.preventDefault();
            down ? this._plusRight.next() : this._minusRight.next();
        }
        else if (event.keyCode == 37) {
            event.preventDefault();
            down ? this._plusLeft.next() : this._minusLeft.next();
        }
        if (event.keyCode == 40) {
            event.preventDefault();
            down ? this._plusDown.next() : this._minusDown.next();
        }
        else if (event.keyCode == 38) {
            event.preventDefault();
            down ? this._plusUp.next() : this._minusUp.next();
        }
    }
}
exports.GenericKeybordControls = GenericKeybordControls;
