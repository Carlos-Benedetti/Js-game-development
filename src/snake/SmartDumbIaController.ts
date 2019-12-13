import { GenericKeybordControls } from "../VaregueJsEngine/keybordController";
import { staticVariables } from "./args";
import { GameAreaEvent } from "../VaregueJsEngine/globals";

export class SmartDumbIaController extends GenericKeybordControls<any>{
    async reset() {
        this._minusDown.next()
        this._minusLeft.next()
        this._minusRight.next()
        this._minusUp.next()
    }
    async goDown() {
        this.reset()
        console.log("going down")
        this._plusDown.next()
    }
    async goUp() {
        this.reset()
        console.log("going up")
        this._plusUp.next()
    }
    async goLeft() {
        this.reset()
        console.log("going left")
        this._plusLeft.next()
    }
    async goRight() {
        this.reset()
        console.log("going right")
        this._plusRight.next()
    }
    doLine(times:number){
        return 19*times
    }
    async startListeningToKeybord() {
        let count = 0
        const line = 0

        staticVariables.gameArea.on(GameAreaEvent.DID_DRAW, () => {
            if(count === this.doLine(20)+21 ){
                this.goLeft()
                count = 0
            }
            if(
                count === this.doLine(20)+2 ||
                count === this.doLine(20)+3 ||
                count === this.doLine(20)+4 ||
                count === this.doLine(20)+5 ||
                count === this.doLine(20)+6 ||
                count === this.doLine(20)+7 ||
                count === this.doLine(20)+8 ||
                count === this.doLine(20)+9 ||
                count === this.doLine(20)+10 ||
                count === this.doLine(20)+11 ||
                count === this.doLine(20)+12 ||
                count === this.doLine(20)+13 ||
                count === this.doLine(20)+14 ||
                count === this.doLine(20)+15 ||
                count === this.doLine(20)+16 ||
                count === this.doLine(20)+17 ||
                count === this.doLine(20)+18 ||
                count === this.doLine(20)+19 ||
                count === this.doLine(20)+20
                
             ){
                this.goLeft()
            }
            else if(
                count === this.doLine(1)+1 ||
                count === this.doLine(2)+1 ||
                count === this.doLine(3)+1 ||
                count === this.doLine(4)+1 ||
                count === this.doLine(5)+1 ||
                count === this.doLine(6)+1 ||
                count === this.doLine(7)+1 ||
                count === this.doLine(8)+1 ||
                count === this.doLine(9)+1 ||
                count === this.doLine(10)+1 ||
                count === this.doLine(11)+1 ||
                count === this.doLine(12)+1 ||
                count === this.doLine(13)+1 ||
                count === this.doLine(14)+1 ||
                count === this.doLine(15)+1 ||
                count === this.doLine(16)+1 ||
                count === this.doLine(17)+1 ||
                count === this.doLine(18)+1 ||
                count === this.doLine(19)+1 ||
                count === this.doLine(20)+2 
            ){
                this.goRight()
            }
            else if(
                (count > this.doLine(0) && count <= this.doLine(1))||
                (count > this.doLine(2) && count <= this.doLine(3))||
                (count > this.doLine(4) && count <= this.doLine(5))||
                (count > this.doLine(6) && count <= this.doLine(7))||
                (count > this.doLine(8) && count <= this.doLine(9))||
                (count > this.doLine(10) && count <= this.doLine(11))||
                (count > this.doLine(12) && count <= this.doLine(13))||
                (count > this.doLine(14) && count <= this.doLine(15))||
                (count > this.doLine(16) && count <= this.doLine(17))||
                (count > this.doLine(18) && count <= this.doLine(19))

            ){
                this.goDown()
            }
            else if(
                (count > this.doLine(1) && count <= this.doLine(2))||
                (count > this.doLine(3) && count <= this.doLine(4))||
                (count > this.doLine(5) && count <= this.doLine(6))||
                (count > this.doLine(5) && count <= this.doLine(6))||
                (count > this.doLine(7) && count <= this.doLine(8))||
                (count > this.doLine(9) && count <= this.doLine(10))||
                (count > this.doLine(11) && count <= this.doLine(12))||
                (count > this.doLine(13) && count <= this.doLine(14))||
                (count > this.doLine(15) && count <= this.doLine(16))||
                (count > this.doLine(17) && count <= this.doLine(18))||
                (count > this.doLine(19))
              
            ){
                this.goUp()
            }
           
            
            else{
                this.reset()
            }
            count +=1
            // console.log(count)
        })

    }

}