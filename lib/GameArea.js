"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvas_1 = require("./GenericCanvas");
class GameArea extends GenericCanvas_1.GenericCanvas {
    constructor() {
        super(...arguments);
        this.name = "gameArea";
    }
}
exports.GameArea = GameArea;
