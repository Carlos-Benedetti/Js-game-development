"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericCanvas {
    constructor(canvas = document.createElement('canvas'), intervarIndex = null, tickSpeed = 10, aplyGravity = false, resolution = { width: 400, height: 400 }, gravity = 9.8, context = canvas.getContext('2d')) {
        this.canvas = canvas;
        this.intervarIndex = intervarIndex;
        this.tickSpeed = tickSpeed;
        this.aplyGravity = aplyGravity;
        this.resolution = resolution;
        this.gravity = gravity;
        this.context = context;
        this.components = [];
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
        for await (let component of this.components) {
            await component.draw();
        }
        return;
    }
    async update() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        await this.draw();
        return;
    }
    async addComponent(component) {
        component.context = this.context;
        this.components = [component];
        return;
    }
}
exports.GenericCanvas = GenericCanvas;
