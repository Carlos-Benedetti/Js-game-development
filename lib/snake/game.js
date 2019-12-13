"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keybordController_1 = require("../VaregueJsEngine/keybordController");
const snake_CanvasComponent_1 = require("./snake.CanvasComponent");
const Snake_GameArea_1 = require("./Snake.GameArea");
const globals_1 = require("../VaregueJsEngine/globals");
const snake_Fruit_CanvasComponent_1 = require("./snake.Fruit.CanvasComponent");
const args_1 = require("./args");
class gameMain {
    async start() {
        const canvas = new Snake_GameArea_1.SnakeGameArea();
        canvas.resolution = { height: 100, width: 100 };
        await canvas.load(args_1.staticVariables);
        const snake = new snake_CanvasComponent_1.SnakeCanvasComponent();
        snake.load(canvas);
        args_1.staticVariables.player = snake;
        const fruit = new snake_Fruit_CanvasComponent_1.SnakeFruitCanvasComponent();
        fruit.getSprite("./assets/red.jpg");
        fruit.load(canvas);
        args_1.staticVariables.fruit = fruit;
        const keybord = new keybordController_1.GenericKeybordControls();
        keybord.load(canvas);
        snake.addControl(keybord);
        canvas.start();
        snake.on(globals_1.SnakeComponentEvent.GOT_FRUIT, () => {
            const fruit = new snake_Fruit_CanvasComponent_1.SnakeFruitCanvasComponent();
            fruit.load(canvas);
            args_1.staticVariables.fruit = fruit;
        });
        canvas.on(globals_1.GameAreaEvent.GAME_OVER, () => {
            console.log("over");
            canvas.stop();
        });
    }
}
exports.gameMain = gameMain;
