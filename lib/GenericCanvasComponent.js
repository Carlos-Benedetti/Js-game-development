"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const uuid_1 = require("uuid");
const args_1 = require("./args");
class GenericCanvasComponent {
    constructor(name = "Novo Component", id = uuid_1.v4(), width = 10, height = 10, x = 0, y = 0) {
        this.name = name;
        this.id = id;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this._Event = new rxjs_1.Subject();
        this.events = new rxjs_1.AsyncSubject();
        this.context = null;
        this._spritePath = null;
        this.upSpeed = 1;
        this.downSpeed = 1;
        this.leftSpeed = 1;
        this.rightSpeed = 1;
        this.baseSpeed = 1;
        this.sprite = null;
    }
    on(event, action) {
        this._Event.asObservable().subscribe(even => {
            if (event === even) {
                action();
            }
        });
    }
    emit(events) {
        console.log(this.name + " Emitted: " + events);
        this._Event.next(events);
    }
    async preDraw() {
        return;
    }
    async postDraw() {
        return;
    }
    get controls() {
        return this._control;
    }
    set control(v) {
        this.events.next(true);
        this._control = v;
        this.subscribeToEvents(this._control.plusUp, () => { this.movingUp = true; });
        this.subscribeToEvents(this._control.minusUp, () => { this.movingUp = false; });
        this.subscribeToEvents(this._control.plusDown, () => { this.movingDown = true; });
        this.subscribeToEvents(this._control.minusDown, () => { this.movingDown = false; });
        this.subscribeToEvents(this._control.plusLeft, () => { this.movingLeft = true; });
        this.subscribeToEvents(this._control.minusLeft, () => { this.movingLeft = false; });
        this.subscribeToEvents(this._control.plusRight, () => { this.movingRight = true; });
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
    async load(width = this.width, height = this.height) {
        this.context = args_1.staticVariables.gameArea.context;
        args_1.staticVariables.gameArea.addComponent(this);
        this.width = width;
        this.height = height;
        await this.getSprite();
        return;
    }
    async kill() {
        args_1.staticVariables.gameArea.components = args_1.staticVariables.gameArea.components.filter(i => i.id !== this.id);
        return;
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
        if (this.movingDown) {
            this.y += this.downSpeed * this.baseSpeed;
            if (actions) {
                if (await this.willCollid()) {
                    console.log("reverting");
                    this.y -= this.downSpeed * this.baseSpeed;
                }
            }
        }
        if (this.movingRight) {
            this.x += this.rightSpeed * this.baseSpeed;
            if (actions) {
                if (await this.willCollid()) {
                    this.x -= this.rightSpeed * this.baseSpeed;
                }
            }
        }
        if (this.movingLeft) {
            this.x -= this.leftSpeed * this.baseSpeed;
            if (actions) {
                if (await this.willCollid()) {
                    this.x += this.rightSpeed * this.baseSpeed;
                }
            }
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
            console.log(await this.willCollid());
            this.x = backX;
            this.y = backY;
            await this.aplyDirections(this.testWillColidWithRollBack.bind(this));
            return;
        }
        else {
            return;
        }
    }
    willCollid() {
        return new Promise(resolve => {
            const x = this.x;
            const y = this.y;
            const width = this.width;
            const height = this.height;
            args_1.staticVariables.gameArea.components.forEach((object2, i, k) => {
                if ((object2.id !== this.id) && this.x < object2.x + object2.width && this.x + this.width > object2.x &&
                    this.y < object2.y + object2.height && this.y + this.height > object2.y) {
                    resolve(object2);
                }
                else if ((i + 1) === k.length) {
                    resolve(null);
                }
            });
        });
    }
    getSprite(path) {
        return new Promise((resolve, reject) => {
            if (!this.sprite) {
                const sprite = new Image();
                sprite.src = path ? path : this.spritePath ? this.spritePath : globals_1.MISSING_TEXTURE.source;
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
            await this.getSprite();
            this.context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
            return;
        }
        else {
            return;
        }
    }
}
exports.GenericCanvasComponent = GenericCanvasComponent;
