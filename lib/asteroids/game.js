"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteroids_GameArea_1 = require("./asteroids.GameArea");
const spaceShip_CanvasComponent_1 = require("./spaceShip.CanvasComponent");
const args_1 = require("./args");
const globals_1 = require("./globals");
const globals_2 = require("../VaregueJsEngine/globals");
const GenericCanvasComponent_1 = require("../VaregueJsEngine/GenericCanvasComponent");
const spaceShipController_1 = require("./spaceShipController");
class gameMain {
    async start() {
        const canvas = new asteroids_GameArea_1.AsteroidsGameArea();
        await canvas.load(args_1.staticVariables);
        const spaceShip = new spaceShip_CanvasComponent_1.SpaceShipCanvasComponent();
        spaceShip.load(canvas);
        args_1.staticVariables.player = spaceShip;
        spaceShip.x = 100;
        spaceShip.y = 100;
        const keybord = new spaceShipController_1.SpaceShipController();
        keybord.load(canvas);
        spaceShip.addControl(keybord);
        canvas.start();
        const square = new GenericCanvasComponent_1.GenericCanvasComponent();
        square.x = 100;
        square.y = 100;
        // square.load(canvas)
        spaceShip.on(globals_1.SpaceShipComponentEvent.STARTED, () => {
        });
        canvas.on(globals_2.GameAreaEvent.GAME_OVER, () => {
            console.log("over");
            canvas.stop();
        });
    }
}
exports.gameMain = gameMain;
