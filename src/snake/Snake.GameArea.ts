import { GenericCanvas } from "../VaregueJsEngine/GenericCanvas";
import { staticVariables } from "./args";

export class SnakeGameArea extends GenericCanvas<any>{
    name = "gameArea"
    constructor() {
        super();
        staticVariables.gameArea = this
        this.tickSpeed = 100


    }
}