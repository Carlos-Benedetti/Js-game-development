import { GenericCanvas } from "../VaregueJsEngine/GenericCanvas";
import { staticVariables } from "./args";

export class AsteroidsGameArea extends GenericCanvas<any>{
    constructor(){
        super()
        staticVariables.gameArea = this
    }
}