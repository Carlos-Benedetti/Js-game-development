import { GameArea } from "./GameArea";
import { GenericCanvasComponent } from "./GenericCanvasComponent";

export class staticVariables{
    static gameArea:GameArea =null 
    static player:GenericCanvasComponent<any,any> = null
    static fruit:GenericCanvasComponent<any,any> = null
}