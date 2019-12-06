import { IResolution, IGenericCanvas, IGenericCanvasComponent } from "./interfaces";
import { staticVariables } from "./args";
import { Subject } from "rxjs";
import { GameAreaEvent } from "./globals";



export class GenericCanvas<T> implements IGenericCanvas<T>{
    unitX:number
    unitY:number
    _Event: Subject<GameAreaEvent> = new Subject()
    on(event: GameAreaEvent, action: Function) {
        this._Event.asObservable().subscribe(even => {
            if (event === even) {
                action()
            }
        })
    }
    emit(events: GameAreaEvent): void {
        this._Event.next(events)
    }
    components: IGenericCanvasComponent<any,any>[] = [];
    async stop() {
        if (this.intervarIndex) {
            clearInterval(this.intervarIndex)
        }
    }
    constructor(
        public canvas = document.createElement('canvas'),
        public intervarIndex: NodeJS.Timer = null,
        public tickSpeed: number = 10,
        public aplyGravity: boolean = false,
        public resolution: IResolution = { width: 100, height: 100 },
        public gravity: number = 9.8,
        public context = canvas.getContext('2d')
    ) { }

    async updateTickSpeed(newTick: number): Promise<void> {
        this.tickSpeed = newTick
        if (this.intervarIndex) {
            clearInterval(this.intervarIndex)
            this.start()
        }
        return

    }
    createComponent(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async AdaptResolution(resolution: IResolution): Promise<void> {
        this.resolution = resolution
        this.canvas.width = this.resolution.width
        this.canvas.height = this.resolution.height
        this.unitX = this.resolution.width /10
        this.unitY = this.resolution.height /10
    }
    async load() {
        await this.AdaptResolution(this.resolution)
        document.body.appendChild(this.canvas)
        return
    }
    async start(): Promise<void> {
        this.intervarIndex = setInterval(() => { this.update() }, this.tickSpeed)
        return
    }
    async draw(): Promise<void> {
        this.components.forEach(i => i.preDraw())
        for await (let component of this.components) {
            await component.draw()
        }
        this.components.forEach(i => i.postDraw())
        return
    }
    async update(): Promise<void> {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        await this.draw()
        return
    }
    async addComponent(component: IGenericCanvasComponent<any,any>): Promise<void> {
        this.components.push(component)
        return
    }

}