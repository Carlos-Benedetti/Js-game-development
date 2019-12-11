import { GenericCanvasComponent } from "../VaregueJsEngine/GenericCanvasComponent";
import { v4 } from 'uuid'
export interface bodyBlock {
    x: number
    y: number
    id: string
}
export class SnakeBodyCanvasComponent extends GenericCanvasComponent<any,any>{
    public type=1
    spritePath = "./assets/green.png"
    async aplyMoviment(){
        return
    }
}