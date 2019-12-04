import { GameArea } from "./GameArea";
import { GenericCanvasComponent } from "./GenericCanvasComponent";
import { start } from "repl";
import { Subject } from "rxjs";
import { loading } from "./interfaces";
import { square } from "./square";
import { GenericKeybordControls } from "./keybordController";
import { SnakeCanvasComponent } from "./snakeCanvasComponent";
import { SnakeGameArea } from "./Snake.GameArea";

export class gameMain {


    async start() {
        const canvas = new SnakeGameArea();
        await canvas.load()

        const snake = new SnakeCanvasComponent()
        snake.load()

        const block = new square()
        block.x = 100
        block.y = 100
        block.height= 100
        block.load()
        
        const keybord = new GenericKeybordControls()
        keybord.load()
        snake.addControl(keybord)
        
        canvas.start();
    }
}
