define("globals", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MISSING_TEXTURE;
    (function (MISSING_TEXTURE) {
        MISSING_TEXTURE["source"] = "assets/missingTexture.jpeg";
    })(MISSING_TEXTURE = exports.MISSING_TEXTURE || (exports.MISSING_TEXTURE = {}));
    var GameAreaEvent;
    (function (GameAreaEvent) {
        GameAreaEvent["DID_DRAW"] = "didDraw";
        GameAreaEvent["GAME_OVER"] = "gameOver";
    })(GameAreaEvent = exports.GameAreaEvent || (exports.GameAreaEvent = {}));
    var SnakeComponentEvent;
    (function (SnakeComponentEvent) {
        SnakeComponentEvent["DID_DIE"] = "gameOver";
        SnakeComponentEvent["STARTED"] = "started";
        SnakeComponentEvent["GOT_FRUIT"] = "gotFruit";
    })(SnakeComponentEvent = exports.SnakeComponentEvent || (exports.SnakeComponentEvent = {}));
});
define("GenericCanvasComponent", ["require", "exports", "globals", "rxjs", "rxjs/operators", "uuid", "args"], function (require, exports, globals_1, rxjs_1, operators_1, uuid_1, args_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GenericCanvasComponent {
        constructor(name = "Novo Component", id = uuid_1.v4(), width = 1, height = 1, x = 0, y = 0) {
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
        set unitHeght(y) {
            this._unitHeight = (this.aplyResolution({ y })).y;
        }
        set unitWidht(x) {
            this._unitWidth = (this.aplyResolution({ x })).x;
        }
        get unitHeght() {
            return this._unitHeight;
        }
        get unitWidht() {
            return this._unitWidth;
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
        aplyResolution(xy) {
            if (xy.x) {
                xy.x = args_1.staticVariables.gameArea.unitX * this.width;
            }
            if (xy.y) {
                xy.y = args_1.staticVariables.gameArea.unitY * this.height;
            }
            return xy;
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
                const canvas = args_1.staticVariables.gameArea.canvas;
                if (x < 0 || y < 0 || x + width > canvas.width || y + height > canvas.height) {
                    resolve({ type: "WALL" });
                }
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
    exports.GenericCanvasComponent = GenericCanvasComponent;
});
define("args", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class staticVariables {
    }
    staticVariables.gameArea = null;
    staticVariables.player = null;
    staticVariables.fruit = null;
    exports.staticVariables = staticVariables;
});
define("GenericCanvas", ["require", "exports", "rxjs", "globals"], function (require, exports, rxjs_2, globals_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GenericCanvas {
        constructor(canvas = document.createElement('canvas'), intervarIndex = null, tickSpeed = 10, aplyGravity = false, resolution = { width: 100, height: 100 }, gravity = 9.8, context = canvas.getContext('2d')) {
            this.canvas = canvas;
            this.intervarIndex = intervarIndex;
            this.tickSpeed = tickSpeed;
            this.aplyGravity = aplyGravity;
            this.resolution = resolution;
            this.gravity = gravity;
            this.context = context;
            this._Event = new rxjs_2.Subject();
            this.components = [];
        }
        on(event, action) {
            this._Event.asObservable().subscribe(even => {
                if (event === even) {
                    action();
                }
            });
        }
        emit(events) {
            this._Event.next(events);
        }
        async stop() {
            if (this.intervarIndex) {
                clearInterval(this.intervarIndex);
            }
        }
        async updateTickSpeed(newTick) {
            this.tickSpeed = newTick;
            if (this.intervarIndex) {
                clearInterval(this.intervarIndex);
                this.start();
            }
            return;
        }
        createComponent() {
            throw new Error("Method not implemented.");
        }
        async AdaptResolution(resolution) {
            this.resolution = resolution;
            this.canvas.width = this.resolution.width;
            this.canvas.height = this.resolution.height;
            this.unitX = this.resolution.width / 20;
            this.unitY = this.resolution.height / 20;
        }
        async load() {
            await this.AdaptResolution(this.resolution);
            document.body.appendChild(this.canvas);
            return;
        }
        async start() {
            this.intervarIndex = setInterval(() => { this.update(); }, this.tickSpeed);
            return;
        }
        async draw() {
            this.components.forEach(i => i.preDraw());
            for await (let component of this.components) {
                await component.draw();
            }
            this.components.forEach(i => i.postDraw());
            this.emit(globals_2.GameAreaEvent.DID_DRAW);
            return;
        }
        async update() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            await this.draw();
            return;
        }
        async addComponent(component) {
            this.components.push(component);
            return;
        }
    }
    exports.GenericCanvas = GenericCanvas;
});
define("GameArea", ["require", "exports", "GenericCanvas", "args"], function (require, exports, GenericCanvas_1, args_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameArea extends GenericCanvas_1.GenericCanvas {
        constructor() {
            super();
            this.name = "gameArea";
            args_2.staticVariables.gameArea = this;
        }
    }
    exports.GameArea = GameArea;
});
define("CollisionDetection", ["require", "exports", "args"], function (require, exports, args_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CollisionDetection {
        testComponent(component) {
            return new Promise(resolve => {
                const x = component.x;
                const y = component.y;
                const unitWidht = component.unitWidht;
                const unitHeght = component.unitHeght;
                args_3.staticVariables.gameArea.components.forEach((object2, i, k) => {
                    if ((object2.id !== component.id) || component.x < object2.x + object2.unitWidht && component.x + component.unitWidht > object2.x &&
                        component.y < object2.y + object2.unitHeght && component.y + component.unitHeght > object2.y) {
                        resolve(true);
                    }
                    else if ((i + 1) === k.length) {
                        resolve(false);
                    }
                });
            });
        }
    }
    exports.CollisionDetection = CollisionDetection;
});
define("keybordController", ["require", "exports", "rxjs"], function (require, exports, rxjs_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GenericKeybordControls {
        constructor() {
            this._plusUp = new rxjs_3.Subject();
            this._plusDown = new rxjs_3.Subject();
            this._plusLeft = new rxjs_3.Subject();
            this._plusRight = new rxjs_3.Subject();
            this._minusUp = new rxjs_3.Subject();
            this._minusDown = new rxjs_3.Subject();
            this._minusLeft = new rxjs_3.Subject();
            this._minusRight = new rxjs_3.Subject();
        }
        async load() {
            await this.startListeningToKeybord();
            return;
        }
        stopListeningToKeybord() {
            throw new Error("Method not implemented.");
        }
        get plusUp() {
            return this._plusUp.asObservable();
        }
        ;
        get plusDown() {
            return this._plusDown.asObservable();
        }
        ;
        get plusLeft() {
            return this._plusLeft.asObservable();
        }
        ;
        get plusRight() {
            return this._plusRight.asObservable();
        }
        ;
        get minusUp() {
            return this._minusUp.asObservable();
        }
        ;
        get minusDown() {
            return this._minusDown.asObservable();
        }
        ;
        get minusLeft() {
            return this._minusLeft.asObservable();
        }
        ;
        get minusRight() {
            return this._minusRight.asObservable();
        }
        ;
        async startListeningToKeybord() {
            document.addEventListener('keydown', (e) => { this.keyDownHandler(e, true); }, false);
            document.addEventListener('keyup', (e) => { this.keyDownHandler(e, false); }, false);
        }
        keyDownHandler(event, down) {
            if (event.keyCode == 39) {
                event.preventDefault();
                down ? this._plusRight.next() : this._minusRight.next();
            }
            else if (event.keyCode == 37) {
                event.preventDefault();
                down ? this._plusLeft.next() : this._minusLeft.next();
            }
            if (event.keyCode == 40) {
                event.preventDefault();
                down ? this._plusDown.next() : this._minusDown.next();
            }
            else if (event.keyCode == 38) {
                event.preventDefault();
                down ? this._plusUp.next() : this._minusUp.next();
            }
        }
    }
    exports.GenericKeybordControls = GenericKeybordControls;
});
define("DumbIaController", ["require", "exports", "keybordController", "args", "globals"], function (require, exports, keybordController_1, args_4, globals_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DumbIaController extends keybordController_1.GenericKeybordControls {
        async reset() {
            this._minusDown.next();
            this._minusLeft.next();
            this._minusRight.next();
            this._minusUp.next();
        }
        async startListeningToKeybord() {
            args_4.staticVariables.gameArea.on(globals_3.GameAreaEvent.DID_DRAW, () => {
                this.reset();
                const destX = args_4.staticVariables.fruit.x;
                const destY = args_4.staticVariables.fruit.y;
                const origX = args_4.staticVariables.player.x;
                const origY = args_4.staticVariables.player.y;
                if (destX < origX) {
                    console.log("going left");
                    this._plusLeft.next();
                }
                else if (destX > origX) {
                    console.log("going right");
                    this._plusRight.next();
                }
                else if (destY < origY) {
                    console.log("going up");
                    this._plusUp.next();
                }
                else if (destY > origY) {
                    console.log("going down");
                    this._plusDown.next();
                }
            });
        }
    }
    exports.DumbIaController = DumbIaController;
});
define("SmartDumbIaController", ["require", "exports", "keybordController", "args", "globals"], function (require, exports, keybordController_2, args_5, globals_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SmartDumbIaController extends keybordController_2.GenericKeybordControls {
        async reset() {
            this._minusDown.next();
            this._minusLeft.next();
            this._minusRight.next();
            this._minusUp.next();
        }
        async goDown() {
            this.reset();
            console.log("going down");
            this._plusDown.next();
        }
        async goUp() {
            this.reset();
            console.log("going up");
            this._plusUp.next();
        }
        async goLeft() {
            this.reset();
            console.log("going left");
            this._plusLeft.next();
        }
        async goRight() {
            this.reset();
            console.log("going right");
            this._plusRight.next();
        }
        doLine(times) {
            return 19 * times;
        }
        async startListeningToKeybord() {
            let count = 0;
            const line = 0;
            args_5.staticVariables.gameArea.on(globals_4.GameAreaEvent.DID_DRAW, () => {
                if (count === this.doLine(20) + 21) {
                    this.goLeft();
                    count = 0;
                }
                if (count === this.doLine(20) + 2 ||
                    count === this.doLine(20) + 3 ||
                    count === this.doLine(20) + 4 ||
                    count === this.doLine(20) + 5 ||
                    count === this.doLine(20) + 6 ||
                    count === this.doLine(20) + 7 ||
                    count === this.doLine(20) + 8 ||
                    count === this.doLine(20) + 9 ||
                    count === this.doLine(20) + 10 ||
                    count === this.doLine(20) + 11 ||
                    count === this.doLine(20) + 12 ||
                    count === this.doLine(20) + 13 ||
                    count === this.doLine(20) + 14 ||
                    count === this.doLine(20) + 15 ||
                    count === this.doLine(20) + 16 ||
                    count === this.doLine(20) + 17 ||
                    count === this.doLine(20) + 18 ||
                    count === this.doLine(20) + 19 ||
                    count === this.doLine(20) + 20) {
                    this.goLeft();
                }
                else if (count === this.doLine(1) + 1 ||
                    count === this.doLine(2) + 1 ||
                    count === this.doLine(3) + 1 ||
                    count === this.doLine(4) + 1 ||
                    count === this.doLine(5) + 1 ||
                    count === this.doLine(6) + 1 ||
                    count === this.doLine(7) + 1 ||
                    count === this.doLine(8) + 1 ||
                    count === this.doLine(9) + 1 ||
                    count === this.doLine(10) + 1 ||
                    count === this.doLine(11) + 1 ||
                    count === this.doLine(12) + 1 ||
                    count === this.doLine(13) + 1 ||
                    count === this.doLine(14) + 1 ||
                    count === this.doLine(15) + 1 ||
                    count === this.doLine(16) + 1 ||
                    count === this.doLine(17) + 1 ||
                    count === this.doLine(18) + 1 ||
                    count === this.doLine(19) + 1 ||
                    count === this.doLine(20) + 2) {
                    this.goRight();
                }
                else if ((count > this.doLine(0) && count <= this.doLine(1)) ||
                    (count > this.doLine(2) && count <= this.doLine(3)) ||
                    (count > this.doLine(4) && count <= this.doLine(5)) ||
                    (count > this.doLine(6) && count <= this.doLine(7)) ||
                    (count > this.doLine(8) && count <= this.doLine(9)) ||
                    (count > this.doLine(10) && count <= this.doLine(11)) ||
                    (count > this.doLine(12) && count <= this.doLine(13)) ||
                    (count > this.doLine(14) && count <= this.doLine(15)) ||
                    (count > this.doLine(16) && count <= this.doLine(17)) ||
                    (count > this.doLine(18) && count <= this.doLine(19))) {
                    this.goDown();
                }
                else if ((count > this.doLine(1) && count <= this.doLine(2)) ||
                    (count > this.doLine(3) && count <= this.doLine(4)) ||
                    (count > this.doLine(5) && count <= this.doLine(6)) ||
                    (count > this.doLine(5) && count <= this.doLine(6)) ||
                    (count > this.doLine(7) && count <= this.doLine(8)) ||
                    (count > this.doLine(9) && count <= this.doLine(10)) ||
                    (count > this.doLine(11) && count <= this.doLine(12)) ||
                    (count > this.doLine(13) && count <= this.doLine(14)) ||
                    (count > this.doLine(15) && count <= this.doLine(16)) ||
                    (count > this.doLine(17) && count <= this.doLine(18)) ||
                    (count > this.doLine(19))) {
                    this.goUp();
                }
                else {
                    this.reset();
                }
                count += 1;
                // console.log(count)
            });
        }
    }
    exports.SmartDumbIaController = SmartDumbIaController;
});
define("Snake.GameArea", ["require", "exports", "GenericCanvas", "args"], function (require, exports, GenericCanvas_2, args_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SnakeGameArea extends GenericCanvas_2.GenericCanvas {
        constructor() {
            super();
            this.name = "gameArea";
            this.tickSpeed = 10;
            args_6.staticVariables.gameArea = this;
        }
    }
    exports.SnakeGameArea = SnakeGameArea;
});
define("square", ["require", "exports", "GenericCanvasComponent"], function (require, exports, GenericCanvasComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class square extends GenericCanvasComponent_1.GenericCanvasComponent {
    }
    exports.square = square;
});
define("snake.Body.CanvasComponent", ["require", "exports", "GenericCanvasComponent"], function (require, exports, GenericCanvasComponent_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SnakeBodyCanvasComponent extends GenericCanvasComponent_2.GenericCanvasComponent {
        constructor() {
            super(...arguments);
            this.type = 1;
            this.spritePath = "./assets/green.png";
        }
        async aplyMoviment() {
            return;
        }
    }
    exports.SnakeBodyCanvasComponent = SnakeBodyCanvasComponent;
});
define("snake.CanvasComponent", ["require", "exports", "GenericCanvasComponent", "uuid", "args", "snake.Body.CanvasComponent", "globals"], function (require, exports, GenericCanvasComponent_3, uuid_2, args_7, snake_Body_CanvasComponent_1, globals_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SnakeCanvasComponent extends GenericCanvasComponent_3.GenericCanvasComponent {
        constructor() {
            super(...arguments);
            this.bodyLenght = 1;
            this.bodyBlocks = [];
            this.baseSpeed = this.aplyResolution({ y: this.height }).y;
            this.spritePath = "./assets/green.png";
        }
        async addBodyBlock(x, y) {
            const component = new snake_Body_CanvasComponent_1.SnakeBodyCanvasComponent();
            component.id = uuid_2.v4();
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
            const bloacksWidht = args_7.staticVariables.gameArea.canvas.width / 10;
            return Math.floor((x) / 10) * bloacksWidht;
        }
        inPossY(x) {
            const cloackHeight = args_7.staticVariables.gameArea.canvas.height / 10;
            return Math.floor((x) / 10) * cloackHeight;
        }
        async aplyDirections(actions) {
            if (this.movingUp) {
                this.y -= this.upSpeed * this.baseSpeed;
                if (actions) {
                    if (await this.willCollid()) {
                        this.y += this.upSpeed * this.baseSpeed;
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
                if (colision.id) {
                    if (colision.type === 2) {
                        this.emit(globals_5.SnakeComponentEvent.GOT_FRUIT);
                        await this.addBodyBlock(backX, backY);
                        colision.kill();
                    }
                    if (colision.type === 1) {
                        args_7.staticVariables.gameArea.emit(globals_5.GameAreaEvent.GAME_OVER);
                        this.x = backX;
                        this.y = backY;
                        await this.aplyDirections(this.testWillColidWithRollBack.bind(this));
                    }
                    return;
                }
                else if (colision.type) {
                    this.x = backX;
                    this.y = backY;
                    await this.aplyDirections(this.testWillColidWithRollBack.bind(this));
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
});
define("snake.Fruit.CanvasComponent", ["require", "exports", "GenericCanvasComponent", "args", "CollisionDetection"], function (require, exports, GenericCanvasComponent_4, args_8, CollisionDetection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SnakeFruitCanvasComponent extends GenericCanvasComponent_4.GenericCanvasComponent {
        constructor() {
            super();
            this.spritePath = "./assets/red.jpg";
            this.type = 2;
        }
        async aplyMoviment() {
            return;
        }
        inPossX(x) {
            const bloacksWidht = args_8.staticVariables.gameArea.canvas.width / 10;
            return Math.floor((x) / 10) * bloacksWidht;
        }
        inPossY(x) {
            const cloackHeight = args_8.staticVariables.gameArea.canvas.height / 10;
            return Math.floor((x) / 10) * cloackHeight;
        }
        async load() {
            this.context = args_8.staticVariables.gameArea.context;
            args_8.staticVariables.gameArea.addComponent(this);
            await this.getSprite(this.spritePath);
            const colision = new CollisionDetection_1.CollisionDetection();
            const x = this.inPossX(Math.floor(Math.random() * args_8.staticVariables.gameArea.canvas.width));
            const y = this.inPossY(Math.floor(Math.random() * args_8.staticVariables.gameArea.canvas.height));
            this.x = x;
            this.y = y;
            while (!(await colision.testComponent(this))) {
                const x = Math.floor(Math.random() * args_8.staticVariables.gameArea.canvas.width);
                const y = Math.floor(Math.random() * args_8.staticVariables.gameArea.canvas.height);
                this.x = x;
                this.y = y;
            }
            return;
        }
    }
    exports.SnakeFruitCanvasComponent = SnakeFruitCanvasComponent;
});
define("game", ["require", "exports", "snake.CanvasComponent", "Snake.GameArea", "globals", "snake.Fruit.CanvasComponent", "args", "SmartDumbIaController"], function (require, exports, snake_CanvasComponent_1, Snake_GameArea_1, globals_6, snake_Fruit_CanvasComponent_1, args_9, SmartDumbIaController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class gameMain {
        async start() {
            const canvas = new Snake_GameArea_1.SnakeGameArea();
            await canvas.load();
            const snake = new snake_CanvasComponent_1.SnakeCanvasComponent();
            snake.load();
            args_9.staticVariables.player = snake;
            const fruit = new snake_Fruit_CanvasComponent_1.SnakeFruitCanvasComponent();
            fruit.getSprite("./assets/red.jpg");
            fruit.load();
            args_9.staticVariables.fruit = fruit;
            const keybord = new SmartDumbIaController_1.SmartDumbIaController();
            keybord.load();
            snake.addControl(keybord);
            canvas.start();
            snake.on(globals_6.SnakeComponentEvent.GOT_FRUIT, () => {
                const fruit = new snake_Fruit_CanvasComponent_1.SnakeFruitCanvasComponent();
                fruit.load();
                args_9.staticVariables.fruit = fruit;
            });
            canvas.on(globals_6.GameAreaEvent.GAME_OVER, () => {
                console.log("over");
                canvas.stop();
            });
        }
    }
    exports.gameMain = gameMain;
});
