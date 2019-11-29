import { IResolution, IGenericCanvas, IGenericCanvasComponent } from "./interfaces";



export class GenericCanvas<T> implements IGenericCanvas<T>{
    components: IGenericCanvasComponent<any>[] = [];

    constructor(
        public canvas = document.createElement('canvas'),
        public intervarIndex: NodeJS.Timer = null,
        public tickSpeed: number = 100,
        public aplyGravity: boolean = false,
        public resolution: IResolution = { width: 1024, height: 780 },
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
    async start(): Promise<void> {
        this.AdaptResolution(this.resolution)
        this.intervarIndex = setInterval(()=>{this.update()}, this.tickSpeed)
        document.body.appendChild(this.canvas)
        return
    }
    async draw(): Promise<void> {
        for await (let component of this.components) {
            console.log("Draw: "+component.name)
            await component.draw()
        }
        return
    }
    async update(): Promise<void> {
        await this.draw()
        return
    }
    async addComponent(component: IGenericCanvasComponent<any>): Promise<void> {
        component.context = this.context
        this.components = [component]
        return
    }

}