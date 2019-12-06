"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keybordController_1 = require("./keybordController");
const snake_CanvasComponent_1 = require("./snake.CanvasComponent");
const Snake_GameArea_1 = require("./Snake.GameArea");
const globals_1 = require("./globals");
const snake_Fruit_CanvasComponent_1 = require("./snake.Fruit.CanvasComponent");
class gameMain {
    async start() {
        const canvas = new Snake_GameArea_1.SnakeGameArea();
        await canvas.load();
        const snake = new snake_CanvasComponent_1.SnakeCanvasComponent();
        snake.load();
        const fruit = new snake_Fruit_CanvasComponent_1.SnakeFruitCanvasComponent();
        fruit.getSprite("./assets/red.jpg");
        fruit.load();
        console.log(fruit.x);
        const keybord = new keybordController_1.GenericKeybordControls();
        keybord.load();
        snake.addControl(keybord);
        canvas.start();
        setInterval(() => {
            console.log(canvas.components);
        }, 200);
        snake.on(globals_1.SnakeComponentEvent.GOT_FRUIT, () => {
            new snake_Fruit_CanvasComponent_1.SnakeFruitCanvasComponent().load();
        });
        canvas.on(globals_1.GameAreaEvent.GAME_OVER, () => {
            console.log("over");
            canvas.stop();
        });
    }
}
exports.gameMain = gameMain;
