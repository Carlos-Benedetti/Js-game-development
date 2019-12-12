"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snake_CanvasComponent_1 = require("./snake.CanvasComponent");
const Snake_GameArea_1 = require("./Snake.GameArea");
const args_1 = require("./args");
class gameMain {
    async start() {
        const canvas = new Snake_GameArea_1.SnakeGameArea();
        await canvas.load(args_1.staticVariables);
        const snake = new snake_CanvasComponent_1.SnakeCanvasComponent();
        await snake.load(canvas);
        args_1.staticVariables.player = snake;
        // const fruit = new SnakeFruitCanvasComponent()
        // fruit.getSprite("./assets/red.jpg")
        // fruit.load(canvas)
        // staticVariables.fruit = fruit
        // const keybord = new SmartDumbIaController()
        // keybord.load()
        // snake.addControl(keybord)
        canvas.start();
        // snake.on(SnakeComponentEvent.GOT_FRUIT, () => {
        //     const fruit = new SnakeFruitCanvasComponent()
        //     fruit.load()
        //     staticVariables.fruit = fruit
        // })
        // canvas.on(GameAreaEvent.GAME_OVER, () => {
        //     console.log("over")
        //     canvas.stop()
        // })
    }
}
exports.gameMain = gameMain;
