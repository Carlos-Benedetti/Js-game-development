import { AsteroidsGameArea } from "./asteroids.GameArea"
import { SpaceShipCanvasComponent } from "./spaceShip.CanvasComponent"
import { staticVariables } from "./args"
import { GenericKeybordControls } from "../VaregueJsEngine/keybordController"
import { SpaceShipComponentEvent } from "./globals"
import { GameAreaEvent } from "../VaregueJsEngine/globals"
import { GenericCanvasComponent } from "../VaregueJsEngine/GenericCanvasComponent"
import { SpaceShipController } from "./spaceShipController"

export class gameMain {


    async start() {
        const canvas = new AsteroidsGameArea()
        await canvas.load(staticVariables)

        const spaceShip = new SpaceShipCanvasComponent()
        spaceShip.load(canvas)
        staticVariables.player = spaceShip

        spaceShip.x = 100
        spaceShip.y = 100


        const keybord = new SpaceShipController()
        keybord.load(canvas)
        spaceShip.addControl(keybord)

        canvas.start();

        const square = new GenericCanvasComponent()
        square.x = 100
        square.y = 100
        // square.load(canvas)
        spaceShip.on(SpaceShipComponentEvent.STARTED, () => {
            
        })
        canvas.on(GameAreaEvent.GAME_OVER, () => {
            console.log("over")
            canvas.stop()
        })
    }
}