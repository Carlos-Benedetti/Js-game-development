"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvas_1 = require("./GenericCanvas");
const args_1 = require("./args");
class SnakeGameArea extends GenericCanvas_1.GenericCanvas {
    constructor() {
        super();
        this.name = "gameArea";
        this.tickSpeed = 1000;
        args_1.staticVariables.gameArea = this;
    }
}
exports.SnakeGameArea = SnakeGameArea;
