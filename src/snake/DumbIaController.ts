import { GenericKeybordControls } from "../VaregueJsEngine/keybordController";
import { staticVariables } from "./args";
import { GameAreaEvent } from "../VaregueJsEngine/globals";

export class DumbIaController extends GenericKeybordControls<any>{
    async reset(){
        this._minusDown.next()
        this._minusLeft.next()
        this._minusRight.next()
        this._minusUp.next()
    }
    async startListeningToKeybord() {
        

        staticVariables.gameArea.on(GameAreaEvent.DID_DRAW, () => {
            this.reset()
            const destX = staticVariables.fruit.x
            const destY = staticVariables.fruit.y

            const origX = staticVariables.player.x
            const origY = staticVariables.player.y

            if(destX < origX){
                console.log("going left")
                this._plusLeft.next()
            }
            else if(destX > origX){
                console.log("going right")
                this._plusRight.next()
            }
            else if(destY < origY){
                console.log("going up")
                this._plusUp.next()
            }
            else if(destY > origY){
                console.log("going down")
                this._plusDown.next()
            }
        })

    }

}