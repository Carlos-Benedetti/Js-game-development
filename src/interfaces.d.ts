import { Observable } from 'rxjs'
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
    load():Promise<void>
    startListeningToKeybord(): Promise<void>
    stopListeningToKeybord(): Promise<void>
}
export interface IGenericCanvasComponent<T> extends canvasObject {
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
    kill():Promise<void>
    addControl<E extends IGenericKeybordControls<I>, I>(control: E): Promise<void>
    aplyMoviment(): Promise<void>
    getSprite(path: string): Promise<HTMLImageElement>
    load(width: number, height: number): Promise<void>
    preDraw():Promise<void>
    draw(): Promise<void>
    postDraw():Promise<void>
    willCollid<E extends IGenericCanvasComponent<I>, I>(): Promise<IGenericCanvasComponent<E>|false>
}

export interface IGenericCanvas<T> {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    intervarIndex: NodeJS.Timer
    tickSpeed: number
    aplyGravity: boolean
    gravity: number
    resolution: IResolution;
    load():Promise<void>
    updateTickSpeed(newTick: number): Promise<void>
    AdaptResolution(resolution: IResolution): Promise<void>
    start(): Promise<void>
    draw(): Promise<void>
    update(): Promise<void>
    addComponent<E extends IGenericCanvasComponent<I>, I>(component: E): Promise<void>
}