"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameArea_1 = require("./GameArea");
const rxjs_1 = require("rxjs");
const square_1 = require("./square");
const keybordController_1 = require("./keybordController");
class gameMain {
    constructor() {
        this.components = [];
        this._loadingSteps = new rxjs_1.Subject();
    }
    async createGameArea() {
        this.canvas = new GameArea_1.GameArea();
        await this.canvas.load();
        return;
    }
    async startLoading() {
        let counter = 0;
        for (const compoent of this.components) {
            this.canvas.addComponent(compoent);
            counter += 1;
            console.log(counter);
            this._loadingSteps.next({ number: counter, of: this.components.length });
            await compoent.load();
        }
    }
    async start() {
        const snake = new square_1.square();
        this.keybord = new keybordController_1.GenericKeybordControls();
        this.keybord.load();
        snake.addControl(this.keybord);
        this.components.push(snake);
        await this.createGameArea();
        await this.startLoading();
        this.canvas.start();
    }
}
exports.gameMain = gameMain;
