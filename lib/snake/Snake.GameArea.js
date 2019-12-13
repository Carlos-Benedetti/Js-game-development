"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvas_1 = require("../VaregueJsEngine/GenericCanvas");
const args_1 = require("./args");
class SnakeGameArea extends GenericCanvas_1.GenericCanvas {
    constructor() {
        super();
        this.name = "gameArea";
        args_1.staticVariables.gameArea = this;
        this.tickSpeed = 100;
    }
}
exports.SnakeGameArea = SnakeGameArea;
