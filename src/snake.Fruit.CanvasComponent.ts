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
    inPossX(x:number){
        const bloacksWidht = staticVariables.gameArea.canvas.width /10
        return Math.floor((x)/10)*bloacksWidht
    }
    inPossY(x:number){
        const cloackHeight = staticVariables.gameArea.canvas.height /10
        return Math.floor((x)/10)*cloackHeight
    }
    async load(): Promise<void> {
        this.context = staticVariables.gameArea.context;
        staticVariables.gameArea.addComponent(this)
        await this.getSprite(this.spritePath)

        const colision = new CollisionDetection()
        const x = this.inPossX(Math.floor(Math.random() * staticVariables.gameArea.canvas.width));
        const y = this.inPossY(Math.floor(Math.random() * staticVariables.gameArea.canvas.height))
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