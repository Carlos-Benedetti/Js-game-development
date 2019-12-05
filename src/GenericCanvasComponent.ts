import { IGenericCanvasComponent, IGenericKeybordControls } from "./interfaces";
import { MISSING_TEXTURE } from "./globals";
import { Subject, AsyncSubject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { v4 } from 'uuid'
import { staticVariables } from './args'

export class GenericCanvasComponent<T,EVENTTYPES> implements IGenericCanvasComponent<T,EVENTTYPES>{
    _Event: Subject<EVENTTYPES> = new Subject()
    on(event: EVENTTYPES, action: Function) {
        this._Event.asObservable().subscribe(even => {
            if (event === even) {
                action()
            }
        })
    }
    emit(events: EVENTTYPES): void {
        console.log(this.name+" Emitted: "+events)
        this._Event.next(events)
    }
    async preDraw(): Promise<void> {
        return 
    }
    async postDraw(): Promise<void> {
        return
    }
    _control: IGenericKeybordControls<any>;

    events: Subject<any> = new AsyncSubject<any>()

    public get controls(): IGenericKeybordControls<any> {
        return this._control
    }
    public set control(v: IGenericKeybordControls<any>) {
        this.events.next(true);

        this._control = v;

        this.subscribeToEvents(this._control.plusUp, () => { this.movingUp = true })
        this.subscribeToEvents(this._control.minusUp, () => { this.movingUp = false })

        this.subscribeToEvents(this._control.plusDown, () => { this.movingDown = true })
        this.subscribeToEvents(this._control.minusDown, () => { this.movingDown = false })

        this.subscribeToEvents(this._control.plusLeft, () => { this.movingLeft = true })
        this.subscribeToEvents(this._control.minusLeft, () => { this.movingLeft = false })

        this.subscribeToEvents(this._control.plusRight, () => { this.movingRight = true })
        this.subscribeToEvents(this._control.minusRight, () => { this.movingRight = false })
    }

    context: CanvasRenderingContext2D = null
    _spritePath: string = null

    public get spritePath(): string {
        return this._spritePath
    }
    public set spritePath(v: string) {
        this.getSprite(v)
        this._spritePath = v;
    }

    movingUp: boolean
    movingDown: boolean
    movingLeft: boolean
    movingRight: boolean

    upSpeed = 1;
    downSpeed = 1
    leftSpeed = 1
    rightSpeed = 1
    type:number
    baseSpeed = 1
    sprite: HTMLImageElement = null
    constructor(
        public name: string = "Novo Component",
        public id: string = v4(),
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
    async load(width: number = this.width, height: number = this.height): Promise<void> {
        this.context = staticVariables.gameArea.context;
        staticVariables.gameArea.addComponent(this)
        this.width = width
        this.height = height
        await this.getSprite()
        return
    }
    async kill(){
        staticVariables.gameArea.components = staticVariables.gameArea.components.filter(i=> i.id !== this.id)
        return 
    }
    async aplyDirections(actions?: GenericCanvasComponent<T,EVENTTYPES>['testWillColidWithRollBack']) {

        if (this.movingUp) {
            this.y -= this.upSpeed * this.baseSpeed
            if (actions) {
                if(await this.willCollid()){
                    this.y += this.downSpeed * this.baseSpeed
                }
            }
        }
        if (this.movingDown) {
            this.y += this.downSpeed * this.baseSpeed
            if (actions) {
                if(await this.willCollid()){
                    console.log("reverting")
                    this.y -= this.downSpeed * this.baseSpeed
                }
            }
        }
        if (this.movingRight) {
            this.x += this.rightSpeed * this.baseSpeed
            if (actions) {
                if(await this.willCollid()){
                    this.x -= this.rightSpeed * this.baseSpeed
                }
            }
        }
        if (this.movingLeft) {
            this.x -= this.leftSpeed * this.baseSpeed
            if (actions) {
                if(await this.willCollid()){
                    this.x += this.rightSpeed * this.baseSpeed
                }
            }
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
            console.log(await this.willCollid())
            this.x = backX;
            this.y = backY

            await this.aplyDirections(this.testWillColidWithRollBack.bind(this))
            return
        } else {
            return
        }
    }
    willCollid<E extends IGenericCanvasComponent<I,EVENTTYPES>, I>(): Promise<IGenericCanvasComponent<E,EVENTTYPES>> {
        return new Promise(resolve => {
            const x = this.x
            const y = this.y
            const width = this.width
            const height = this.height
            staticVariables.gameArea.components.forEach((object2, i, k) => {
                if ((object2.id !== this.id) && this.x < object2.x + object2.width && this.x + this.width > object2.x &&
                    this.y < object2.y + object2.height && this.y + this.height > object2.y) {
                    resolve(object2)
                } else if ((i + 1) === k.length) {
                    resolve(null)
                }
            })
        })
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
            await this.getSprite()
            this.context.drawImage(this.sprite, this.x, this.y, this.width, this.height)
            return
        } else {
            return
        }
    }


}