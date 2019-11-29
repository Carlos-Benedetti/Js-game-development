import { IGenericCanvasComponent, IGenericKeybordControls } from "./interfaces";
import { MISSING_TEXTURE } from "./globals";
import { Subject, AsyncSubject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {v4} from 'uuid'

export class GenericCanvasComponent<T> implements IGenericCanvasComponent<T>{
    _control: IGenericKeybordControls<any>;

    events: Subject<any> = new AsyncSubject<any>()

    public get controls(): IGenericKeybordControls<any> {
        return this._control
    }
    public set control(v: IGenericKeybordControls<any>) {
        this.events.next(true);

        this._control = v;

        this.subscribeToEvents(this._control.PlusUp, () => { this.movingUp = true })
        this.subscribeToEvents(this._control.minusUp, () => { this.movingUp = false })

        this.subscribeToEvents(this._control.PlusDown, () => { this.movingDown = true })
        this.subscribeToEvents(this._control.minusDown, () => { this.movingDown = false })

        this.subscribeToEvents(this._control.PlusLeft, () => { this.movingLeft = true })
        this.subscribeToEvents(this._control.minusLeft, () => { this.movingLeft = false })

        this.subscribeToEvents(this._control.PlusRight, () => { this.movingRight = true })
        this.subscribeToEvents(this._control.minusRight, () => { this.movingRight = false })
    }

    context: CanvasRenderingContext2D = null;
    _spritePath: string = null

    public get spritePath(): string {
        return this._spritePath
    }
    public set spritePath(v: string) {
        this.getSprite(v)
        this._spritePath = v;
    }

    movingUp: boolean = false;
    movingDown: boolean = false;
    movingLeft: boolean = false;
    movingRight: boolean = false;

    upSpeed = 1;
    downSpeed = 1
    leftSpeed = 1
    rightSpeed = 1

    baseSpeed = 10
    sprite: HTMLImageElement = null
    constructor(
        public name: string = "Novo Component",
        public id: string= v4(),
        public width = 10,
        public height = 10,
        public x = 0,
        public y = 0,
    ) { }
    subscribeToEvents(observable: Observable<boolean>, action: (a: any) => any) {
        observable.pipe(takeUntil(this.events)).subscribe(action);
    }
    async addControl<E extends IGenericKeybordControls<I>, I>(control: E): Promise<void> {
        this.control = control
    }
    async create(width: number = this.width, height: number = this.height): Promise<void> {
        this.width = width
        this.height = height
        await this.getSprite()
        return
    }
    async aplyDirections(actions?: GenericCanvasComponent<T>['testWillColidWithRollBack']) {
        if (this.movingUp) {
            this.x += this.upSpeed * this.baseSpeed
            if (actions) actions('x', '+', 'this.upSpeed*this.baseSpeed')
        }
        if (this.movingDown) {
            this.x -= this.downSpeed * this.baseSpeed
            if (actions) actions('x', '-', 'this.downSpeed*this.baseSpeed')
        }
        if (this.movingRight) {
            this.y += this.rightSpeed * this.baseSpeed
            if (actions) actions('y', '+', 'this.rightSpeed*this.baseSpeed')
        }
        if (this.movingLeft) {
            this.y -= this.leftSpeed * this.baseSpeed
            if (actions) await actions('x', '-', 'this.leftSpeed*this.baseSpeed')
        }
        return

    }
    async testWillColidWithRollBack(axys: "x" | "y", mathAction: "-" | "+", action: string) {
        if (await this.willCollid()) {
            mathAction = mathAction === "-" ? '+' : '-'
            eval(axys + mathAction + action)
            return
        } else {
            return
        }
    }
    async aplyMoviment(): Promise<void> {
        const backX = this.x;
        const backY = this.y;

        this.aplyDirections()

        if (await this.willCollid()) {
            this.x = backX;
            this.y = backY

            await this.aplyDirections(this.testWillColidWithRollBack)
            return
        } else {
            return
        }
    }
    async willCollid(): Promise<boolean> {
        return false
        //TODO: throw new Error("Method not implemented.");
    }
    getSprite(path?: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            if (!this.sprite) {
                const sprite = new Image()
                sprite.src = path ? path : MISSING_TEXTURE.source
                sprite.onload = () => {
                    this.sprite = sprite
                    resolve(this.sprite)
                }
                sprite.onerror = () => {
                    reject()
                }
            }
            else {
                resolve(this.sprite)
            }
        })

    }
    async draw(): Promise<void> {
        if (this.context) {
            await this.aplyMoviment()
            this.context.drawImage(this.sprite, this.x, this.y, this.width, this.height)
            return
        } else {
            return
        }
    }


}