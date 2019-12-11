"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvasComponent_1 = require("../VaregueJsEngine/GenericCanvasComponent");
class SnakeBodyCanvasComponent extends GenericCanvasComponent_1.GenericCanvasComponent {
    constructor() {
        super(...arguments);
        this.type = 1;
        this.spritePath = "./assets/green.png";
    }
    async aplyMoviment() {
        return;
    }
}
exports.SnakeBodyCanvasComponent = SnakeBodyCanvasComponent;
