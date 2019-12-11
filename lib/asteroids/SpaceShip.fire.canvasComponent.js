"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericCanvasComponent_1 = require("../VaregueJsEngine/GenericCanvasComponent");
class SpaceShipFireCanvasComponent extends GenericCanvasComponent_1.GenericCanvasComponent {
    constructor() {
        super(...arguments);
        this.spritePath = "./assets/green.png";
        this.width = 0.1;
        this.height = 1;
    }
    async shoot(gameArea, x, y, incrementX, incrementY, angle) {
        this.load(gameArea);
        this.incrementX = incrementX;
        this.incrementY = incrementY;
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
    async aplyMoviment() {
        const backX = this.x;
        const backY = this.y;
        this.aplyDirections();
        const colision = await this.willCollid();
        if (colision) {
            if (colision.id) {
                if (colision.type === 2) {
                    colision.kill();
                }
                if (colision.type === 1) {
                    this.x = backX;
                    this.y = backY;
                    // await this.aplyDirections(this.testWillColidWithRollBack.bind(this))
                }
                return;
            }
            else if (colision.type) {
                this.kill();
                // await this.aplyDirections(this.testWillColidWithRollBack.bind(this))
            }
            else {
                return;
            }
        }
    }
    async aplyDirections(actions) {
        this.y = this.y - this.incrementY;
        this.x = this.x + this.incrementX;
        if (actions) {
            if (await this.willCollid()) {
                //TODO: event colided
                console.log("colided");
            }
            return;
        }
    }
    async draw() {
        if (this.context) {
            await this.aplyMoviment();
            await this.getSprite();
            this.unitHeght = this.height;
            this.unitWidht = this.width;
            this.context.save();
            this.context.translate(this.x, this.y);
            this.context.rotate(this.angle * Math.PI / 180);
            this.context.translate(-this.x, -this.y);
            this.context.drawImage(this.sprite, this.x, this.y, this.unitWidht, this.unitHeght);
            this.context.restore();
            return;
        }
        else {
            return;
        }
    }
}
exports.SpaceShipFireCanvasComponent = SpaceShipFireCanvasComponent;
