import { SnakeCanvasComponent } from "./snake.CanvasComponent"
import { SnakeFruitCanvasComponent } from "./snake.Fruit.CanvasComponent"
import { SnakeGameArea } from "./Snake.GameArea"



export class staticVariables{
    static gameArea:SnakeGameArea=null 
    static player:SnakeCanvasComponent = null
    static fruit:SnakeFruitCanvasComponent = null
}