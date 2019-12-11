import { GenericCanvas } from "../VaregueJsEngine/GenericCanvas";
import { staticVariables } from "../VaregueJsEngine/args";

export class SnakeGameArea extends GenericCanvas<any>{
    name = "gameArea"
    constructor() {
        super();
        this.tickSpeed = 10

        staticVariables.gameArea = this
    }
}