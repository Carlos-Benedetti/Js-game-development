import { GameArea } from "./GameArea";
import { GenericCanvasComponent } from "./GenericCanvasComponent";
import { start } from "repl";
import { Subject } from "rxjs";
import { loading } from "./interfaces";
import { square } from "./square";
import { GenericKeybordControls } from "./keybordController";

export class gameMain {
    components: GenericCanvasComponent<any>[] = [];
    canvas: GameArea;
    _loadingSteps: Subject<loading> = new Subject();
    keybord: GenericKeybordControls<any>;
    async createGameArea() {
        this.canvas = new GameArea();
        
        await this.canvas.load()
        return 
    }
    async startLoading() {
        let counter = 0;
        
        for (const compoent of this.components) {
            this.canvas.addComponent(compoent)
            counter += 1;
            console.log(counter)
            this._loadingSteps.next({ number: counter, of: this.components.length });
            await compoent.load();
        }
    }
    async start() {
        const snake = new square()
        this.keybord = new GenericKeybordControls()
        this.keybord.load()
        snake.addControl(this.keybord)
        this.components.push(snake)
        await this.createGameArea()
        await this.startLoading()
        this.canvas.start();
    }
}
