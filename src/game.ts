import { GameArea } from "./GameArea";
import { GenericCanvasComponent } from "./GenericCanvasComponent";
import { start } from "repl";
import { Subject } from "rxjs";
import { loading } from "./interfaces";
import { square } from "./square";
import { GenericKeybordControls } from "./keybordController";
import { SnakeCanvasComponent } from "./snake.CanvasComponent";
import { SnakeGameArea } from "./Snake.GameArea";
import { GameAreaEvent, SnakeComponentEvent } from "./globals";
import { SnakeFruitCanvasComponent } from "./snake.Fruit.CanvasComponent";
import { staticVariables } from "./args";
import { DumbIaController } from "./DumbIaController";
import { SmartDumbIaController } from "./SmartDumbIaController";

export class gameMain {


    async start() {
        const canvas = new SnakeGameArea();
        await canvas.load()

        const snake = new SnakeCanvasComponent()
        snake.load()
        staticVariables.player = snake


        const fruit = new SnakeFruitCanvasComponent()
        fruit.getSprite("./assets/red.jpg")
        fruit.load()
        staticVariables.fruit = fruit


        const keybord = new SmartDumbIaController()
        keybord.load()
        snake.addControl(keybord)

        canvas.start();

        snake.on(SnakeComponentEvent.GOT_FRUIT, () => {
            const fruit = new SnakeFruitCanvasComponent()
            fruit.load()
            staticVariables.fruit = fruit
        })
        canvas.on(GameAreaEvent.GAME_OVER, () => {
            console.log("over")
            canvas.stop()
        })
    }
}
