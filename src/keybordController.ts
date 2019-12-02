import { IGenericKeybordControls, IKeyMap } from "./interfaces";
import { Observable, Subject } from "rxjs";

export class GenericKeybordControls<T> implements IGenericKeybordControls<T>{
    async load(){
        await this.startListeningToKeybord()
        return 
    }
    stopListeningToKeybord(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    get plusUp(): Observable<boolean> {
        return this._plusUp.asObservable()
    };
    get plusDown(): Observable<boolean> {
        return this._plusDown.asObservable()
    };
    get plusLeft(): Observable<boolean> {
        return this._plusLeft.asObservable()
    };
    get plusRight(): Observable<boolean> {
        return this._plusRight.asObservable()
    };
    get minusUp(): Observable<boolean> {
        return this._minusUp.asObservable()
    };
    get minusDown(): Observable<boolean> {
        return this._minusDown.asObservable()
    };
    get minusLeft(): Observable<boolean> {
        return this._minusLeft.asObservable()
    };
    get minusRight(): Observable<boolean> {
        return this._minusRight.asObservable()
    };
    async startListeningToKeybord() {
        document.addEventListener('keydown', (e) => { this.keyDownHandler(e, true) }, false);
        document.addEventListener('keyup', (e) => { this.keyDownHandler(e, false) }, false);
    }
    keyMap: IKeyMap;

    _plusUp: Subject<boolean> = new Subject()
    _plusDown: Subject<boolean> = new Subject()
    _plusLeft: Subject<boolean> = new Subject()
    _plusRight: Subject<boolean> = new Subject()
    _minusUp: Subject<boolean> = new Subject()
    _minusDown: Subject<boolean> = new Subject()
    _minusLeft: Subject<boolean> = new Subject()
    _minusRight: Subject<boolean> = new Subject()




    keyDownHandler(event: any, down: boolean) {
        if (event.keyCode == 39) {
            down ? this._plusRight.next() : this._minusRight.next()
        }
        else if (event.keyCode == 37) {
            down ? this._plusLeft.next() : this._minusLeft.next()
        }
        if (event.keyCode == 40) {
            down ? this._plusDown.next() : this._minusDown.next()
        }
        else if (event.keyCode == 38) {
            down ? this._plusUp.next() : this._minusUp.next()
        }
    }
}