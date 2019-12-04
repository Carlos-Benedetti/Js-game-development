import { GenericCanvas } from "./GenericCanvas";
import { staticVariables } from "./args";

export class SnakeGameArea extends GenericCanvas<any>{
    name = "gameArea"
    constructor() {
        super();
        this.tickSpeed = 1000
        staticVariables.gameArea = this
    }
}