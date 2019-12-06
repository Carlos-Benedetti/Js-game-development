"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvasComponent_1 = require("./GenericCanvasComponent");
const uuid_1 = require("uuid");
const args_1 = require("./args");
const snake_Body_CanvasComponent_1 = require("./snake.Body.CanvasComponent");
const globals_1 = require("./globals");
class SnakeCanvasComponent extends GenericCanvasComponent_1.GenericCanvasComponent {
    constructor() {
        super(...arguments);
        this.bodyLenght = 1;
        this.bodyBlocks = [];
        this.baseSpeed = this.aplyResolution({ y: this.height }).y;
        this.spritePath = "./assets/green.png";
    }
    async addBodyBlock(x, y) {
        const component = new snake_Body_CanvasComponent_1.SnakeBodyCanvasComponent();
        component.id = uuid_1.v4();
        component.x = x;
        component.y = y;
        await component.load(this.width, this.height);
        this.bodyBlocks.push({
            x: x,
            y: y,
            id: component.id,
            component
        });
        console.log(this.bodyBlocks);
    }
    inPossX(x) {
        const bloacksWidht = args_1.staticVariables.gameArea.canvas.width / 10;
        return Math.floor((x) / 10) * bloacksWidht;
    }
    inPossY(x) {
        const cloackHeight = args_1.staticVariables.gameArea.canvas.height / 10;
        return Math.floor((x) / 10) * cloackHeight;
    }
    async aplyDirections(actions) {
        if (this.movingUp) {
            this.y -= this.upSpeed * this.baseSpeed;
            if (actions) {
                if (await this.willCollid()) {
                    this.y += this.inPossY(this.downSpeed * this.baseSpeed);
                }
            }
        }
        else if (this.movingDown) {
            this.y += this.downSpeed * this.baseSpeed;
            // debugger
            if (actions) {
                if (await this.willCollid()) {
                    this.y -= this.inPossY(this.downSpeed * this.baseSpeed);
                }
            }
        }
        else if (this.movingRight) {
            this.x += this.rightSpeed * this.baseSpeed;
            if (actions) {
                if (await this.willCollid()) {
                    this.x -= this.rightSpeed * this.baseSpeed;
                }
            }
        }
        else if (this.movingLeft) {
            this.x -= this.leftSpeed * this.baseSpeed;
            if (actions) {
                if (await this.willCollid()) {
                    this.x += this.rightSpeed * this.baseSpeed;
                }
            }
        }
        return;
    }
    async aplyMoviment() {
        const backX = this.x;
        const backY = this.y;
        this.aplyDirections();
        const colision = await this.willCollid();
        if (colision) {
            if (colision) {
                if (colision.type === 2) {
                    this.emit(globals_1.SnakeComponentEvent.GOT_FRUIT);
                    await this.addBodyBlock(backX, backY);
                    colision.kill();
                }
                if (colision.type === 1)
                    args_1.staticVariables.gameArea.emit(globals_1.GameAreaEvent.GAME_OVER);
                this.x = backX;
                this.y = backY;
                await this.aplyDirections(this.testWillColidWithRollBack.bind(this));
                return;
            }
            else {
                return;
            }
        }
    }
    async preDraw() {
        this.bodyBlocks.map((e, i, k) => {
            e.component.x = e.x;
            e.component.y = e.y;
        });
    }
    async draw() {
        if (this.context) {
            const oldX = this.x;
            const oldY = this.y;
            await this.aplyMoviment();
            if (oldX != this.x || oldY != this.y) {
                this.bodyBlocks = this.bodyBlocks.reverse().map((e, i, k) => {
                    if ((i + 1) === k.length) {
                        e.x = oldX;
                        e.y = oldY;
                    }
                    else {
                        e.x = k[i + 1].x;
                        e.y = k[i + 1].y;
                        e.component.x = e.x;
                    }
                    e.component.x = e.x;
                    e.component.y = e.y;
                    return e;
                }).reverse();
            }
            this.unitHeght = this.height;
            this.unitWidht = this.width;
            this.context.drawImage(this.sprite, this.x, this.y, this.unitWidht, this.unitHeght);
            return;
        }
        else {
            return;
        }
    }
}
exports.SnakeCanvasComponent = SnakeCanvasComponent;
