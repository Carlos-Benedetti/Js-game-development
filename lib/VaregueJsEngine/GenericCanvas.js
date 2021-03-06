"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const globals_1 = require("./globals");
class GenericCanvas {
    constructor(canvas = document.createElement('canvas'), intervarIndex = null, tickSpeed = 10, aplyGravity = false, resolution = { width: 800, height: 600 }, gravity = 9.8, context = canvas.getContext('2d')) {
        this.canvas = canvas;
        this.intervarIndex = intervarIndex;
        this.tickSpeed = tickSpeed;
        this.aplyGravity = aplyGravity;
        this.resolution = resolution;
        this.gravity = gravity;
        this.context = context;
        this._Event = new rxjs_1.Subject();
        this.components = [];
        canvas.tabIndex = 1;
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
    async load(gameContext) {
        this.gameContext = gameContext;
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
        this.emit(globals_1.GameAreaEvent.DID_DRAW);
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
