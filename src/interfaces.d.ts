import { Observable } from 'rxjs'

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
    PlusUp: Observable<boolean>
    PlusDown: Observable<boolean>
    PlusLeft: Observable<boolean>
    PlusRight: Observable<boolean>
    minusUp: Observable<boolean>
    minusDown: Observable<boolean>
    minusLeft: Observable<boolean>
    minusRight: Observable<boolean>

    keyMap: IKeyMap
    startListeningToKeybord(): Promise<void>
    stopListeningToKeybord(): Promise<void>
}
export interface IGenericCanvasComponent<T> extends canvasObject {
    context: CanvasRenderingContext2D
    control: IGenericKeybordControls<any>|null
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
    spritePath: string
    sprite: HTMLImageElement
    addControl<E extends IGenericKeybordControls<I>, I>(control: E): Promise<void>
    aplyMoviment(): Promise<void>
    getSprite(path: string): Promise<HTMLImageElement>
    create(width: number, height: number): Promise<void>
    willCollid(): Promise<boolean>
}

export interface IGenericCanvas<T> {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    intervarIndex: NodeJS.Timer
    tickSpeed: number
    aplyGravity: boolean
    gravity: number
    resolution: IResolution;
    updateTickSpeed(newTick: number): Promise<void>
    AdaptResolution(resolution: IResolution): Promise<void>
    start(): Promise<void>
    draw(): Promise<void>
    update(): Promise<void>
    addComponent<E extends IGenericCanvasComponent<I>, I>(component: E): Promise<void>
}