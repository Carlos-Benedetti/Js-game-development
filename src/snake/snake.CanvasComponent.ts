import { GenericCanvasComponent } from "../VaregueJsEngine/GenericCanvasComponent";
import { v4 } from 'uuid'
import { staticVariables } from "../VaregueJsEngine/args";
import { SnakeBodyCanvasComponent } from "./snake.Body.CanvasComponent";
import { GameAreaEvent, SnakeComponentEvent } from "../VaregueJsEngine/globals";
export interface bodyBlock {
    x: number
    y: number
    id: string
    component: SnakeBodyCanvasComponent
}
export class SnakeCanvasComponent extends GenericCanvasComponent<any, SnakeComponentEvent>{
    bodyLenght: number = 1
    bodyBlocks: bodyBlock[] = []
    baseSpeed = this.aplyResolution({ y: this.height }).y
    spritePath = "./assets/green.png"
    async addBodyBlock(x: number, y: number) {
        const component = new SnakeBodyCanvasComponent()
        component.id = v4()
        component.x = x
        component.y = y
        await component.load(this.staticVariables.gameArea)

        this.bodyBlocks.push({
            x: x,
            y: y,
            id: component.id,
            component
        })
        console.log(this.bodyBlocks)

    }
    inPossX(x: number) {
        const bloacksWidht = staticVariables.gameArea.canvas.width / 10
        return Math.floor((x) / 10) * bloacksWidht
    }
    inPossY(x: number) {
        const cloackHeight = staticVariables.gameArea.canvas.height / 10
        return Math.floor((x) / 10) * cloackHeight
    }
    async aplyDirections(actions?: GenericCanvasComponent<any, any>['testWillColidWithRollBack']) {

        if (this.movingUp) {
            this.y -= this.upSpeed * this.baseSpeed
            if (actions) {
                if (await this.willCollid()) {
                    this.y += this.upSpeed * this.baseSpeed
                }
            }
        }
        else if (this.movingDown) {
            this.y += this.downSpeed * this.baseSpeed
            if (actions) {
                if (await this.willCollid()) {
                    this.y -= this.downSpeed * this.baseSpeed
                }
            }
        }
        else if (this.movingRight) {
            this.x += this.rightSpeed * this.baseSpeed
            if (actions) {
                if (await this.willCollid()) {
                    this.x -= this.rightSpeed * this.baseSpeed
                }
            }
        }
        else if (this.movingLeft) {
            this.x -= this.leftSpeed * this.baseSpeed
            if (actions) {
                if (await this.willCollid()) {
                    this.x += this.rightSpeed * this.baseSpeed
                }
            }
        }
        return

    }
    async aplyMoviment(): Promise<void> {
        const backX = this.x;
        const backY = this.y;

        this.aplyDirections()
        const colision: any = await this.willCollid()
        if (colision) {
            if (colision.id) {
                if (colision.type === 2) {
                    this.emit(SnakeComponentEvent.GOT_FRUIT)
                    await this.addBodyBlock(backX, backY)
                    colision.kill()
                }
                if (colision.type === 1) {
                    staticVariables.gameArea.emit(GameAreaEvent.GAME_OVER)
                    this.x = backX;
                    this.y = backY

                    await this.aplyDirections(this.testWillColidWithRollBack.bind(this))
                }
                return
            } else if (colision.type) {
                this.x = backX;
                this.y = backY
                await this.aplyDirections(this.testWillColidWithRollBack.bind(this))
            } else {
                return
            }

        }
    }
    async preDraw() {
        this.bodyBlocks.map((e, i, k) => {
            e.component.x = e.x
            e.component.y = e.y

        })
    }
    async draw(): Promise<void> {
        if (this.context) {
            const oldX = this.x
            const oldY = this.y

            await this.aplyMoviment()
            if (oldX != this.x || oldY != this.y) {
                this.bodyBlocks = this.bodyBlocks.reverse().map((e, i, k) => {
                    if ((i + 1) === k.length) {
                        e.x = oldX
                        e.y = oldY
                    }
                    else {
                        e.x = k[i + 1].x
                        e.y = k[i + 1].y
                        e.component.x = e.x
                    }
                    e.component.x = e.x
                    e.component.y = e.y
                    return e
                }).reverse()
            }
            this.unitHeght = this.height
            this.unitWidht = this.width
            this.context.drawImage(this.sprite, this.x, this.y, this.unitWidht, this.unitHeght)

            return
        } else {
            return
        }
    }
}