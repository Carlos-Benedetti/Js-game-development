import { GameArea } from "../VaregueJsEngine/GameArea";
import { GenericCanvasComponent } from "../VaregueJsEngine/GenericCanvasComponent";
import { start } from "repl";
import { Subject } from "rxjs";
import { loading } from "../VaregueJsEngine/interfaces";
import { square } from "../VaregueJsEngine/square";
import { GenericKeybordControls } from "../VaregueJsEngine/keybordController";
import { SnakeCanvasComponent } from "./snake.CanvasComponent";
import { SnakeGameArea } from "./Snake.GameArea";
import { GameAreaEvent, SnakeComponentEvent } from "../VaregueJsEngine/globals";
import { SnakeFruitCanvasComponent } from "./snake.Fruit.CanvasComponent";
import { staticVariables } from "../VaregueJsEngine/args";
import { DumbIaController } from "./DumbIaController";
import { SmartDumbIaController } from "./SmartDumbIaController";

export class gameMain {


    async start() {
        const canvas = new SnakeGameArea();
        await canvas.load(staticVariables)

        const snake = new SnakeCanvasComponent()
        snake.load(canvas)
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
