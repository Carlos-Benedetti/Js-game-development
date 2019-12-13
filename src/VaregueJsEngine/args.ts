import { GameArea } from "./GameArea";
import { GenericCanvasComponent } from "./GenericCanvasComponent";
import { GenericCanvas } from "./GenericCanvas";

export class staticVariables{
    static gameArea:GenericCanvas<any> =null 
    static player:GenericCanvasComponent<any,any> = null
    static fruit:GenericCanvasComponent<any,any> = null
}