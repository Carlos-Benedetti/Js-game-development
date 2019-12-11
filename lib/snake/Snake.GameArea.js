"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvas_1 = require("../VaregueJsEngine/GenericCanvas");
const args_1 = require("../VaregueJsEngine/args");
class SnakeGameArea extends GenericCanvas_1.GenericCanvas {
    constructor() {
        super();
        this.name = "gameArea";
        this.tickSpeed = 10;
        args_1.staticVariables.gameArea = this;
    }
}
exports.SnakeGameArea = SnakeGameArea;
