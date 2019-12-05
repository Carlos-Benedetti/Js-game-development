"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MISSING_TEXTURE;
(function (MISSING_TEXTURE) {
    MISSING_TEXTURE["source"] = "assets/missingTexture.jpeg";
})(MISSING_TEXTURE = exports.MISSING_TEXTURE || (exports.MISSING_TEXTURE = {}));
var GameAreaEvent;
(function (GameAreaEvent) {
    GameAreaEvent["GAME_OVER"] = "gameOver";
})(GameAreaEvent = exports.GameAreaEvent || (exports.GameAreaEvent = {}));
var SnakeComponentEvent;
(function (SnakeComponentEvent) {
    SnakeComponentEvent["DID_DIE"] = "gameOver";
    SnakeComponentEvent["STARTED"] = "started";
    SnakeComponentEvent["GOT_FRUIT"] = "gotFruit";
})(SnakeComponentEvent = exports.SnakeComponentEvent || (exports.SnakeComponentEvent = {}));
