import { GenericCanvas } from "../VaregueJsEngine/GenericCanvas";
import { staticVariables } from "./args";
import { IResolution } from "../VaregueJsEngine/interfaces";

export class AsteroidsGameArea extends GenericCanvas<any>{
    resolution:IResolution ={width:300,height:300}
    constructor(){
        super()
        staticVariables.gameArea = this
    }
}