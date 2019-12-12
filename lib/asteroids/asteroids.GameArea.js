"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvas_1 = require("../VaregueJsEngine/GenericCanvas");
const args_1 = require("./args");
class AsteroidsGameArea extends GenericCanvas_1.GenericCanvas {
    constructor() {
        super();
        this.resolution = { width: 300, height: 300 };
        args_1.staticVariables.gameArea = this;
    }
}
exports.AsteroidsGameArea = AsteroidsGameArea;
