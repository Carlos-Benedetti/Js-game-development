import { IResolution, IGenericCanvas, IGenericCanvasComponent } from "./interfaces";
import { staticVariables } from "./args";



export class GenericCanvas<T> implements IGenericCanvas<T>{
    components: IGenericCanvasComponent<any>[] = [];

    constructor(
        public canvas = document.createElement('canvas'),
        public intervarIndex: NodeJS.Timer = null,
        public tickSpeed: number = 10,
        public aplyGravity: boolean = false,
        public resolution: IResolution = { width: 400, height: 400 },
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
    }
    async load(){
        await this.AdaptResolution(this.resolution)
        document.body.appendChild(this.canvas)
        return
    }
    async start(): Promise<void> {
        this.intervarIndex = setInterval(()=>{this.update()}, this.tickSpeed)
        return 
    }
    async draw(): Promise<void> {
        for await (let component of this.components) {
            await component.draw()
        }
        return
    }
    async update(): Promise<void> {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
        await this.draw()
        return
    }
    async addComponent(component: IGenericCanvasComponent<any>): Promise<void> {
        this.components.push(component)
        return
    }

}