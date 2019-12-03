"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvas_1 = require("./GenericCanvas");
const args_1 = require("./args");
class GameArea extends GenericCanvas_1.GenericCanvas {
    constructor() {
        super();
        this.name = "gameArea";
        args_1.staticVariables.gameArea = this;
    }
}
exports.GameArea = GameArea;
