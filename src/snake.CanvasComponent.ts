import { GenericCanvasComponent } from "./GenericCanvasComponent";
import { v4 } from 'uuid'
import { staticVariables } from "./args";
import { SnakeBodyCanvasComponent } from "./snake.Body.CanvasComponent";
import { GameAreaEvent, SnakeComponentEvent } from "./globals";
export interface bodyBlock {
    x: number
    y: number
    id: string
    component: SnakeBodyCanvasComponent
}
export class SnakeCanvasComponent extends GenericCanvasComponent<any,SnakeComponentEvent>{
    bodyLenght: number = 1
    bodyBlocks: bodyBlock[] = []
    baseSpeed = this.height
    async addBodyBlock(x: number, y: number) {
        const component = new SnakeBodyCanvasComponent()
        component.id = v4()
        component.x = x
        component.y = y
        await component.load(this.width, this.height)

        this.bodyBlocks.push({
            x: x,
            y: y,
            id: component.id,
            component
        })

    }
    async aplyDirections(actions?: GenericCanvasComponent<any,any>['testWillColidWithRollBack']) {

        if (this.movingUp) {
            this.y -= this.upSpeed * this.baseSpeed
            if (actions) {
                if (await this.willCollid()) {
                    this.y += this.downSpeed * this.baseSpeed
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
        const colision = await this.willCollid()
        if (colision) {
            if (colision) {
                if (colision.type === 2) {
                    this.emit(SnakeComponentEvent.GOT_FRUIT)
                    await this.addBodyBlock(backX, backY)
                    colision.kill()
                }
                if (colision.type === 1)
                    staticVariables.gameArea.emit(GameAreaEvent.GAME_OVER)
                    this.x = backX;
                this.y = backY

                await this.aplyDirections(this.testWillColidWithRollBack.bind(this))
                return
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
                this.bodyBlocks.reverse().map((e, i, k) => {
                    if ((i + 1) === k.length) {
                        e.x = oldX
                        e.y = oldY
                    }
                    else {
                        e.x = k[i].x
                        e.y = k[i].y
                    }
                    return e
                })
            }
            this.context.drawImage(this.sprite, this.x, this.y, this.width, this.height)

            return
        } else {
            return
        }
    }
}