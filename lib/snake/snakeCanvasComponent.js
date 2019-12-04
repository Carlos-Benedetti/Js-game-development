"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvasComponent_1 = require("../GenericCanvasComponent");
const uuid_1 = require("uuid");
class SnakeCanvasComponent extends GenericCanvasComponent_1.GenericCanvasComponent {
    constructor() {
        super(...arguments);
        this.bodyLenght = 1;
        this.bodyBlocks = [];
    }
    addBodyBlock() {
        this.bodyBlocks.push({
            x: this.x,
            y: this.y,
            id: uuid_1.v4()
        });
    }
    async draw() {
        if (this.context) {
            const oldX = this.x;
            const oldY = this.y;
            await this.aplyMoviment();
            if (oldX != this.x || oldY != this.y) {
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
            debugger;
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
