import { GenericCanvasComponent } from "../VaregueJsEngine/GenericCanvasComponent";
import { SpaceShipComponentEvent } from "./globals";
import { SpaceShipController } from "./spaceShipController";
import { SpaceShipFireCanvasComponent } from "./SpaceShip.fire.canvasComponent";
import { TriangleVector } from "./TriangleVector";

export class SpaceShipCanvasComponent extends GenericCanvasComponent<any, SpaceShipComponentEvent>{
    spritePath = './assets/asteroids/spaceShip.png'
    height = 1.5
    angle: number = 0;
    baseSpeed = 3
    radianAngle: number;
    rotatingRight: boolean
    rotatingLeft: boolean
    _control: SpaceShipController;
    movingForawrd: boolean;
    movingBackward: boolean;
    shoot: any;
    async draw() {
        if (this.context) {
            await this.aplyMoviment()
            await this.getSprite()
            this.unitHeght = this.height
            this.unitWidht = this.width
            this.context.save();
            const frentx = this.x + (this.unitWidht/2)
            const frenty = this.y + (this.unitHeght/2)
            this.context.translate(frentx, frenty);
            this.context.rotate(this.angle * Math.PI / 180);
            this.context.translate(-frentx, -frenty);
            this.context.drawImage(this.sprite, this.x, this.y, this.unitWidht, this.unitHeght)

            this.context.restore()
            return
        } else {
            return
        }

    }
    public set control(v: SpaceShipController) {
        this.events.next(true);

        this._control = v;

        this.subscribeToEvents(this._control.plusFoward, () => { this.movingForawrd = true })
        this.subscribeToEvents(this._control.minusForward, () => { this.movingForawrd = false })

        this.subscribeToEvents(this._control.plusBackward, () => { this.movingBackward = true })
        this.subscribeToEvents(this._control.minusBackward, () => { this.movingBackward = false })

        this.subscribeToEvents(this._control._plusTurnLeft, () => { this.rotatingLeft = true })
        this.subscribeToEvents(this._control._minusTurnLeft, () => { this.rotatingLeft = false })

        this.subscribeToEvents(this._control._plusTurnRight, () => { this.rotatingRight = true })
        this.subscribeToEvents(this._control._minusTurnRight, () => { this.rotatingRight = false })

        this.subscribeToEvents(this._control._plusShoot, () => { this.shoot = true })
        this.subscribeToEvents(this._control._minusShoot, () => { this.shoot = false })
    }
    async aplyDirections(actions?: SpaceShipCanvasComponent['testWillColidWithRollBack']) {
        const oldx = this.x
        const oldy = this.y
        if (this.movingForawrd) {
            this.y = this.y - (this.baseSpeed) * Math.cos(this.angle * Math.PI / 180);
            this.x = this.x + (this.baseSpeed) * Math.sin(this.angle * Math.PI / 180);
        }
        if (this.movingBackward) {
            this.y = this.y + (this.baseSpeed) * Math.cos(this.angle * Math.PI / 180);
            this.x = this.x - (this.baseSpeed) * Math.sin(this.angle * Math.PI / 180);
        }
        if (this.rotatingRight) {
            this.angle += 2
        }
        if (this.rotatingLeft) {
            this.angle -= 2
        }
        // new TriangleVector().draw(this.context,this.x,this.y,this.unitWidht,this.unitHeght,this.angle)
        if (this.shoot) {
            this.shoot = false
            const incrementY = Number((this.baseSpeed*3) * Math.cos(this.angle * Math.PI / 180))
            const incrementX = Number((this.baseSpeed*3) * Math.sin(this.angle * Math.PI / 180))
            const frentx = this.x + (this.unitWidht/2)
            const frenty = this.y 
            console.log("new")
            new SpaceShipFireCanvasComponent().shoot(this.staticVariables.gameArea,frentx,frenty,incrementX,incrementY,this.angle)
        }
        return

    }

}