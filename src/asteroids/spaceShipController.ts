import { GenericKeybordControls } from "../VaregueJsEngine/keybordController";
import { Observable, Subject } from "rxjs";

export class SpaceShipController extends GenericKeybordControls<any>{
    _plusTurnRight: Subject<boolean> = new Subject()
    _plusTurnLeft: Subject<boolean> = new Subject()
    _minusTurnRight: Subject<boolean> = new Subject()
    _minusTurnLeft: Subject<boolean> = new Subject()
    _minusFoward: Subject<boolean> = new Subject()
    _plusFoward: Subject<boolean> = new Subject()
    _minusBackward: Subject<boolean> = new Subject()
    _plusBackward: Subject<boolean> = new Subject()
    _minusShoot: Subject<boolean> = new Subject()
    _plusShoot: Subject<boolean> = new Subject()

    get plusTurnRight(): Observable<boolean> {
        return this._plusTurnRight.asObservable()
    };
    get minusTurnRight(): Observable<boolean> {
        return this._minusTurnRight.asObservable()
    };

    get plusTurnLeft(): Observable<boolean> {
        return this._plusTurnLeft.asObservable()
    };
    get minusTurnLeft(): Observable<boolean> {
        return this._minusTurnLeft.asObservable()
    };
    get plusFoward(): Observable<boolean> {
        return this._plusFoward.asObservable()
    };
    get minusForward(): Observable<boolean> {
        return this._minusFoward.asObservable()
    };
    get plusBackward(): Observable<boolean> {
        return this._plusBackward.asObservable()
    };
    get minusBackward(): Observable<boolean> {
        return this._minusBackward.asObservable()
    };
    get plusShoot(): Observable<boolean> {
        return this._plusShoot.asObservable()
    };
    get minusShoot(): Observable<boolean> {
        return this._minusShoot.asObservable()
    };


    keyDownHandler(event: any, down: boolean) {
        console.log(event.keyCode)
        if (event.keyCode == 32) {
            event.preventDefault();
            down ? this._plusShoot.next() : this._minusShoot.next()
        }
        if (event.keyCode == 38) {
            event.preventDefault();
            down ? this._plusFoward.next() : this._minusFoward.next()
        }
        else if (event.keyCode == 40) {
            event.preventDefault();
            down ? this._plusBackward.next() : this._minusBackward.next()
        }
        else if (event.keyCode == 37) {
            event.preventDefault();
            down ? this._plusTurnLeft.next() : this._minusTurnLeft.next()
        }
        else if (event.keyCode == 39) {
            event.preventDefault();
            down ? this._plusTurnRight.next() : this._minusTurnRight.next()
        }
    }
}