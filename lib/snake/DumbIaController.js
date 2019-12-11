"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keybordController_1 = require("../VaregueJsEngine/keybordController");
const args_1 = require("../VaregueJsEngine/args");
const globals_1 = require("../VaregueJsEngine/globals");
class DumbIaController extends keybordController_1.GenericKeybordControls {
    async reset() {
        this._minusDown.next();
        this._minusLeft.next();
        this._minusRight.next();
        this._minusUp.next();
    }
    async startListeningToKeybord() {
        args_1.staticVariables.gameArea.on(globals_1.GameAreaEvent.DID_DRAW, () => {
            this.reset();
            const destX = args_1.staticVariables.fruit.x;
            const destY = args_1.staticVariables.fruit.y;
            const origX = args_1.staticVariables.player.x;
            const origY = args_1.staticVariables.player.y;
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
