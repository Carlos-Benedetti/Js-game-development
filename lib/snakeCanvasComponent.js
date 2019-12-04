"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvasComponent_1 = require("./GenericCanvasComponent");
const uuid_1 = require("uuid");
class SnakeCanvasComponent extends GenericCanvasComponent_1.GenericCanvasComponent {
    constructor() {
        super(...arguments);
        this.bodyLenght = 1;
        this.bodyBlocks = [];
        this.baseSpeed = this.height;
    }
    addBodyBlock() {
        this.bodyBlocks.push({
            x: this.x,
            y: this.y,
            id: uuid_1.v4()
        });
    }
    async aplyDirections(actions) {
        if (this.movingUp) {
            this.y -= this.upSpeed * this.baseSpeed;
            if (actions) {
                if (await this.willCollid()) {
                    this.y += this.downSpeed * this.baseSpeed;
                }
            }
        }
        else if (this.movingDown) {
            this.y += this.downSpeed * this.baseSpeed;
            if (actions) {
                if (await this.willCollid()) {
                    this.y -= this.downSpeed * this.baseSpeed;
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
            this.x = backX;
            this.y = backY;
            await this.aplyDirections(this.testWillColidWithRollBack.bind(this));
            return;
        }
        else {
            return;
        }
    }
    async draw() {
        if (this.context) {
            const oldX = this.x;
            const oldY = this.y;
            await this.aplyMoviment();
            if (oldX != this.x || oldY != this.y) {
                this.bodyBlocks.push({ x: oldX, y: oldY, id: uuid_1.v4() });
                this.bodyBlocks.reverse().map((e, i, k) => {
                    if ((i + 1) === k.length) {
                        e.x = oldX;
                        e.y = oldY;
                    }
                    else {
                        e.x = k[i].x;
                        e.y = k[i].y;
                    }
                    return e;
                });
            }
            this.context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
            this.bodyBlocks.forEach(i => {
                this.context.drawImage(this.sprite, i.x, i.y, this.width, this.height);
            });
            return;
        }
        else {
            return;
        }
    }
}
exports.SnakeCanvasComponent = SnakeCanvasComponent;
