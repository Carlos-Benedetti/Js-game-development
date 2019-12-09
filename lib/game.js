"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snake_CanvasComponent_1 = require("./snake.CanvasComponent");
const Snake_GameArea_1 = require("./Snake.GameArea");
const globals_1 = require("./globals");
const snake_Fruit_CanvasComponent_1 = require("./snake.Fruit.CanvasComponent");
const args_1 = require("./args");
const SmartDumbIaController_1 = require("./SmartDumbIaController");
class gameMain {
    async start() {
        const canvas = new Snake_GameArea_1.SnakeGameArea();
        await canvas.load();
        const snake = new snake_CanvasComponent_1.SnakeCanvasComponent();
        snake.load();
        args_1.staticVariables.player = snake;
        const fruit = new snake_Fruit_CanvasComponent_1.SnakeFruitCanvasComponent();
        fruit.getSprite("./assets/red.jpg");
        fruit.load();
        args_1.staticVariables.fruit = fruit;
        const keybord = new SmartDumbIaController_1.SmartDumbIaController();
        keybord.load();
        snake.addControl(keybord);
        canvas.start();
        snake.on(globals_1.SnakeComponentEvent.GOT_FRUIT, () => {
            const fruit = new snake_Fruit_CanvasComponent_1.SnakeFruitCanvasComponent();
            fruit.load();
            args_1.staticVariables.fruit = fruit;
        });
        canvas.on(globals_1.GameAreaEvent.GAME_OVER, () => {
            console.log("over");
            canvas.stop();
        });
    }
}
exports.gameMain = gameMain;
