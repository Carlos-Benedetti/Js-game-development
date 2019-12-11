"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const args_1 = require("./args");
class CollisionDetection {
    testComponent(component) {
        return new Promise(resolve => {
            const x = component.x;
            const y = component.y;
            const unitWidht = component.unitWidht;
            const unitHeght = component.unitHeght;
            args_1.staticVariables.gameArea.components.forEach((object2, i, k) => {
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