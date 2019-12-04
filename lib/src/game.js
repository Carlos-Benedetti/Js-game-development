"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameArea_1 = require("./GameArea");
const square_1 = require("./square");
const keybordController_1 = require("./keybordController");
const snakeCanvasComponent_1 = require("../snake/snakeCanvasComponent");
class gameMain {
    async start() {
        const canvas = new GameArea_1.GameArea();
        await canvas.load();
        const snake = new snakeCanvasComponent_1.SnakeCanvasComponent();
        snake.load();
        const block = new square_1.square();
        block.x = 100;
        block.y = 100;
        block.height = 100;
        block.load();
        const keybord = new keybordController_1.GenericKeybordControls();
        keybord.load();
        snake.addControl(keybord);
        canvas.start();
    }
}
exports.gameMain = gameMain;