"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvasComponent_1 = require("./GenericCanvasComponent");
const args_1 = require("./args");
const CollisionDetection_1 = require("./CollisionDetection");
class SnakeFruitCanvasComponent extends GenericCanvasComponent_1.GenericCanvasComponent {
    constructor() {
        super();
        this.spritePath = "./assets/red.jpg";
        this.type = 2;
    }
    async aplyMoviment() {
        return;
    }
    async load() {
        this.context = args_1.staticVariables.gameArea.context;
        args_1.staticVariables.gameArea.addComponent(this);
        await this.getSprite();
        const colision = new CollisionDetection_1.CollisionDetection();
        const x = Math.floor(Math.random() * args_1.staticVariables.gameArea.canvas.width);
        const y = Math.floor(Math.random() * args_1.staticVariables.gameArea.canvas.height);
        this.x = x;
        this.y = y;
        while (!(await colision.testComponent(this))) {
            console.log("on loop");
            const x = Math.floor(Math.random() * args_1.staticVariables.gameArea.canvas.width);
            const y = Math.floor(Math.random() * args_1.staticVariables.gameArea.canvas.height);
            this.x = x;
            this.y = y;
        }
        return;
    }
}
exports.SnakeFruitCanvasComponent = SnakeFruitCanvasComponent;
