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

export class gameMain {


    async start() {
        const canvas = new SnakeGameArea();
        await canvas.load()

        const snake = new SnakeCanvasComponent()
        snake.load()

        const fruit = new SnakeFruitCanvasComponent()
        fruit.getSprite("./assets/red.jpg")
        fruit.load()
        console.log(fruit.x)
        
        const keybord = new GenericKeybordControls()
        keybord.load()
        snake.addControl(keybord)
        
        canvas.start();

        snake.on(SnakeComponentEvent.GOT_FRUIT, ()=>{
            new SnakeFruitCanvasComponent().load()
        })
        canvas.on(GameAreaEvent.GAME_OVER, ()=>{
            console.log("over")
            canvas.stop()
        })
    }
}
