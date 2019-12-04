import { GenericCanvasComponent } from "./GenericCanvasComponent";
import { v4 } from 'uuid'
export interface bodyBlock {
    x: number
    y: number
    id: string
}
export class SnakeBodyCanvasComponent extends GenericCanvasComponent<any>{
    type:1
}