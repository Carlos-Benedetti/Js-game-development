import { GenericCanvasComponent } from "./GenericCanvasComponent";
import { v4 } from 'uuid'
export interface bodyBlock {
    x: number
    y: number
    id: string
}
export class SnakeCanvasComponent extends GenericCanvasComponent<any>{
    type:2
}