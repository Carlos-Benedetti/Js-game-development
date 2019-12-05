import { GenericCanvas } from "./GenericCanvas";
import { staticVariables } from "./args";

export class SnakeGameArea extends GenericCanvas<any>{
    name = "gameArea"
    constructor() {
        super();

        staticVariables.gameArea = this
    }
}