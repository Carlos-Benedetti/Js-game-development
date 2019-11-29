"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const uuid_1 = require("uuid");
class GenericCanvasComponent {
    constructor(name = "Novo Component", id = uuid_1.v4(), width = 10, height = 10, x = 0, y = 0) {
        this.name = name;
        this.id = id;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.events = new rxjs_1.AsyncSubject();
        this.context = null;
        this._spritePath = null;
        this.movingUp = false;
        this.movingDown = false;
        this.movingLeft = false;
        this.movingRight = false;
        this.upSpeed = 1;
        this.downSpeed = 1;
        this.leftSpeed = 1;
        this.rightSpeed = 1;
        this.baseSpeed = 10;
        this.sprite = null;
    }
    get controls() {
        return this._control;
    }
    set control(v) {
        this.events.next(true);
        this._control = v;
        this.subscribeToEvents(this._control.PlusUp, () => { this.movingUp = true; });
        this.subscribeToEvents(this._control.minusUp, () => { this.movingUp = false; });
        this.subscribeToEvents(this._control.PlusDown, () => { this.movingDown = true; });
        this.subscribeToEvents(this._control.minusDown, () => { this.movingDown = false; });
        this.subscribeToEvents(this._control.PlusLeft, () => { this.movingLeft = true; });
        this.subscribeToEvents(this._control.minusLeft, () => { this.movingLeft = false; });
        this.subscribeToEvents(this._control.PlusRight, () => { this.movingRight = true; });
        this.subscribeToEvents(this._control.minusRight, () => { this.movingRight = false; });
    }
    get spritePath() {
        return this._spritePath;
    }
    set spritePath(v) {
        this.getSprite(v);
        this._spritePath = v;
    }
    subscribeToEvents(observable, action) {
        observable.pipe(operators_1.takeUntil(this.events)).subscribe(action);
    }
    async addControl(control) {
        this.control = control;
    }
    async create(width = this.width, height = this.height) {
        this.width = width;
        this.height = height;
        await this.getSprite();
        return;
    }
    async aplyDirections(actions) {
        if (this.movingUp) {
            this.x += this.upSpeed * this.baseSpeed;
            if (actions)
                actions('x', '+', 'this.upSpeed*this.baseSpeed');
        }
        if (this.movingDown) {
            this.x -= this.downSpeed * this.baseSpeed;
            if (actions)
                actions('x', '-', 'this.downSpeed*this.baseSpeed');
        }
        if (this.movingRight) {
            this.y += this.rightSpeed * this.baseSpeed;
            if (actions)
                actions('y', '+', 'this.rightSpeed*this.baseSpeed');
        }
        if (this.movingLeft) {
            this.y -= this.leftSpeed * this.baseSpeed;
            if (actions)
                await actions('x', '-', 'this.leftSpeed*this.baseSpeed');
        }
        return;
    }
    async testWillColidWithRollBack(axys, mathAction, action) {
        if (await this.willCollid()) {
            mathAction = mathAction === "-" ? '+' : '-';
            eval(axys + mathAction + action);
            return;
        }
        else {
            return;
        }
    }
    async aplyMoviment() {
        const backX = this.x;
        const backY = this.y;
        this.aplyDirections();
        if (await this.willCollid()) {
            this.x = backX;
            this.y = backY;
            await this.aplyDirections(this.testWillColidWithRollBack);
            return;
        }
        else {
            return;
        }
    }
    async willCollid() {
        return false;
        //TODO: throw new Error("Method not implemented.");
    }
    getSprite(path) {
        return new Promise((resolve, reject) => {
            if (!this.sprite) {
                const sprite = new Image();
                sprite.src = path ? path : globals_1.MISSING_TEXTURE.source;
                sprite.onload = () => {
                    this.sprite = sprite;
                    resolve(this.sprite);
                };
                sprite.onerror = () => {
                    reject();
                };
            }
            else {
                resolve(this.sprite);
            }
        });
    }
    async draw() {
        if (this.context) {
            await this.aplyMoviment();
            this.context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
            return;
        }
        else {
            return;
        }
    }
}
exports.GenericCanvasComponent = GenericCanvasComponent;
