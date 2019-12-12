import { GenericCanvas } from "./GenericCanvas";
import { staticVariables } from "../snake/args";

export class GameArea extends GenericCanvas<any>{
    name = "gameArea"
    constructor() {
        super();
        staticVariables.gameArea = this
    }
}