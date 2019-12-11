"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvasComponent_1 = require("../VaregueJsEngine/GenericCanvasComponent");
const args_1 = require("../VaregueJsEngine/args");
const CollisionDetection_1 = require("../VaregueJsEngine/CollisionDetection");
class SnakeFruitCanvasComponent extends GenericCanvasComponent_1.GenericCanvasComponent {
    constructor() {
        super();
        this.spritePath = "./assets/red.jpg";
        this.type = 2;
    }
    async aplyMoviment() {
        return;
    }
    inPossX(x) {
        const bloacksWidht = args_1.staticVariables.gameArea.canvas.width / 10;
        return Math.floor((x) / 10) * bloacksWidht;
    }
    inPossY(x) {
        const cloackHeight = args_1.staticVariables.gameArea.canvas.height / 10;
        return Math.floor((x) / 10) * cloackHeight;
    }
    async load() {
        this.context = args_1.staticVariables.gameArea.context;
        args_1.staticVariables.gameArea.addComponent(this);
        await this.getSprite(this.spritePath);
        const colision = new CollisionDetection_1.CollisionDetection();
        const x = this.inPossX(Math.floor(Math.random() * args_1.staticVariables.gameArea.canvas.width));
        const y = this.inPossY(Math.floor(Math.random() * args_1.staticVariables.gameArea.canvas.height));
        this.x = x;
        this.y = y;
        while (!(await colision.testComponent(this))) {
            const x = Math.floor(Math.random() * args_1.staticVariables.gameArea.canvas.width);
            const y = Math.floor(Math.random() * args_1.staticVariables.gameArea.canvas.height);
            this.x = x;
            this.y = y;
        }
        return;
    }
}
exports.SnakeFruitCanvasComponent = SnakeFruitCanvasComponent;
