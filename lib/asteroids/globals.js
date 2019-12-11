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
var SpaceShipComponentEvent;
(function (SpaceShipComponentEvent) {
    SpaceShipComponentEvent["DID_DIE"] = "gameOver";
    SpaceShipComponentEvent["STARTED"] = "started";
})(SpaceShipComponentEvent = exports.SpaceShipComponentEvent || (exports.SpaceShipComponentEvent = {}));
