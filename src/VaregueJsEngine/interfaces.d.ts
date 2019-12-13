import { Observable } from 'rxjs'
import { GameAreaEvent } from './globals';
import { GenericCanvas } from './GenericCanvas';
export interface loading {
    number: number
    of: number
}
export interface IResolution {
    width: number
    height: number
}
interface canvasObject {
    width: number,
    height: number,
    x: number,
    y: number
    draw(): Promise<void>
}
export interface IKeyMap {
    up: number,
    down: number,
    left: number,
    right: number
}
export interface IGenericKeybordControls<T> {
    plusUp: Observable<boolean>
    plusDown: Observable<boolean>
    plusLeft: Observable<boolean>
    plusRight: Observable<boolean>
    minusUp: Observable<boolean>
    minusDown: Observable<boolean>
    minusLeft: Observable<boolean>
    minusRight: Observable<boolean>

    keyMap: IKeyMap
    load(canvas:GenericCanvas<any>):Promise<void>
    startListeningToKeybord(canvas:GenericCanvas<any>): Promise<void>
    stopListeningToKeybord(): Promise<void>
}
export interface IGenericCanvasComponent<T,EVENTTYPES> extends canvasObject {
    context: CanvasRenderingContext2D
    control: IGenericKeybordControls<any> | null
    movingUp: boolean
    movingDown: boolean
    movingLeft: boolean
    movingRight: boolean

    upSpeed: number
    downSpeed: number
    leftSpeed: number
    rightSpeed: number

    baseSpeed: number
    name: string
    id: string
    type:number
    spritePath: string
    sprite: HTMLImageElement
    unitHeght:number
    unitWidht:number
    kill():Promise<void>
    addControl<E extends IGenericKeybordControls<I>, I>(control: E): Promise<void>
    aplyMoviment(): Promise<void>
    getSprite(path: string): Promise<HTMLImageElement>
    load(gameArea:IGenericCanvas<any>): Promise<void>
    preDraw():Promise<void>
    draw(): Promise<void>
    postDraw():Promise<void>
    willCollid<E extends IGenericCanvasComponent<I,EVENTTYPES>, I>(): Promise<IGenericCanvasComponent<E,EVENTTYPES>|{type:string}|false>
}

export interface IGenericCanvas<T> {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    intervarIndex: NodeJS.Timer
    tickSpeed: number
    aplyGravity: boolean
    gravity: number
    resolution: IResolution;
    unitX:number
    unitY:number
    gameContext:any
    load(gameContext:any):Promise<void>
    updateTickSpeed(newTick: number): Promise<void>
    AdaptResolution(resolution: IResolution): Promise<void>
    start(): Promise<void>
    stop():Promise<void>
    draw(): Promise<void>
    update(): Promise<void>
    addComponent<E extends IGenericCanvasComponent<I,any>, I>(component: E): Promise<void>
    emit(events:GameAreaEvent):void
    on(event:GameAreaEvent,action:()=>{}):void
}