import { GameArea } from "../VaregueJsEngine/GameArea";
import { GenericCanvasComponent } from "../VaregueJsEngine/GenericCanvasComponent";

export class staticVariables{
    public static gameArea:GameArea =null 
    static player:GenericCanvasComponent<any,any> = null
    static fruit:GenericCanvasComponent<any,any> = null
}