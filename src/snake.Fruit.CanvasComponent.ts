import { GenericCanvasComponent } from "./GenericCanvasComponent";
import { v4 } from 'uuid'
import { staticVariables } from "./args";
import { CollisionDetection } from "./CollisionDetection";
export interface bodyBlock {
    x: number
    y: number
    id: string
}
export class SnakeFruitCanvasComponent extends GenericCanvasComponent<any, any>{
    constructor() {
        super()
        this.spritePath = "./assets/red.jpg"
        this.type = 2
    }
    async aplyMoviment() {
        return
    }
    async load(): Promise<void> {
        this.context = staticVariables.gameArea.context;
        staticVariables.gameArea.addComponent(this)
        await this.getSprite()

        const colision = new CollisionDetection()
        const x = Math.floor(Math.random() * staticVariables.gameArea.canvas.width);
        const y = Math.floor(Math.random() * staticVariables.gameArea.canvas.height);
        this.x = x;
        this.y = y
        while (!(await colision.testComponent(this))) {
            console.log("on loop")
            const x = Math.floor(Math.random() * staticVariables.gameArea.canvas.width);
            const y = Math.floor(Math.random() * staticVariables.gameArea.canvas.height);
            this.x = x;
            this.y = y
        }
        return
    }

}